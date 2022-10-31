import { Router } from "express";
import controller from "../../../../controllers/reports/appointment/solchuvaController";

const routes = Router();

routes.post("/send", controller.send);
routes.get("/", controller.list);
routes.get("/:id", controller.retrieve);
routes.patch("/update/:idH", controller.update);
routes.delete("/:id", controller.remove);

export default routes;
