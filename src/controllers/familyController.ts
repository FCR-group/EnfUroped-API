import { UserType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const list: RequestHandler = async (req, res) => {
  const families = await prisma.user.findMany({
    where: {
      type: UserType.FAMILY,
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

  return res.status(200).json(families);
};

const retrieve: RequestHandler = async (req, res) => {
  const { cpf } = req.params;

  const family = await prisma.user.findFirst({
    where: {
      cpf,
      type: UserType.FAMILY,
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

  if (!family) {
    throw new HttpError.NotFound();
  }

  return res.status(200).json(family);
};

const update: RequestHandler = async (req, res) => {
  const { cpf } = req.params;
  const { cpf: cpfToChange, name, email, phone, password } = req.body;

  const family = await prisma.user.update({
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
      family: true,
    },
  });

  return res.status(200).json(family);
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

export default {
  list,
  retrieve,
  update,
  destroy,
};
