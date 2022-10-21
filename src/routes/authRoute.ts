import { Router } from "express";
import controller from "../controllers/authController";

const routes = Router();

routes.post("/register/family", controller.familyRegister);
routes.post("/register/nurse", controller.nurseRegister);
routes.post("/register/student", controller.studentRegister);

routes.post("/login", controller.login);

routes.post("/logout", controller.logout);

export default routes;
