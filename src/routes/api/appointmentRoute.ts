import { Router } from "express";
import controller from "../../controllers/appointmentController";
import dvssRoute from "./reports/appointment/dvssRoute";
import romaivRoute from "./reports/appointment/romaivRoute";
import saeRoute from "./reports/appointment/saeRoute";
import solchuvaRoute from "./reports/appointment/solchuvaRoute";

const routes = Router();

routes.post("/make", controller.make);
routes.get("/", controller.list);
routes.get("/:id", controller.retrieve);
routes.patch("/update/:idH", controller.update);
routes.delete("/:id", controller.unBook);

routes.use("/dvss", dvssRoute);
routes.use("/romaiv", romaivRoute);
routes.use("/sae", saeRoute);
routes.use("/solchuva", solchuvaRoute);

export default routes;
