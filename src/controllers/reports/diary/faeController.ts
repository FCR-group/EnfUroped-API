import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const { id, type, dateTime, diaryId } = req.body;
  await prisma.fae.create({
    data: {
      id,
      type,
      dateTime,
      diary: { connect: { appointmentId: diaryId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const faes = await prisma.fae.findMany();
  return res.json(faes);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idh = parseInt(id, 10);
  const fae = await prisma.fae.findUnique({ where: { id: idh } });
  if (!fae) {
    throw new HttpError.NotFound();
  }
  return res.json(fae);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const id = parseInt(idH, 10);

  const { type, dateTime, diaryId } = req.body;
  await prisma.fae.update({
    where: { id },
    data: {
      type,
      dateTime,
      diary: { connect: { appointmentId: diaryId } },
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const id = parseInt(idHelper, 10);
  await prisma.fae.delete({
    where: {
      id,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
