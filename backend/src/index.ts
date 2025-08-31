import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import cartRoutes from "./routes/cartRoutes";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); 

app.get("/", (req,res) => {
    res.send("Mini Amazon API is running!");
});

app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
});
