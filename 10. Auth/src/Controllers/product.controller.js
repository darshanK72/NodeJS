import { NotFoundError } from "../../../09. Mongoose/src/Errors/NotFoundError.js";
import { BadRequestError } from "../Errors/BadRequestError.js";
import { Product } from "../Models/product.model.js";
import { asyncWrapper } from "../Utils/asyncWrapper.js";

export const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find();
    if (!products) {
        throw new NotFoundError("Products Not Found");
    }
    res.status(200).json(products);
})

export const getProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new NotFoundError("Product Not Found");
    }
    res.status(200).json(product);
})

export const addProduct = asyncWrapper(async (req,res) => {
    const product = await Product.create(req.body);
    if(!product){
        throw new BadRequestError("Invalid Input");
    }
    res.status(201).json(product);
})

export const updateProduct = asyncWrapper(async (req,res) => {
    const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new: true, runValidators: true, upsert: true });
    if(!product){
        throw new BadRequestError("Invalid Input");
    }
    res.status(201).json(product);
})

export const deleteProduct = asyncWrapper(async (req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(!product){
        throw new NotFoundError("Product Not Found");
    }
    res.status(200).json(product);
})