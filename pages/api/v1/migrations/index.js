import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "/infra/database.js";

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient();

  const options = {
    dbClient: dbClient,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(options);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const runMigrations = await migrationRunner({
      ...options,
      dryRun: false,
    });
    await dbClient.end();

    if (runMigrations.length > 0) {
      return response.status(201).json(runMigrations);
    }

    return response.status(200).json(runMigrations);
  }

  return response.status(405).end();
}
