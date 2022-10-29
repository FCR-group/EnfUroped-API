import { Router } from "express";
import controller from "../../controllers/userController";

const routes = Router();

routes.get("/", controller.list);
routes.get("/:cpf", controller.retrieve);
routes.delete("/:cpf", controller.destroy);

export default routes;
