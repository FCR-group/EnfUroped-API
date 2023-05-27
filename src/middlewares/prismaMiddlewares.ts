import { Prisma, User, UserType } from "@prisma/client";
import bcrypt from "bcrypt";
import nodeCpf from "node-cpf";

const checkCpfBeforeCreate: Prisma.Middleware = (params, next) => {
  if (params.model === "User" && params.action === "create") {
    const user = params.args.data as User;

    if (!nodeCpf.validate(user.cpf)) {
      throw new Prisma.PrismaClientValidationError("Invalid CPF");
    }

    if (nodeCpf.isMasked(user.cpf)) {
      user.cpf = nodeCpf.unMask(user.cpf);
    }

    // eslint-disable-next-line no-param-reassign
    params.args.data = user;
  }

  return next(params);
};

const checkCpfBeforeUpdate: Prisma.Middleware = (params, next) => {
  if (params.model === "User" && params.action === "update" && params.args.data.cpf !== undefined) {
    const user = params.args.data as User;

    if (!nodeCpf.validate(user.cpf)) {
      throw new Prisma.PrismaClientValidationError("Invalid CPF");
    }

    if (nodeCpf.isMasked(user.cpf)) {
      user.cpf = nodeCpf.unMask(user.cpf);
    }

    // eslint-disable-next-line no-param-reassign
    params.args.data = user;
  }

  return next(params);
};

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

export {
  checkCpfBeforeCreate,
  checkCpfBeforeUpdate,
  hashPasswordBeforeCreate,
  hashPasswordBeforeUpdate,
  checkUserType,
};
