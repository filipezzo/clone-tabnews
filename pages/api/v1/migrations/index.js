import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "/infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response.status(405).end({
      error: `Method ${request.method} not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();

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
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const runMigrations = await migrationRunner({
        ...options,
        dryRun: false,
      });

      if (runMigrations.length > 0) {
        return response.status(201).json(runMigrations);
      }

      return response.status(200).json(runMigrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dbClient.end();
  }
}
