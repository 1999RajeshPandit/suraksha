import { NextFunction, Request, Response } from "express";
import { getConnection } from "../../db/db-manager";
import { HttpStatusCode } from "axios";
import { Patient } from "../../db/entity/Patient";

export async function create(req: Request, res: Response, next: NextFunction) {
  const cu: Patient = req.body;
  try {
    const conn = await getConnection();
    await conn.getRepository(Patient).save(cu);
    return res.status(HttpStatusCode.Created).json({
      success: true,
      message: "Patient created successfully",
    });
  } catch (error: any) {
    return res.status(HttpStatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
