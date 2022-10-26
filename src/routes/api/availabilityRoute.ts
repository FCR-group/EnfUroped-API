import { Router } from "express";
import controller from "../../controllers/availabilityController";

const routes = Router();

routes.post("/open", controller.open);

export default routes;
