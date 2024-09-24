import { NextFunction, Request, Response } from "express";
import { getConnection } from "../../db/db-manager";
import { HttpStatusCode } from "axios";
import { Customer } from "../../db/entity/Customer";

export async function getCustomers(req: Request, res: Response, next: NextFunction) {
  try {
    const conn = await getConnection();
    const [data, count] = await conn
      .getRepository(Customer)
      .createQueryBuilder()
      .getManyAndCount();

    return res.status(HttpStatusCode.Ok).json({
      success: true,
      data,
      count,
    });
  } catch (error: any) {
    return res.status(HttpStatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
