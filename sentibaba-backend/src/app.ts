import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import dotenv from "dotenv";

import subscriptionRoutes from "./routes/subscription.routes";
import roomRoutes from "./routes/room.routes";
import conflictRoutes from "./routes/conflict.routes";
import judgmentRoutes from "./routes/judgement.routes";
import healingRoutes from "./routes/healing.routes";

dotenv.config(); // ➤ Load .env

const app = express();
app.use(cors()); // ➤ Enable CORS
app.use(express.json()); // ➤ Parse JSON bodies

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Senti Baba API is live" });
});

// Routes
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/conflict", conflictRoutes);
app.use("/api/judgment", judgmentRoutes);
app.use("/api/healing", healingRoutes);

// ——— 404 Not Found Handler ———
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// ——— Global Error Handler ———
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
