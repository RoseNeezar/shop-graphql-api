import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";
import { Order } from "./entities/Order";
import { Product } from "./entities/product";
import { HelloResolver } from "./resolvers/hello";

const options: DataSourceOptions = {
  type: "postgres",
  logging: true,
  // synchronize: true,
  url: process.env.DATABASE_URL,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Product, Order],
};

const main = async () => {
  const dataSource = new DataSource(options);

  const conn = await dataSource.initialize();

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
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
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
