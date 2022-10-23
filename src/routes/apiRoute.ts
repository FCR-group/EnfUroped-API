import { Router } from "express";
import appointmentRoute from "./api/appointmentRoute";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));
routes.use("/appointment", appointmentRoute);

export default routes;
