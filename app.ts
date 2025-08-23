import express, { Request, Response } from "express";
const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to simulate the queue full state
app.post("/toggle-queue-full", (req: Request, res: Response) => {
  res.status(200).send({});
});

// The main API endpoint to be tested
app.post("/send-email", (req: Request, res: Response) => {
  res.status(202).send({});
});

app.listen(port, () => {
  console.log(`Mock server listening at http://localhost:${port}`);
});
