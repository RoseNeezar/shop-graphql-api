import { buildSchema } from "type-graphql";
import { OrderResolver } from "../resolvers/order.resolver";
import { ProductResolver } from "../resolvers/product.resolver";

export function createMockSchema() {
  return buildSchema({
    resolvers: [ProductResolver, OrderResolver],
  });
}
