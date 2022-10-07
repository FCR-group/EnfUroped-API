import { RequestHandler } from "express";
import { Result, ValidationError, validationResult } from "express-validator";
import HttpError from "http-errors";
import { bodyValidations, paramsValidations } from "../validators";

function mapErrors(errors: Result<ValidationError>): string[] {
  return errors
    .array({ onlyFirstError: true })
    .map(
      (error) => `${error.msg}: ${error.param} equals to ${error.value} in req.${error.location}`
    );
}

// ! IMPORTANT: This middleware must be the last one to be executed in the validation array.
const validateInput: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const mappedErrors = mapErrors(errors);

  throw new HttpError.BadRequest(mappedErrors.join("\n"));
};

const validateRegister = [
  bodyValidations.cpf,
  bodyValidations.email,
  bodyValidations.password,
  validateInput,
];

const validateLogin = [bodyValidations.cpf, bodyValidations.password, validateInput];

export default validateInput;

export { bodyValidations, paramsValidations, validateRegister, validateLogin };
