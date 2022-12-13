import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { createProductLoader } from "./util/createProductLoader";
import { ProductResolver } from "./resolvers/product.resolver";
import path from "path";
import { createConnection } from "typeorm";
import { Order } from "./entities/Order.entities";
import { Product } from "./entities/Product.entities";
import { OrderResolver } from "./resolvers/order.resolver";
import { OrderItem } from "./entities/OrderItem.entities";
import { createOrderItem } from "./util/createOrderItem";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    logging: true,
    // synchronize: true,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Product, Order, OrderItem],
  });

  await conn.runMigrations();

  const app = express();

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver, OrderResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      productLoader: createProductLoader(),
      orderItemLoader: createOrderItem(),
    }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log("server started on port localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
