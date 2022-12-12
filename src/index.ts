import cors from "cors";
import "dotenv-safe/config";
import express from "express";
import "reflect-metadata";
import { DataSource } from "typeorm";

import path from "path";
import { Order } from "./entities/Order";
import { Product } from "./entities/product";

const main = async () => {
  const conn = new DataSource({
    type: "postgres",
    logging: true,
    // synchronize: true,
    url: process.env.DATABASE_URL,
    migrations: [path.join(__dirname, "./migrations/*")],
    entities: [Product, Order],
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

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on port localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
