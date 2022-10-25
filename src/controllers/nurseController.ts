import { UserType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const list: RequestHandler = async (req, res) => {
  const nurses = await prisma.user.findMany({
    where: {
      type: UserType.NURSE,
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

  return res.status(200).json(nurses);
};

const retrieve: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  const nurse = await prisma.user.findFirst({
    where: {
      cpf,
      type: UserType.NURSE,
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

  if (!nurse) {
    throw new HttpError.NotFound();
  }

  return res.status(200).json(nurse);
};

const update: RequestHandler = async (req, res) => {
  const { cpf } = req.params;
  const { cpf: cpfToChange, name, email, phone, password } = req.body;

  const nurse = await prisma.user.update({
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
      nurse: true,
    },
  });

  return res.status(200).json(nurse);
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

  await prisma.nurse.update({
    where: {
      userCpf: cpf,
    },
    data: {
      isPermitted: true,
    },
  });

  return res.sendStatus(204);
};

const turnAdmin: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  await prisma.nurse.update({
    where: {
      userCpf: cpf,
    },
    data: {
      isAdmin: true,
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
  turnAdmin,
};
