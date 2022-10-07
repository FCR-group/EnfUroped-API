import { RequestHandler } from "express";
import HttpError from "http-errors";
import prismaClient from "../prismaClient";

const serverIsAlive: RequestHandler = (req, res) => res.send("Server is alive!");

const serverIsReady: RequestHandler = async (req, res) => {
  const check = await prismaClient.$queryRaw`SELECT 1`;

  if (!check) {
    throw new HttpError.ServiceUnavailable("Database is not ready");
  }

  return res.send("Server is ready!");
};

export default { serverIsAlive, serverIsReady };
