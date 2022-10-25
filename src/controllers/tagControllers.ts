import { RequestHandler } from "express";
import HttpError from "http-errors";
import prisma from "../prismaClient";

const create: RequestHandler = async (req, res) => {
  const { name } = req.body;
  await prisma.tag.create({
    data: {
      name,
    },
  });
  return res.sendStatus(201);
};

const list: RequestHandler = async (req, res) => {
  const tags = await prisma.tag.findMany();
  if (!tags) {
    throw new HttpError.NotFound();
  }
  return res.json(tags);
};

const retrieve: RequestHandler = async (req, res) => {
  const { name } = req.params;
  const tag = await prisma.tag.findUnique({ where: { name } });
  if (!tag) {
    throw new HttpError.NotFound();
  }
  return res.json(tag);
};

// todo: change the type of post
const addPosts: RequestHandler = async (req, res) => {
  const { name, post } = req.body;
  await prisma.tag.update({
    where: { name },
    data: {
      posts: post,
    },
  });
  return res.sendStatus(204);
};

const destroy: RequestHandler = async (req, res) => {
  const { name } = req.params;
  await prisma.tag.delete({
    where: {
      name,
    },
  });
  return res.sendStatus(204);
};

export default { list, retrieve, destroy, create, addPosts };
