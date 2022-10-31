import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

// TODO

const send: RequestHandler = async (req, res) => {
  const { title, content, attachment, fromNurse, createdAt, nurseCpf, patientId, creatorName } =
    req.body;
  await prisma.message.create({
    data: {
      title,
      content,
      attachment,
      fromNurse,
      createdAt,
      nurse: { connect: { userCpf: nurseCpf } },
      patient: { connect: { id: patientId } },
      creatorName,
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
  const { patientIdQ } = req.query;
  const patientId = parseInt(patientIdQ as string, 10);

  const message = await prisma.message.findMany({
    where: {
      patientId,
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
