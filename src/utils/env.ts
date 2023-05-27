const NODE_ENV = process.env.NODE_ENV as string;
const { PORT } = process.env;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const SESSION_EXPIRATION = process.env.SESSION_EXPIRATION as string;

const DATABASE_URL = process.env.DATABASE_URL as string;

const { DEPLOY_URL } = process.env;

const HOST = process.env.HOST as string;
const SMTP_PORT = process.env.SMTP_PORT as string;
const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS as string;
const CLIENT_ID = process.env.CLIENT_ID as string;
const CLIENT_SECRET = process.env.CLIENT_SECRET as string;

const { TEST_HOST } = process.env;
const { TEST_SMTP_PORT } = process.env;
const { TEST_USER } = process.env;
const { TEST_PASSWORD } = process.env;

export {
  NODE_ENV,
  PORT,
  SESSION_SECRET,
  SESSION_EXPIRATION,
  DATABASE_URL,
  DEPLOY_URL,
  HOST,
  SMTP_PORT,
  EMAIL_ADDRESS,
  CLIENT_ID,
  CLIENT_SECRET,
  TEST_HOST,
  TEST_SMTP_PORT,
  TEST_USER,
  TEST_PASSWORD,
};
