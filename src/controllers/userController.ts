import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const list: RequestHandler = async (req, res) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

const retrieve: RequestHandler = async (req, res) => {
  const { cpf } = req.params;
  const user = await prisma.user.findUnique({ where: { cpf } });
  if (!user) {
    throw new HttpError.NotFound();
  }
  return res.json(user);
};

const destroy: RequestHandler = async (req, res) => {
  const { cpf } = req.params;
  await prisma.user.delete({ where: { cpf } });
  return res.sendStatus(204);
};

export default { list, retrieve, destroy };
