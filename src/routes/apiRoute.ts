import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) =>
  res.send(`Welcome to the API, the logged in user's cpf is: ${req.user?.cpf}!`)
);

export default routes;
