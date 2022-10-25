import nodecpf from "node-cpf";
import { v4 as uuid } from "uuid";
import { createStudent, resetDatabase } from "../utilities";
import prisma from "../../src/prismaClient";
import { comparePassword } from "../../src/helpers/userHelper";
import { Prisma } from "@prisma/client";

describe("User model tests", () => {
  beforeAll(async () => {
    await resetDatabase();
  });

  it("should create a student", async () => {
    const student = await prisma.user.create({
      data: {
        cpf: nodecpf.generate(true),
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

  it("should try to create a user with invalid cpf", async () => {
    await expect(
      prisma.user.create({
        data: {
          cpf: "123456789",
          name: "Example Name",
          email: "EXAMPLE@email.com",
          password: "password",
          type: "STUDENT",
          student: {
            create: {},
          },
        },
      })
    ).rejects.toThrowError("Invalid CPF");
  });

  it("should create a user with valid masked cpf", async () => {
    const cpf = nodecpf.generate(true);

    const student = await prisma.user.create({
      data: {
        cpf,
        name: "Example Name",
        email: `${uuid()}@example.com`,
        password: "password",
        type: "STUDENT",
        student: {
          create: {},
        },
      },
    });

    expect(student.cpf).toBe(nodecpf.unMask(cpf));
  });

  it("should create a user with valid unmasked cpf", async () => {
    const cpf = nodecpf.generate();

    const student = await prisma.user.create({
      data: {
        cpf,
        name: "Example Name",
        email: `${uuid()}@example.com`,
        password: "password",
        type: "STUDENT",
        student: {
          create: {},
        },
      },
    });

    expect(student.cpf).toBe(cpf);
  });

  it("should update user cpf", async () => {
    const student = await createStudent();

    const studentUpdated = await prisma.user.update({
      where: {
        cpf: student.cpf,
      },
      data: {
        cpf: nodecpf.generate(true),
      },
    });

    expect(studentUpdated.cpf).not.toBe(student.cpf);
    expect(studentUpdated.cpf).toBe(nodecpf.unMask(studentUpdated.cpf));
  });

  it("should try to update user cpf with invalid cpf", async () => {
    const student = await createStudent();

    await expect(
      prisma.user.update({
        where: {
          cpf: student.cpf,
        },
        data: {
          cpf: "123456789",
        },
      })
    ).rejects.toThrowError("Invalid CPF");
  });

  it("should try to update user cpf with already used cpf", async () => {
    const student = await createStudent();
    const student2 = await createStudent();

    await expect(
      prisma.user.update({
        where: {
          cpf: student.cpf,
        },
        data: {
          cpf: student2.cpf,
        },
      })
    ).rejects.toThrowError(Prisma.PrismaClientKnownRequestError);
  });
});
