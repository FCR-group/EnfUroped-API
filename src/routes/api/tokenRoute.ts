import { Router } from "express";
import controller from "../../controllers/tokenController";

const routes = Router();

routes.post("/create", controller.create);
routes.get("/", controller.list);
routes.get("/:uuid", controller.retrieve);
routes.patch("/update/:uuid", controller.update);
routes.delete("/:uuid", controller.destroy);

export default routes;
