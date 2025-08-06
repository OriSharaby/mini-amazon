import { Request,Response } from "express";
import { Product } from "../models/productModel";
import { AuthenticatedRequest } from "../types/custom";

export const getProducts = async (req : Request,res : Response) => {
    try{
        const pageSize = Number(req.query.pageSize) || 10;
        const page = Number(req.query.page) || 1;
        
        const keyword = req.query.keyword
        ? {
            $or:
            [
                {name: {$regex: req.query.keyword, $options: "i"}},
                {category: {$regex: req.query.keyword, $options: "i"}}
            ]
        }:
        {}

        const count = await Product.countDocuments(keyword);
        const products = await Product.find(keyword).limit(pageSize).skip(pageSize *(page -1));
        res.json({
            products,
            page,
            pages: Math.ceil(count/pageSize),
            total: count,
        });
    }
    catch(error){
        res.status(500).json({message: "Server error", error});
    }
};

export const getProductById = async (req : Request, res : Response) => {
    try{
        const product = await Product.findById(req.params.id);

        if(product){
            res.json(product)
        }else{
            res.status(404).json({message : "Product not found"});
        }
    }
    catch(error){
        res.status(500).json({message : "Server error"});
    }
};

export const createProduct = async (req: AuthenticatedRequest, res : Response) => {
    try{
        if(!req.user?.isAdmin){
            res.status(401).json({message : "Not authorized as admin"});
        }

        const {name, description, price, countInStock, category, image} = req.body;

        const product = new Product({
            name,
            description,
            price, 
            countInStock, 
            category, 
            image
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct); 
    }
    catch(error){
        res.status(500).json({message: "Server error", error});
    }
}

export const updateProduct = async (req: AuthenticatedRequest, res : Response) => {
    try{
        if(!req.user?.isAdmin){
            res.status(401).json({message: "Not authorized as admin"});
        }

        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        const {name, description,price,countInStock,category,image} = req.body;

        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.countInStock = countInStock ?? product.countInStock;
        product.category = category ?? product.category;
        product.image = image ?? product.image;
        


        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message: "Server error", error});
    }
}

export const deleteProduct = async (req: AuthenticatedRequest, res : Response) => {
    try{
        if(!req.user?.isAdmin){
            res.status(401).json({message: "Not authorized as admin"});
        }

        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }

        await product.deleteOne();

        res.status(201).json({message: "Product removed"})
    }
    catch(error){
        res.status(500).json({message: "Server error", error});
    }
}

