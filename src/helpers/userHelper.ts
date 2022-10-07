import bcrypt from "bcrypt";

function comparePassword(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}

// eslint-disable-next-line import/prefer-default-export
export { comparePassword };
