import { body } from "express-validator";
import nodeCpf from "node-cpf";

const cpf = body("cpf")
  .custom((value) => {
    if (!nodeCpf.validate(value)) {
      throw new Error("Invalid Cpf");
    }

    return true;
  })
  .customSanitizer((value) => {
    if (nodeCpf.isMasked(value)) {
      return nodeCpf.unMask(value);
    }

    return value;
  })
  .exists();

const email = body("email").isEmail().normalizeEmail().exists();

const password = body("password").isString().isLength({ min: 3, max: 255 }).escape().exists();

export default {
  cpf,
  email,
  password,
};
