import { Router } from "express";
import controller from "../../controllers/messageController";

const routes = Router();

routes.post("/send", controller.send);
routes.get("/", controller.list);
routes.get("/messages/", controller.chatMessage);

export default routes;
