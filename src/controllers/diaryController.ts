import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const create: RequestHandler = async (req, res) => {
  const { appointmentId } = req.body;
  await prisma.diary.create({
    data: {
      appointment: { connect: { id: appointmentId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const diarys = await prisma.diary.findMany();
  return res.json(diarys);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id, 10);
  const diary = await prisma.diary.findUnique({ where: { appointmentId: idNum } });
  if (!diary) {
    throw new HttpError.NotFound();
  }
  return res.json(diary);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const appointmentId = parseInt(idHelper, 10);
  await prisma.diary.delete({
    where: {
      appointmentId,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, create };
