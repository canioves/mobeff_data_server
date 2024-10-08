import { Request, Response } from "express";
import { Product } from "../models/product.model";
import bulk from "../test_data/bulk.json";

export class ProductController {
  async getPageOfProducts(req: Request): Promise<Object> {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const offset: number = (page - 1) * limit;

    const pageOfProducts: Product[] = await Product.findAll({ offset, limit });
    const totalProducts: number = pageOfProducts.length;

    const productsJSON: Object = {
      page,
      limit,
      totalProducts,
      pageOfProducts,
    };
    return productsJSON;
  }

  async createProductsFromJson(): Promise<void> {
    await Product.bulkCreate(bulk);
  }
}
