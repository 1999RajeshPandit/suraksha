import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { patientRoutes } from "./src/patient/routes";
import { customerRoutes } from "./src/customer/routes";
import { productRoutes } from "./src/product/routes";
dotenv.config();

const APP_PORT = process.env.APP_PORT;

export const app = express();
app.use(express.json());
app.use(cors());

app.use("/patient", patientRoutes);
app.use("/customer", customerRoutes);
app.use("/product", productRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: "Route not found",
      },
    ],
  });
});


app.listen(APP_PORT, async () => {
  console.log(
    `SERVER :  http://localhost:${APP_PORT}`
  );
});
