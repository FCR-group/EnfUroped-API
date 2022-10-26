import { Router } from "express";
import controller from "../../controllers/nurseController";
import { isAdmin, isUserOrAdmin } from "../../middlewares/authMiddlewares";

const router = Router();

router.patch("/permit/:cpf", isAdmin, controller.permit);
router.patch("/turnAdmin/:cpf", isAdmin, controller.turnAdmin);

router.get("/", isAdmin, controller.list);
router.get("/:cpf", isAdmin, controller.retrieve);
router.patch("/:cpf", isUserOrAdmin, controller.update);
router.delete("/:cpf", isAdmin, controller.destroy);

export default router;
