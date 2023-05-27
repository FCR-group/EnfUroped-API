import req from "supertest";
import prisma from "../../src/prismaClient";
import server from "../../src/server";
import { UserWithNurse } from "../../src/types/userTypes";
import { createNurse, login, resetDatabase } from "../utilities";

describe("Nurse routes tests", () => {
  let admin: UserWithNurse;
  let adminCookieJar: string;

  let nurse: UserWithNurse;
  let nurseCookieJar: string;

  let nurse2: UserWithNurse;
  let nurse2CookieJar: string;

  beforeAll(async () => {
    await resetDatabase();

    admin = await createNurse(undefined, undefined, true, true);
    adminCookieJar = await login(admin.cpf);

    nurse = await createNurse(undefined, undefined, true);
    nurseCookieJar = await login(nurse.cpf);

    nurse2 = await createNurse(undefined, undefined, true);
    nurse2CookieJar = await login(nurse2.cpf);
  });

  it("should list all nurses", async () => {
    const response = await req(server).get("/api/nurse").set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  it("should try to list all nurses but returns 403 as the user is not admin", async () => {
    const response = await req(server).get("/api/nurse").set("Cookie", nurseCookieJar);

    expect(response.status).toBe(403);
  });

  it("should retrieve a nurse", async () => {
    const response = await req(server).get(`/api/nurse/${nurse.cpf}`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body.cpf).toBe(nurse.cpf);
    expect(response.body.password).toBeUndefined();
  });

  it("should try to retrieve a nurse but returns 403 as the user is not admin", async () => {
    const response = await req(server).get(`/api/nurse/${nurse.cpf}`).set("Cookie", nurseCookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to retrieve a nurse but returns 404 as the nurse does not exist", async () => {
    const response = await req(server).get(`/api/nurse/11111111111`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(404);
  });

  it("should update a nurse", async () => {
    const response = await req(server)
      .patch(`/api/nurse/${nurse.cpf}`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "New name",
        numCoren: "7654321",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("New name");
    expect(response.body.nurse.numCoren).toBe("7654321");
  });

  it("should try to update a nurse but returns 403 as the user is another nurse", async () => {
    const response = await req(server)
      .patch(`/api/nurse/${nurse.cpf}`)
      .set("Cookie", nurse2CookieJar)
      .send({
        name: "New name",
      });

    expect(response.status).toBe(403);
  });

  it("should try to update a nurse but returns 400 as the nurse does not exist", async () => {
    const response = await req(server)
      .patch(`/api/nurse/11111111111`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "New name",
      });

    expect(response.status).toBe(400);
  });

  it("should delete a nurse", async () => {
    const response = await req(server)
      .delete(`/api/nurse/${nurse.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);
  });

  it("should try to delete a nurse but returns 403 as the user is not admin", async () => {
    const response = await req(server)
      .delete(`/api/nurse/${nurse2.cpf}`)
      .set("Cookie", nurse2CookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to delete a nurse but returns 400 as the nurse does not exist", async () => {
    const response = await req(server)
      .delete(`/api/nurse/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(400);
  });

  it("should permit a nurse", async () => {
    const response = await req(server)
      .patch(`/api/nurse/permit/${nurse2.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);

    const updatedNurse = await prisma.user.findUnique({
      where: {
        cpf: nurse2.cpf,
      },
      include: {
        nurse: true,
      },
    });

    expect(updatedNurse?.nurse?.isPermitted).toBe(true);
  });

  it("should try to permit a nurse but returns 403 as the user is not admin", async () => {
    const response = await req(server)
      .patch(`/api/nurse/permit/${nurse2.cpf}`)
      .set("Cookie", nurse2CookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to permit a nurse but returns 400 as the nurse does not exist", async () => {
    const response = await req(server)
      .patch(`/api/nurse/permit/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(400);
  });

  it("should turn a nurse into an admin", async () => {
    const response = await req(server)
      .patch(`/api/nurse/turnAdmin/${nurse2.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);

    const updatedNurse = await prisma.user.findUnique({
      where: {
        cpf: nurse2.cpf,
      },
      include: {
        nurse: true,
      },
    });

    expect(updatedNurse?.nurse?.isAdmin).toBe(true);
  });

  it("should try to turn a nurse into an admin but returns 403 as the user is not admin", async () => {
    const nurseAux = await createNurse(undefined, undefined, true);
    const cookieJarAux = await login(nurseAux.cpf);

    const response = await req(server)
      .patch(`/api/nurse/turnAdmin/${nurse2.cpf}`)
      .set("Cookie", cookieJarAux);

    expect(response.status).toBe(403);
  });

  it("should try to turn a nurse into an admin but returns 400 as the nurse does not exist", async () => {
    const response = await req(server)
      .patch(`/api/nurse/turnAdmin/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(400);
  });
});
