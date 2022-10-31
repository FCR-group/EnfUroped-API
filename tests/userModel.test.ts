import nodecpf from "node-cpf";
import { resetDatabase } from "./utilities";
import prisma from "../src/prismaClient";
import { comparePassword } from "../src/helpers/userHelper";

describe("User model tests", () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  it("should create a student", async () => {
    const student = await prisma.user.create({
      data: {
        cpf: nodecpf.generate(),
        name: "Example Name",
        email: "student@email.com",
        password: "password",
        type: "STUDENT",
        student: {
          create: {},
        },
      },
    });

    expect(student.cpf).toBeDefined();
    expect(student.password).not.toBe("password");
    expect(comparePassword("password", student.password)).toBe(true);
  });

  it("should create a nurse", async () => {
    const nurse = await prisma.user.create({
      data: {
        cpf: nodecpf.generate(),
        name: "Example Name",
        email: "nurse@email.com",
        password: "password",
        type: "NURSE",
        nurse: {
          create: {},
        },
      },
    });

    expect(nurse.cpf).toBeDefined();
    expect(nurse.password).not.toBe("password");
    expect(comparePassword("password", nurse.password)).toBe(true);
  });

  it("should create a family", async () => {
    const family = await prisma.user.create({
      data: {
        cpf: nodecpf.generate(),
        name: "Example Name",
        email: "family@email.com",
        password: "password",
        type: "FAMILY",
        family: {
          create: {},
        },
      },
    });

    expect(family.cpf).toBeDefined();
    expect(family.password).not.toBe("password");
    expect(comparePassword("password", family.password)).toBe(true);
  });

  it("should try to create a student without student data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "student2@email.com",
          password: "password",
          type: "STUDENT",
        },
      })
    ).rejects.toThrowError("Student data expected, but incorrect data provided");
  });

  it("should try to create a nurse without nurse data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "nurse2@email.com",
          password: "password",
          type: "NURSE",
        },
      })
    ).rejects.toThrowError("Nurse data expected, but incorrect data provided");
  });

  it("should try to create a family without family data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "family2@email.com",
          password: "password",
          type: "FAMILY",
        },
      })
    ).rejects.toThrowError("Family data expected, but incorrect data provided");
  });

  it("should try to create a student with nurse data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "student3@email.com",
          password: "password",
          type: "STUDENT",
          nurse: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Student data expected, but incorrect data provided");
  });

  it("should try to create a nurse with student data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "nurse3@email.com",
          password: "password",
          type: "NURSE",
          student: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Nurse data expected, but incorrect data provided");
  });

  it("should try to create a family with student data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "family@email.com",
          password: "password",
          type: "FAMILY",
          student: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Family data expected, but incorrect data provided");
  });

  it("should try to create a student with family data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "student4@email.com",
          password: "password",
          type: "STUDENT",
          family: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Student data expected, but incorrect data provided");
  });

  it("should try to create a nurse with family data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "nurse4@email.com",
          password: "password",
          type: "NURSE",
          family: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Nurse data expected, but incorrect data provided");
  });

  it("should try to create a family with nurse data", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: nodecpf.generate(),
          name: "Example Name",
          email: "family4@email.com",

          password: "password",
          type: "FAMILY",
          nurse: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Family data expected, but incorrect data provided");
  });

  it("should update user password", async () => {
    const student = await prisma.user.update({
      where: {
        email: "student@email.com",
      },
      data: {
        password: "newpassword",
      },
    });

    expect(student.password).not.toBe("newpassword");
    expect(comparePassword("newpassword", student.password)).toBe(true);
    expect(comparePassword("password", student.password)).toBe(false);
  });
});
