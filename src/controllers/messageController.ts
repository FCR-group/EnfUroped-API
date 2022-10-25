import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const send: RequestHandler = async (req, res) => {
  const {
    title,
    content,
    attachment,
    fromNurse,
    createdAt,
    nurse,
    nurseCpf,
    family,
    familyCpf,
    response,
    responseId,
    parent,
  } = req.body;
  await prisma.message.create({
    data: {
      title,
      content,
      attachment,
      fromNurse,
      createdAt,
      nurse,
      nurseCpf,
      family,
      familyCpf,
      response,
      responseId,
      parent,
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const messages = await prisma.message.findMany();
  if (!messages) {
    throw new HttpError.NotFound();
  }
  return res.json(messages);
};

const chatMessage: RequestHandler = async (req, res) => {
  const { nurse, patient } = req.query;
  const message = await prisma.message.findMany({ where: {} });

  if (!message) {
    throw new HttpError.NotFound();
  }

  return res.json(message);
};

export default { list, chatMessage, send };
