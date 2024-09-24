import express from "express";
import { create } from "./services/create";
import { getCustomers } from "./services/get-customers";

export const customerRoutes = express.Router();

customerRoutes.post("/", create);
customerRoutes.get("/", getCustomers);
