import { PrismaClient } from "@prisma/client";
import {
  hashPasswordBeforeCreate,
  hashPasswordBeforeUpdate,
} from "./middlewares/prismaMiddlewares";

const prismaClient = new PrismaClient();

prismaClient.$use(hashPasswordBeforeCreate);
prismaClient.$use(hashPasswordBeforeUpdate);

export default prismaClient;
