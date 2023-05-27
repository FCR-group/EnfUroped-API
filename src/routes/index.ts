import cors from 'cors';
import { Router } from 'express';

import controller from '../controllers/healthChecksController';
import { isLoggedIn } from '../middlewares/authMiddlewares';
import apiRoute from './apiRoute';
import authRoute from './authRoute';

const allowedOrigins = ["http://localhost:4200"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

const routes = Router();

routes.use(cors(options));

routes.get("/life", controller.serverIsAlive);
routes.get("/ready", controller.serverIsReady);

routes.use("/auth", authRoute);
routes.use("/api", isLoggedIn, apiRoute);

export default routes;
