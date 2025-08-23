const request = require("supertest");
const { App } = require("../app");

describe("POST /send-email", () => {
  // Test case 1: A valid request returns 202
  test("should return 202 Accepted for a valid payload", async () => {
    const payload = {
      to: "user@example.com",
      subject: "Welcome!",
      body: "Thanks for signing up.",
    };

    const response = await request(App).post("/send-email").send(payload);

    expect(response.status).toBe(202);
    expect(response.body).toHaveProperty(
      "message",
      "Job accepted into the queue",
    );
  });

  // Test case 2: Missing 'to' field returns 400
  test('should return 400 Bad Request if the "to" field is missing', async () => {
    const payload = {
      subject: "Welcome!",
      body: "Thanks for signing up.",
    };

    const response = await request(App).post("/send-email").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty(
      "message",
      "Missing or invalid fields",
    );
  });

  // Test case 3: Invalid email returns 400
  test("should return 400 Bad Request for an invalid email format", async () => {
    const payload = {
      to: "invalid-email",
      subject: "Welcome!",
      body: "Thanks for signing up.",
    };

    const response = await request(App).post("/send-email").send(payload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email format");
  });

  // Test case 4: Simulate a queue full returns 503
  test("should return 503 'Service Unavailable' when the queue is full", async () => {
    const payload = {
      to: "user@example.com",
      subject: "High Priority",
      body: "Queue full test.",
    };

    await request(App).get("/toggle-queue-full");

    const response = await request(App).post("/send-email").send(payload);

    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty("message", "Queue is full");
  });
});
