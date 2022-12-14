import { createConnection } from "typeorm";

export const createTestConn = async () =>
  createConnection({
    type: "postgres",
    host: "localhost",
    port: 5431,
    username: "postgres",
    password: "postgres_password",
    database: "testdb",
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ["src/entities/**/*"],
  });
