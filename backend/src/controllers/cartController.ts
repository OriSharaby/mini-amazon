import { Request, Response } from "express";
import { Cart } from "../models/cartModel";
import { AuthenticatedRequest } from "../types/custom";
import { Product } from "../models/productModel";

export const getUserCart = async (req: AuthenticatedRequest, res: Response) => {
    try{
        if(!req.user){
            return res.status(401).json({message: "Not authorized"});
        }

        const cart = await Cart.findOne({user: req.user._id}).populate("items.product");

        if(!cart){
            return res.json({items: []});
        }

        res.json(cart);
    }   
    catch(error){
        res.status(500).json({messege: "Server error",error})
    }
}

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
    try{
        if(!req.user){
            return res.status(401).json({message: "Not authorized"});
        }
        
        const {productId, qty} = req.body;

        if(!productId || !qty){
            return res.status(401).json({message: "Product ID and quantity are required"});
        }

        let cart = await Cart.findOne({user: req.user._id});

        if(!cart){
            cart = new Cart({
                user: req.user._id,
                items: [{product: productId, qty}],
            });
        }
        else{
            const existingItem = cart.items.find(
                (item: any) => item.product.toString() === productId
            );

            if(existingItem){
                existingItem.qty += qty;
            }else{
                cart.items.push({product: productId, qty });
            }
        }

        const updatedCart = await cart.save();
        const populatedCart = await updatedCart.populate("items.product");

        res.status(201).json(populatedCart);
    }   
    catch(error){
        res.status(500).json({message: "Server error",error});
    }
}

export const removeFromCart = async (req: AuthenticatedRequest, res: Response) => {
    try{
        if(!req.user){
           return res.status(401).json({message: "Not authorized"});
        }

        const {productId} = req.params;

        const cart = await Cart.findOne({user: req.user._id});

        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        cart.items = cart.items.filter(
            (item: any) => item.product.toString() !== productId
        ) as any;

        const updatedCart = await cart.save()
        const populatedCart = await updatedCart.populate("items.product");

        res.status(201).json(populatedCart);

    }
    catch(error){
        res.status(500).json({message: "Server error", error});
    }
}