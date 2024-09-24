import express from "express";
import { create } from "./services/create";
import { getPatients } from "./services/get-patients";
import { getDiscount } from "./services/get-discounted-price";

export const patientRoutes = express.Router();

patientRoutes.post("/", create);
patientRoutes.get("/", getPatients);
patientRoutes.get("/discount", getDiscount);