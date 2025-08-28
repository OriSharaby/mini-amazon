import express from "express";
import { getUserCart,addToCart, removeFromCart} from "../controllers/cartController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", protect,getUserCart);
router.post("/", protect,addToCart);
router.delete("/:productId", protect, removeFromCart);

export default router;