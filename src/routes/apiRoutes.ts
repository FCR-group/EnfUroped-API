import { Router } from "express";
import getUserInfo from "../controllers/familyController";

const routes = Router();

routes.get('/', getUserInfo);

export default routes;