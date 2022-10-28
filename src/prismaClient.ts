import { Prisma, PrismaClient } from "@prisma/client";
import {
  checkCpfBeforeCreate,
  checkCpfBeforeUpdate,
  hashPasswordBeforeCreate,
  hashPasswordBeforeUpdate,
  checkUserType,
} from "./middlewares/prismaMiddlewares";
import { NODE_ENV } from "./utils/env";

const options: Prisma.PrismaClientOptions = {};

if (NODE_ENV === "test") {
  options.log = ["error"];
} else if (NODE_ENV !== "production") {
  options.log = ["query", "info", "warn", "error"];
  // options.errorFormat = "pretty";
}

const prismaClient = new PrismaClient(options);

prismaClient.$use(checkCpfBeforeCreate);
prismaClient.$use(checkCpfBeforeUpdate);
prismaClient.$use(hashPasswordBeforeCreate);
prismaClient.$use(hashPasswordBeforeUpdate);
prismaClient.$use(checkUserType);

export default prismaClient;
