import { Router } from "express";
import controller from "../../controllers/appointmentController";

const routes = Router();

routes.post("/make", controller.make);
routes.get("/", controller.list);
routes.get("/:id", controller.retrieve);
routes.patch("/update", controller.update);
routes.delete("/:id", controller.unBook);

export default routes;
