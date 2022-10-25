import req from "supertest";
import nodeCpf from "node-cpf";
import { differenceInSeconds } from "date-fns";
import server from "../../src/server";
import { resetDatabase } from "../utilities";
import prisma from "../../src/prismaClient";

describe("Login tests", () => {
  const studentToRegister = {
    cpf: nodeCpf.generate(),
    email: "student@email.com",
    password: "password",
    name: "Example Name",
  };

  const nurseToRegister = {
    cpf: nodeCpf.generate(),
    email: "nurse@email.com",
    password: "password",
    name: "Example Name",
  };

  const familyToRegister = {
    cpf: nodeCpf.generate(),
    email: "family@email.com",
    password: "password",
    name: "Example Name",
  };

  beforeAll(async () => {
    await resetDatabase();
  });

  it("should register a student", async () => {
    const response = await req(server).post("/auth/register/student").send(studentToRegister);

    expect(response.status).toBe(201);
    expect(response.body.cpf).toBe(studentToRegister.cpf);
  });

  it("should register a nurse", async () => {
    const response = await req(server).post("/auth/register/nurse").send(nurseToRegister);

    expect(response.status).toBe(201);
    expect(response.body.cpf).toBe(nurseToRegister.cpf);
  });

  it("should register a family", async () => {
    const response = await req(server).post("/auth/register/family").send(familyToRegister);

    expect(response.status).toBe(201);
    expect(response.body.cpf).toBe(familyToRegister.cpf);
  });

  it("should make login", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: familyToRegister.cpf,
      password: familyToRegister.password,
    });

    expect(loginResponse.status).toBe(200);

    const cookieJar = loginResponse.header["set-cookie"];

    expect(cookieJar).toBeDefined();
    expect(cookieJar.length).toBe(1);

    const cookie = cookieJar[0];

    expect(cookie.startsWith("uroped_session=")).toBeTruthy();
    expect(cookie.includes("HttpOnly")).toBeTruthy();

    const expiresStart = cookie.indexOf("Expires=");
    const expiresEnd = cookie.indexOf(";", expiresStart);
    const expires = cookie.substring(expiresStart + 8, expiresEnd);
    const expiresDate = new Date(expires).getTime();
    const now = Date.now();

    expect(differenceInSeconds(expiresDate, now)).toBeLessThanOrEqual(60);

    const apiRootResponse = await req(server).get("/api").set("Cookie", cookieJar);

    expect(apiRootResponse.status).toBe(200);
  });

  it("should not make login with wrong password", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: familyToRegister.cpf,
      password: "wrong password",
    });

    expect(loginResponse.status).toBe(401);
  });

  it("should not make login with wrong cpf", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: "wrong cpf",
      password: familyToRegister.password,
    });

    expect(loginResponse.status).toBe(401);
  });

  it("should try to make login with a non permitted nurse", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: nurseToRegister.cpf,
      password: nurseToRegister.password,
    });

    expect(loginResponse.status).toBe(403);
  });

  it("should try to make login with a non permitted student", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: studentToRegister.cpf,
      password: studentToRegister.password,
    });

    expect(loginResponse.status).toBe(403);
  });

  it("should make login with a permitted nurse", async () => {
    await prisma.nurse.update({
      where: {
        userCpf: nurseToRegister.cpf,
      },
      data: {
        isPermitted: true,
      },
    });

    const loginResponse = await req(server).post("/auth/login").send({
      cpf: nurseToRegister.cpf,
      password: nurseToRegister.password,
    });

    expect(loginResponse.status).toBe(200);
  });

  it("should make login with a permitted student", async () => {
    await prisma.student.update({
      where: {
        userCpf: studentToRegister.cpf,
      },
      data: {
        isPermitted: true,
      },
    });

    const loginResponse = await req(server).post("/auth/login").send({
      cpf: studentToRegister.cpf,
      password: studentToRegister.password,
    });

    expect(loginResponse.status).toBe(200);
  });

  it("should try to access a protected route without login", async () => {
    const response = await req(server).get("/api");

    expect(response.status).toBe(401);
  });

  it("should try to access a protected route with invalid cookie", async () => {
    const response = await req(server).get("/api").set("Cookie", "uroped_session=invalid");

    expect(response.status).toBe(401);
  });

  it("should make logout", async () => {
    const loginResponse = await req(server).post("/auth/login").send({
      cpf: familyToRegister.cpf,
      password: familyToRegister.password,
    });

    expect(loginResponse.status).toBe(200);

    const cookieJar = loginResponse.header["set-cookie"];

    expect(cookieJar).toBeDefined();
    expect(cookieJar.length).toBe(1);

    const logoutResponse = await req(server).post("/auth/logout").set("Cookie", cookieJar);

    expect(logoutResponse.status).toBe(200);

    const apiRootResponse = await req(server).get("/api").set("Cookie", cookieJar);

    expect(apiRootResponse.status).toBe(401);
  });
});
