//* This file is being used in index.ts and is a utility for loading the environment variables in development mode

import dotenv, { DotenvSafeOptions } from "dotenv-safe";
import path from "path";

const config: DotenvSafeOptions = {
  example: path.resolve(__dirname, "..", "..", "env", ".example.env"),
};

const { NODE_ENV } = process.env;

//! Only load the development mode if the NODE_ENV is not production or test
if (NODE_ENV === "test") {
  config.path = path.resolve(__dirname, "..", "..", "env", ".test.env");
} else if (NODE_ENV !== "production") {
  config.path = path.resolve(__dirname, "..", "..", "env", ".dev.env");
}

dotenv.config(config);
