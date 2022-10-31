import { Router } from "express";
import appointmentRoute from "./api/appointmentRoute";
import messageRoute from "./api/messageRoute";
import postRoute from "./api/postRoute";
import tagRoute from "./api/tagRoute";
import studentRoute from "./api/studentRoute";
import nurseRoute from "./api/nurseRoute";
import familyRoute from "./api/familyRoute";
import diaryRoute from "./api/diaryRoute";
import sessionRoute from "./api/sessionRoute";
import tokenRoute from "./api/tokenRoute";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));
routes.use("/student", studentRoute);
routes.use("/nurse", nurseRoute);
routes.use("/family", familyRoute);

routes.use("/appointment", appointmentRoute);
routes.use("/post", postRoute);
routes.use("/tag", tagRoute);
routes.use("/message", messageRoute);
routes.use("/diary", diaryRoute);
routes.use("/token", tokenRoute);
routes.use("/session", sessionRoute);

export default routes;
