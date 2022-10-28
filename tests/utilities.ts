import req from "supertest";
import nodeCpf from "node-cpf";
import { v4 as uuid } from "uuid";
import prisma from "../src/prismaClient";
import server from "../src/server";

async function resetDatabase() {
  await prisma.$transaction(async (transaction) => {
    await transaction.message.deleteMany();
    await transaction.appointment.deleteMany();
    await transaction.availability.deleteMany();
    await transaction.student.deleteMany();
    await transaction.family.deleteMany();
    await transaction.nurse.deleteMany();
    await transaction.user.deleteMany();
    await transaction.patient.deleteMany();
    await transaction.tag.deleteMany();
    await transaction.post.deleteMany();
    await transaction.token.deleteMany();
    await transaction.session.deleteMany();
  });
}

async function login(cpf: string, password: string = "123456") {
  const response = await req(server).post(`/auth/login`).send({
    cpf,
    password,
  });

  return response.header["set-cookie"];
}

async function createFamily(cpf?: string, email?: string) {
  const family = await prisma.user.create({
    data: {
      cpf: cpf || nodeCpf.generate(),
      email: email || `${uuid()}@example.com`,
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

  return family;
}

async function createNurse(
  cpf?: string,
  email?: string,
  isPermitted: boolean = false,
  isAdmin: boolean = false
) {
  const nurse = await prisma.user.create({
    data: {
      cpf: cpf || nodeCpf.generate(),
      email: email || `${uuid()}@example.com`,
      password: "123456",
      name: "John Doe",
      type: "NURSE",
      phone: "12345678910",
      nurse: {
        create: {
          isPermitted,
          isAdmin,
          numCoren: Math.round(Math.random() * 10000000).toFixed(0),
          ufCoren: Math.round(Math.random() * 100).toFixed(0),
        },
      },
    },
    include: {
      nurse: true,
    },
  });

  return nurse;
}

async function createStudent(cpf?: string, email?: string, isPermitted: boolean = false) {
  const student = await prisma.user.create({
    data: {
      cpf: cpf || nodeCpf.generate(),
      email: email || `${uuid()}@example.com`,
      password: "123456",
      name: "John Doe",
      type: "STUDENT",
      phone: "12345678910",
      student: {
        create: {
          isPermitted,
        },
      },
    },
    include: {
      student: true,
    },
  });

  return student;
}

export { resetDatabase, login, createFamily, createNurse, createStudent };
