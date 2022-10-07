import { Router } from "express";
import controller from "../controllers/healthChecksController";
import authRoute from "./authRoute";
import apiRoute from "./apiRoute";
import { isLoggedIn } from "../middlewares/authMiddlewares";

const routes = Router();

routes.get("/life", controller.serverIsAlive);
routes.get("/ready", controller.serverIsReady);

routes.use("/auth", authRoute);
routes.use("/api", isLoggedIn, apiRoute);

export default routes;
