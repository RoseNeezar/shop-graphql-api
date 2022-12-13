import DataLoader from "dataloader";
import { Product } from "../entities/Product.entities";

export const createProductLoader = () =>
  new DataLoader<number, Product>(async (productIds) => {
    const products = await Product.findByIds(productIds as number[]);
    const producIdToProduct: Record<number, Product> = {};
    products.forEach((u) => {
      producIdToProduct[u.id] = u;
    });

    const sortedProducts = productIds.map(
      (productids) => producIdToProduct[productids]
    );
    return sortedProducts;
  });
