import { param } from "express-validator";
import nodeCpf from "node-cpf";

const id = param("id").isNumeric().toInt().exists();

const cpf = param("cpf")
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

export default { id, cpf };
