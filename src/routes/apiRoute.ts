import { Router } from "express";
import appointmentRoute from "./api/appointmentRoute";
import messageRoute from "./api/messageRoute";
import postRoute from "./api/postRoute";
import tagRoute from "./api/tagRoute";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));

routes.use("/appointment", appointmentRoute);
routes.use("/post", postRoute);
routes.use("/tag", tagRoute);
routes.use("/message", messageRoute);

export default routes;
