import req from "supertest";
import server from "../src/server";
import prisma from "../src/prismaClient";
import { login, resetDatabase } from "./utilities";
import { UserWithFamily, UserWithNurse } from "../src/types/userTypes";

describe("Family Routes", () => {
  let family: UserWithFamily;
  let cookieJar: string;

  let admin: UserWithNurse;
  let adminCookieJar: string;

  beforeAll(async () => {
    await resetDatabase();

    family = await prisma.user.create({
      data: {
        cpf: "12345678910",
        email: "email@example.com",
        password: "123456",
        name: "John Doe",
        type: "FAMILY",
        phone: "12345678910",
        family: {
          create: {},
        },
      },
      include: {
        family: true,
      },
    });

    admin = await prisma.user.create({
      data: {
        cpf: "12345678911",
        email: "email2@example.com",
        password: "123456",
        name: "John Doe",
        type: "NURSE",
        phone: "12345678910",
        nurse: {
          create: {
            isPermitted: true,
            isAdmin: true,
          },
        },
      },
      include: {
        nurse: true,
      },
    });

    cookieJar = await login(family.cpf, "123456");
    adminCookieJar = await login(admin.cpf, "123456");
  });

  it("should list all families", async () => {
    const response = await req(server).get(`/api/family`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("should try to list all families and returns 403 because a family is not admin", async () => {
    const response = await req(server).get("/api/family").set("Cookie", cookieJar);

    expect(response.status).toBe(403);
  });

  it("should retrieve a family", async () => {
    const response = await req(server)
      .get(`/api/family/${family.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body.cpf).toBe(family.cpf);
  });

  it("should try to retrieve a family and returns 403 because a family is not admin", async () => {
    const response = await req(server).get(`/api/family/${family.cpf}`).set("Cookie", cookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to retrieve a family and returns 404 because the family does not exist", async () => {
    const response = await req(server).get(`/api/family/09876785675`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(404);
  });

  it("should update a family as admin", async () => {
    const response = await req(server)
      .patch(`/api/family/${family.cpf}`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "John Does",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Does");
  });

  it("should update a family as family", async () => {
    const response = await req(server)
      .patch(`/api/family/${family.cpf}`)
      .set("Cookie", cookieJar)
      .send({
        name: "John Doesnt",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doesnt");
  });
});
