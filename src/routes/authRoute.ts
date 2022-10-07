import { Router } from "express";
import controller from "../controllers/authController";
import { validateRegister, validateLogin } from "../middlewares/validationMiddlewares";

const routes = Router();

routes.post("/register", validateRegister, controller.register);

routes.post("/login", validateLogin, controller.login);

routes.post("/logout", controller.logout);

export default routes;
