import { Router } from "express";
import controller from "../../controllers/tagControllers";

const routes = Router();

routes.post("/create", controller.create);
routes.get("/", controller.list);
routes.get("/:name", controller.retrieve);
routes.patch("/addPost/:name", controller.addPosts);
routes.delete("/:name", controller.destroy);

export default routes;
