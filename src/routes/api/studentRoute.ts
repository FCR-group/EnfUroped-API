import { Router } from "express";
import controller from "../../controllers/studentController";
import { isAdmin, isUserOrAdmin } from "../../middlewares/authMiddlewares";

const router = Router();

router.patch("/permit/:cpf", isAdmin, controller.permit);

router.get("/", isAdmin, controller.list);
router.get("/:cpf", isAdmin, controller.retrieve);
router.patch("/:cpf", isUserOrAdmin, controller.update);
router.delete("/:cpf", isAdmin, controller.destroy);

export default router;
