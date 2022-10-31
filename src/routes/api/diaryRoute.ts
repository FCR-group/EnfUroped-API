import { Router } from "express";
import controller from "../../controllers/diaryController";
import drinkRoute from "./reports/diary/drinkRoute";
import faeRoute from "./reports/diary/faeRoute";
import urineRoute from "./reports/diary/urineRoute";

const routes = Router();

routes.post("/create", controller.create);
routes.get("/", controller.list);
routes.get("/:id", controller.retrieve);
routes.delete("/:id", controller.remove);

routes.use("/drink", drinkRoute);
routes.use("/fae", faeRoute);
routes.use("/urine", urineRoute);

export default routes;
