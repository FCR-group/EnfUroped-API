import { Router } from "express";
import apiRoute from "./apiRoutes";

const routes = Router();

routes.use("/api",apiRoute)

export default routes;
