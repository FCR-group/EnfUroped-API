import { UserType } from "@prisma/client";
import { Request, RequestHandler, Response } from "express";
import HttpError from "http-errors";
import { authenticate } from "../middlewares/authMiddlewares";
import prisma from "../prismaClient";

const login = [
  authenticate,
  async (req: Request, res: Response) => res.send("Login efetuado com sucesso"),
];

const logout: RequestHandler = (req, res) =>
  req.logout(() => res.send("Logout efetuado com sucesso"));

const familyRegister: RequestHandler = async (req, res) => {
  const { cpf, email, name, phone, password } = req.body;

  const family = await prisma.user.create({
    data: {
      cpf,
      name,
      email,
      password,
      phone,
      type: UserType.FAMILY,
      family: {
        create: {},
      },
    },
    select: {
      cpf: true,
      name: true,
      email: true,
      phone: true,
      type: true,
      family: true,
    },
  });

  return res.status(201).json(family);
};

const nurseRegister: RequestHandler = async (req, res) => {
  const { cpf, email, name, phone, password, numCoren, ufCoren } = req.body;

  const nurse = await prisma.user.create({
    data: {
      cpf,
      name,
      email,
      password,
      phone,
      type: UserType.NURSE,
      nurse: {
        create: {
          numCoren,
          ufCoren,
        },
      },
    },
    select: {
      cpf: true,
      name: true,
      email: true,
      phone: true,
      type: true,
      nurse: true,
    },
  });

  return res.status(201).json(nurse);
};

const studentRegister: RequestHandler = async (req, res) => {
  const { cpf, email, name, phone, password } = req.body;

  const student = await prisma.user.create({
    data: {
      cpf,
      name,
      email,
      password,
      phone,
      type: UserType.STUDENT,
      student: {
        create: {},
      },
    },
    select: {
      cpf: true,
      name: true,
      email: true,
      phone: true,
      type: true,
      student: true,
    },
  });

  return res.status(201).json(student);
};

const getLoggedInUser: RequestHandler = (req, res) => {
  if (!req.user) {
    throw new HttpError.Unauthorized();
  }

  return res.json(req.user);
};

export default { login, logout, familyRegister, nurseRegister, studentRegister, getLoggedInUser };
