import { Router } from "express";
import controller from "../../controllers/availabilityController";

const routes = Router();

routes.post("/open", controller.open);
routes.get("/", controller.list);
routes.get("/date/:dateTime", controller.retrieveByDate);
routes.get("/nurse/:nurseCpf", controller.retrieveByNurse);
routes.delete("/", controller.unAvailability);

export default routes;
