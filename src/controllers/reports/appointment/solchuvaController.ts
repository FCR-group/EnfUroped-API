import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../../../prismaClient";

const send: RequestHandler = async (req, res) => {
  const { appoitmentId, numChuvas } = req.body;
  await prisma.solChuva.create({
    data: {
      numChuvas,
      appointment: { connect: { id: appoitmentId } },
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const solChuvas = await prisma.solChuva.findMany();
  return res.json(solChuvas);
};

const retrieve: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const appointmentId = parseInt(id, 10);
  const solChuva = await prisma.solChuva.findUnique({ where: { appointmentId } });
  if (!solChuva) {
    throw new HttpError.NotFound();
  }
  return res.json(solChuva);
};

const update: RequestHandler = async (req, res) => {
  const { idH } = req.params;
  const appointmentId = parseInt(idH, 10);

  const { numChuvas } = req.body;
  await prisma.solChuva.update({
    where: { appointmentId },
    data: {
      numChuvas,
    },
  });
  return res.sendStatus(204);
};

const remove: RequestHandler = async (req, res) => {
  const idHelper = req.params.id;
  const appointmentId = parseInt(idHelper, 10);
  await prisma.solChuva.delete({
    where: {
      appointmentId,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, remove, send, update };
