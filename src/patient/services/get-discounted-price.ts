import { NextFunction, Request, Response } from "express";
import { getConnection } from "../../db/db-manager";
import { HttpStatusCode } from "axios";
import { Patient } from "../../db/entity/Patient";
import { Customer } from "../../db/entity/Customer";
import { Product } from "../../db/entity/Product";

export async function getDiscount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const patientId = req.query.patientId as string;
  const productId = req.query.productId as string;
  const price = +(req.query.price as string) || 0;
  try {
    const conn = await getConnection();
    const patientRepository = conn.getRepository(Patient);
    const customerRepository = conn.getRepository(Customer);
    const productRepository = conn.getRepository(Product);

    const patient = await patientRepository.findOne({
      where: { id: parseInt(patientId) },
    });

    if (!patient) {
      return res.status(HttpStatusCode.NotFound).json({
        success: false,
        message: "Patient not found",
      });
    }

    let discountedPrice = price;

    if (patient.customerid) {
      const customer = await customerRepository.findOne({
        where: { id: +patient.customerid, productId: parseInt(productId) },
      });

      if (customer) {
        discountedPrice = price * (1 - customer.discount / 100);
        return res.status(HttpStatusCode.Ok).json({
          success: true,
          data: {
            patientId: patient.id,
            productId: productId,
            discountedPrice: discountedPrice,
          },
        });
      }
    }

    return res.status(HttpStatusCode.Ok).json({
      success: true,
      data: {
        patientId: patient.id,
        productId: productId,
        discountedPrice: discountedPrice,
      },
    });
  } catch (error: any) {
    console.error("An error occurred:", error);
    return res.status(HttpStatusCode.InternalServerError).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
