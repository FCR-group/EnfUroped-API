import req from "supertest";
import server from "../../src/server";
import prisma from "../../src/prismaClient";
import { UserWithNurse, UserWithStudent } from "../../src/types/userTypes";
import { createNurse, createStudent, login, resetDatabase } from "../utilities";

describe("Student routes tests", () => {
  let admin: UserWithNurse;
  let adminCookieJar: string;

  let student: UserWithStudent;
  let studentCookieJar: string;

  let student2: UserWithStudent;
  let student2CookieJar: string;

  beforeAll(async () => {
    await resetDatabase();

    admin = await createNurse(undefined, undefined, true, true);
    adminCookieJar = await login(admin.cpf);

    student = await createStudent(undefined, undefined, true);
    studentCookieJar = await login(student.cpf);

    student2 = await createStudent(undefined, undefined, true);
    student2CookieJar = await login(student2.cpf);
  });

  it("should list all students", async () => {
    const response = await req(server).get("/api/student").set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });

  it("should try to list all students but returns 403 as the user is not admin", async () => {
    const response = await req(server).get("/api/student").set("Cookie", studentCookieJar);

    expect(response.status).toBe(403);
  });

  it("should retrieve a student", async () => {
    const response = await req(server)
      .get(`/api/student/${student.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(200);
    expect(response.body.cpf).toBe(student.cpf);
    expect(response.body.password).toBeUndefined();
  });

  it("should try to retrieve a student but returns 403 as the user is not admin", async () => {
    const response = await req(server)
      .get(`/api/student/${student.cpf}`)
      .set("Cookie", studentCookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to retrieve a student but returns 404 as the student does not exist", async () => {
    const response = await req(server)
      .get(`/api/student/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(404);
  });

  it("should update a student", async () => {
    const response = await req(server)
      .patch(`/api/student/${student.cpf}`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "John Does",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Does");
  });

  it("should update a student as the student itself", async () => {
    const response = await req(server)
      .patch(`/api/student/${student2.cpf}`)
      .set("Cookie", student2CookieJar)
      .send({
        name: "John Doesnt",
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("John Doesnt");
  });

  it("should try to update a student but returns 403 as the user another student", async () => {
    const response = await req(server)
      .patch(`/api/student/${student.cpf}`)
      .set("Cookie", student2CookieJar)
      .send({
        name: "John Does",
      });

    expect(response.status).toBe(403);
  });

  it("should try to update a student but returns 400 as the student does not exist", async () => {
    const response = await req(server)
      .patch(`/api/student/11111111111`)
      .set("Cookie", adminCookieJar)
      .send({
        name: "John Does",
      });

    expect(response.status).toBe(400);
  });

  it("should delete a student", async () => {
    const response = await req(server)
      .delete(`/api/student/${student.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);
  });

  it("should try to delete a student but returns 403 as the user is not admin", async () => {
    const response = await req(server)
      .delete(`/api/student/${student2.cpf}`)
      .set("Cookie", student2CookieJar);

    expect(response.status).toBe(403);
  });

  it("should try to delete a student but returns 400 as the student does not exist", async () => {
    const response = await req(server)
      .delete(`/api/student/11111111111`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(400);
  });

  it("should permit a student", async () => {
    const response = await req(server)
      .patch(`/api/student/permit/${student2.cpf}`)
      .set("Cookie", adminCookieJar);

    expect(response.status).toBe(204);

    const permitedStudent = await prisma.user.findUnique({
      where: {
        cpf: student2.cpf,
      },
      include: {
        student: true,
      },
    });

    expect(permitedStudent?.student?.isPermitted).toBe(true);
  });

  it("should try to permit a student but returns 403 as the user is not admin", async () => {
    const response = await req(server)
      .patch(`/api/student/permit/${student2.cpf}`)
      .set("Cookie", student2CookieJar);

    expect(response.status).toBe(403);
  });
});
