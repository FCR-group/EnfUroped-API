import { Prisma, User } from "@prisma/client";
import bcrypt from "bcrypt";

const hashPasswordBeforeCreate: Prisma.Middleware = (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const user = params.args.data as User;

    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    // eslint-disable-next-line no-param-reassign
    params.args.data = user;
  }

  return next(params);
};

const hashPasswordBeforeUpdate: Prisma.Middleware = (params, next) => {
  if (
    params.model === "User" &&
    params.action === "update" &&
    params.args.data.password !== undefined
  ) {
    const user = params.args.data as User;

    const hash = bcrypt.hashSync(user.password, 10);

    user.password = hash;

    // eslint-disable-next-line no-param-reassign
    params.args.data = user;
  }

  return next(params);
};

export { hashPasswordBeforeCreate, hashPasswordBeforeUpdate };
