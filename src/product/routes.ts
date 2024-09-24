import express from "express";
import { create } from "./services/create";
import { getProducts } from "./services/get-products";

export const productRoutes = express.Router();

productRoutes.post("/", create);
productRoutes.get("/", getProducts);
