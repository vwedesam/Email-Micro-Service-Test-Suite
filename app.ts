import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let queueFull = false;

// Endpoint to simulate the queue full state
app.get("/toggle-queue-full", (req: Request, res: Response) => {
  queueFull = !queueFull;
  res.status(200).send({ message: `Queue full state set to: ${queueFull}` });
});

// The main API endpoint to be tested
app.post("/send-email", (req: Request, res: Response) => {
  if (queueFull) {
    return res.status(503).send({ message: "Queue is full" });
  }

  const { to, subject, body } = req.body;

  if (!to || !subject || !body) {
    return res.status(400).send({ message: "Missing or invalid fields" });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).send({ message: "Invalid email format" });
  }

  //Simulate a successful job acceptance
  res.status(202).send({ message: "Job accepted into the queue" });
});

export const App = app;
app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
