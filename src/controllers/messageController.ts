import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

// without test

const send: RequestHandler = async (req, res) => {
  const { title, content, attachment, fromNurse, createdAt, nurseCpf, familyCpf, parentId } =
    req.body;
  await prisma.message.create({
    data: {
      title,
      content,
      attachment,
      fromNurse,
      createdAt,
      nurse: { connect: { userCpf: nurseCpf } },
      family: { connect: { userCpf: familyCpf } },
      parent: parentId !== undefined ? { connect: { id: parentId } } : undefined,
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
  const { familyCpfQ } = req.query;
  const familyCpf = familyCpfQ as string;

  const message = await prisma.message.findMany({
    where: {
      familyCpf,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!message) {
    throw new HttpError.NotFound();
  }

  return res.json(message);
};

export default { list, chatMessage, send };
