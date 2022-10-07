import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import templateEngine, { TemplateOptions } from "nodemailer-express-handlebars";
import { htmlToText } from "nodemailer-html-to-text";

import path from "path";

import {
  NODE_ENV,
  HOST,
  SMTP_PORT,
  CLIENT_ID,
  CLIENT_SECRET,
  TEST_HOST,
  TEST_SMTP_PORT,
  TEST_USER,
  TEST_PASSWORD,
  EMAIL_ADDRESS,
  PORT,
  DEPLOY_URL,
} from "../utils/env";

let transportOptions: SMTPTransport.Options;

if (NODE_ENV === "production") {
  transportOptions = {
    host: HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: true,
    auth: {
      type: "OAuth2",
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
  };
} else {
  transportOptions = {
    host: TEST_HOST,
    port: parseInt(TEST_SMTP_PORT as string, 10),
    auth: {
      user: TEST_USER,
      pass: TEST_PASSWORD,
    },
  };
}

const transporter = nodemailer.createTransport(transportOptions);

transporter.use(
  "compile",
  templateEngine({
    extName: ".hbs",
    viewEngine: {
      extname: ".hbs",
      layoutsDir: path.resolve(__dirname, "..", "..", "views", "layouts"),
      partialsDir: path.resolve(__dirname, "..", "..", "views", "partials"),
    },
    viewPath: path.resolve(__dirname, "..", "..", "views"),
  })
);

transporter.use("compile", htmlToText());

function sendMail(name: string, email: string, subject: string, template: string, context?: any) {
  const sendOptions: Mail.Options & TemplateOptions = {
    to: `"${name}" <${email}>`,
    subject,
    template,
  };

  if (NODE_ENV === "production") {
    sendOptions.from = `"EnfUroped" <${EMAIL_ADDRESS}>`;
    sendOptions.context = { ...context, location: DEPLOY_URL };
  } else {
    sendOptions.from = '"Urotest" <urotest@example.com>';
    sendOptions.context = { ...context, location: `http://localhost:${PORT}` };
  }

  return transporter.sendMail(sendOptions);
}

export default sendMail;
