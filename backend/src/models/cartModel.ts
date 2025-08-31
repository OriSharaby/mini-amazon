import mongoose from "mongoose";
import { ref } from "process";
import { Product } from "./productModel";

const cartItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true 
        },
        qty: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
    },
    {_id : false}
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User",
            required: true,
            unique: true
        },
        items: [cartItemSchema],
    },
    {timestamps: true}
);

export const Cart = mongoose.model("Cart", cartSchema);