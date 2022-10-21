import { Prisma, User, UserType } from "@prisma/client";
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

const checkUserType: Prisma.Middleware = (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const user = params.args.data;

    if (user.type === UserType.NURSE) {
      if (!user.nurse || user.student || user.family) {
        throw new Prisma.PrismaClientValidationError(
          "Nurse data expected, but incorrect data provided"
        );
      }
    }

    if (user.type === UserType.STUDENT) {
      if (!user.student || user.nurse || user.family) {
        throw new Prisma.PrismaClientValidationError(
          "Student data expected, but incorrect data provided"
        );
      }
    }

    if (user.type === UserType.FAMILY) {
      if (!user.family || user.nurse || user.student) {
        throw new Prisma.PrismaClientValidationError(
          "Family data expected, but incorrect data provided"
        );
      }
    }
  }

  return next(params);
};

export { hashPasswordBeforeCreate, hashPasswordBeforeUpdate, checkUserType };
