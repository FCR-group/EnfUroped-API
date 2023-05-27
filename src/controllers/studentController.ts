import { UserType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const list: RequestHandler = async (req, res) => {
  const students = await prisma.user.findMany({
    where: {
      type: UserType.STUDENT,
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

  return res.status(200).json(students);
};

const retrieve: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  const student = await prisma.user.findFirst({
    where: {
      cpf,
      type: UserType.STUDENT,
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

  if (!student) {
    throw new HttpError.NotFound();
  }

  return res.status(200).json(student);
};

const update: RequestHandler = async (req, res) => {
  const { cpf } = req.params;
  const { cpf: cpfToChange, name, email, phone, password } = req.body;

  const student = await prisma.user.update({
    where: {
      cpf,
    },
    data: {
      cpf: cpfToChange,
      name,
      email,
      phone,
      password,
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

  return res.status(200).json(student);
};

const destroy: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  await prisma.user.delete({
    where: {
      cpf,
    },
  });

  return res.sendStatus(204);
};

const permit: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  await prisma.student.update({
    where: {
      userCpf: cpf,
    },
    data: {
      isPermitted: true,
    },
  });

  return res.sendStatus(204);
};

export default {
  list,
  retrieve,
  update,
  destroy,
  permit,
};
