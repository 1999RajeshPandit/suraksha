import { NextFunction, Request, Response } from "express";
import { getConnection } from "../../db/db-manager";
import { HttpStatusCode } from "axios";
import { Patient } from "../../db/entity/Patient";
import { Customer } from "../../db/entity/Customer";

export async function getPatients(req: Request, res: Response, next: NextFunction) {
  try {
    const conn = await getConnection();
    const data = await conn
      .getRepository(Patient)
      .createQueryBuilder("patient")
      .leftJoinAndSelect(Customer, "customer", "patient.customerid = customer.id")
      .select([
        "patient.id",
        "patient.name",
        "patient.phoneNumber",
        "patient.customerid",
        "customer.id AS customerId",
        "customer.name AS customerName",
        "customer.productId",
        "customer.discount"
      ])
      .getRawMany();

    return res.status(HttpStatusCode.Ok).json({
      success: true,
      data
    });
  } catch (error: any) {
    return res.status(HttpStatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
