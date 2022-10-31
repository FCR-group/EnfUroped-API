import { TokenType } from "@prisma/client";
import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const create: RequestHandler = async (req, res) => {
  const { uuid, expiresAt, type, userCpf } = req.body;
  await prisma.token.create({
    data: {
      uuid,
      expiresAt,
      type: type === "PASSWORD_RECOVERY" ? TokenType.PASSWORD_RECOVERY : TokenType.EMAIL_VALIDATION,
      user: { connect: { cpf: userCpf } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const tokens = await prisma.token.findMany();
  return res.json(tokens);
};

const retrieve: RequestHandler = async (req, res) => {
  const { uuid } = req.params;
  const token = await prisma.token.findUnique({ where: { uuid } });
  if (!token) {
    throw new HttpError.NotFound();
  }
  return res.json(token);
};

const update: RequestHandler = async (req, res) => {
  const { uuid } = req.params;

  const { expiresAt, type, userCpf } = req.body;
  await prisma.token.update({
    where: { uuid },
    data: {
      expiresAt,
      type: type === "PASSWORD_RECOVERY" ? TokenType.PASSWORD_RECOVERY : TokenType.EMAIL_VALIDATION,
      user: { connect: { cpf: userCpf } },
    },
  });
  return res.sendStatus(204);
};

const destroy: RequestHandler = async (req, res) => {
  const { uuid } = req.params;
  await prisma.token.delete({
    where: {
      uuid,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, destroy, create, update };
