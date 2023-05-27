import { Router } from "express";
import studentRoute from "./api/studentRoute";
import nurseRoute from "./api/nurseRoute";
import familyRoute from "./api/familyRoute";

const routes = Router();

routes.get("/", (req, res) => res.send(`Welcome to the API ${req.user?.name}!`));
routes.use("/student", studentRoute);
routes.use("/nurse", nurseRoute);
routes.use("/family", familyRoute);

export default routes;
