import { Request, Response } from "express";
import { createOrderItem } from "./util/createOrderItem";
import { createProductLoader } from "./util/createProductLoader";

export type MyContext = {
  req: Request;
  res: Response;
  productLoader: ReturnType<typeof createProductLoader>;
  orderItemLoader: ReturnType<typeof createOrderItem>;
};
