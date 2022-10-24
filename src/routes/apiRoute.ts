import { Router } from "express";
import appointmentRoute from "./api/appointmentRoute";
import postRoute from "./api/postRoute";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));
routes.use("/appointment", appointmentRoute);
routes.use("/post", postRoute);

export default routes;
