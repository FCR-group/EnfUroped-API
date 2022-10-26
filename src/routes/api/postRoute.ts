import { Router } from "express";
import controller from "../../controllers/postController";

const routes = Router();

routes.post("/publish", controller.publish);
routes.get("/", controller.list);
routes.get("/searchByTag/", controller.searchByTag);
routes.get("/:id", controller.retrieve);
routes.patch("/update/:idH", controller.update);
routes.delete("/:id", controller.destroy);

export default routes;
