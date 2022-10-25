import req from "supertest";
import nodeCpf from "node-cpf";
import server from "../../src/server";
import { login, resetDatabase, createFamily, createNurse } from "../utilities";
import { UserWithFamily, UserWithNurse } from "../../src/types/userTypes";

describe("Family Routes", () => {
  let family: UserWithFamily;
  let cookieJar: string;

  let admin: UserWithNurse;
  let adminCookieJar: string;

  let family2: UserWithFamily;
  let cookieJar2: string;

  beforeAll(async () => {
    await resetDatabase();

    family = await createFamily();
    family2 = await createFamily();
    admin = await createNurse(undefined, undefined, true, true);

    cookieJar = await login(family.cpf);
    cookieJar2 = await login(family2.cpf);
    adminCookieJar = await login(admin.cpf);
  });

  it("should list all families", async () => {
    const response = await req(server).get(`/api/family`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
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
    const response = await req(server).get(`/api/family/11111111111`).set("Cookie", adminCookieJar);

    expect(response.status).toBe(404);
  });

  it("should update a family as admin", async () => {
    const response = await req(server)
      .patch(`/api/family/${family.cpf}`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "John Does",
        cpf: nodeCpf.generate(),
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Does");

    family.cpf = response.body.cpf;
    cookieJar = await login(family.cpf);
  });

  it("should update a family as family", async () => {
    const response = await req(server)
      .patch(`/api/family/${family.cpf}`)
      .set("Cookie", cookieJar)
      .send({
        name: "John Doesnt",
        cpf: nodeCpf.generate(true),
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doesnt");

    family.cpf = response.body.cpf;
    cookieJar = await login(family.cpf);
  });

  it("should try to update a family and returns 403 because a family cant update another family", async () => {
    const response = await req(server)
      .patch(`/api/family/${family.cpf}`)
      .set("Cookie", cookieJar2)
      .send({
        name: "John Doesnt",
        cpf: nodeCpf.generate(true),
      });

    expect(response.status).toBe(403);
  });

  it("should try to update a family and returns 400 because the family does not exist", async () => {
    const response = await req(server)
      .patch(`/api/family/11111111111`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "John Doesnt",
        cpf: nodeCpf.generate(true),
      });

    expect(response.status).toBe(400);
  });

  it("should delete a family as admin", async () => {
    const response = await req(server)
      .delete(`/api/family/${family.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);
  });

  it("should try to delete a family and returns 403 because a family is not admin", async () => {
    const response = await req(server)
      .delete(`/api/family/${family2.cpf}`)
      .set("Cookie", cookieJar2);

    expect(response.status).toBe(403);
  });

  it("should try to delete a family and returns 400 because the family does not exist", async () => {
    const response = await req(server)
      .delete(`/api/family/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(400);
  });
});
