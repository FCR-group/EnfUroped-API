import { Router } from "express";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));

export default routes;
