export default {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["src/entities/*.entities{.js,.ts}"],
  migrations: ["src/migrations/*{.js,.ts}"],
  migrationsRun: true,
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscriber",
  },
};
