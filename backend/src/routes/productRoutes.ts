import express from "express";
import { getProducts, getProductById , createProduct, updateProduct, deleteProduct} from "../controllers/productController";
import { protect, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;