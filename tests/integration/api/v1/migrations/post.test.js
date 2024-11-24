import database from "infra/database.js";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP schema public CASCADE; CREATE schema public;");
}

test("POST to /api/v1/status should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const body = await response1.json();

  expect(response1.status).toBe(201);
  expect(body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const body2 = await response2.json();

  expect(response2.status).toBe(200);
  expect(body2.length).toBe(0);
});
