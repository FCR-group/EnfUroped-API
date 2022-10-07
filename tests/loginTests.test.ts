import req from "supertest";
import nodeCpf from "node-cpf";
import { User } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import server from "../src/server";
import { resetDatabase } from "./utilities";

describe("Login tests", () => {
  const userToRegister: User = {
    cpf: nodeCpf.generate(),
    email: "example@email.com",
    password: "password",
  };

  beforeAll(async () => {
    await resetDatabase();
  });

  it("should register a new user and make login", async () => {
    const response = await req(server).post("/auth/register").send({
      cpf: userToRegister.cpf,
      email: userToRegister.email,
      password: userToRegister.password,
    });

    expect(response.status).toBe(201);

    const loginResponse = await req(server).post("/auth/login").send({
      cpf: userToRegister.cpf,
      password: userToRegister.password,
    });

    expect(loginResponse.status).toBe(200);

    const cookieJar = loginResponse.header["set-cookie"];

    expect(cookieJar).toBeDefined();
    expect(cookieJar.length).toBe(1);

    const cookie = cookieJar[0];

    expect(cookie.startsWith("session=")).toBeTruthy();
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
});
