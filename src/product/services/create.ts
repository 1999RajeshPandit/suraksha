import { NextFunction, Request, Response } from "express";
import { getConnection } from "../../db/db-manager";

import { HttpStatusCode } from "axios";
import { Product } from "../../db/entity/Product";

export async function create(req: Request, res: Response, next: NextFunction) {
  const cu: Product = req.body;
  try {
    const conn = await getConnection();
    await conn.getRepository(Product).save(cu);
    return res.status(HttpStatusCode.Created).json({
      success: true,
      message: "Customer created successfully",
    });
  } catch (error: any) {
    return res.status(HttpStatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
