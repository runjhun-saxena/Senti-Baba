import express from "express";
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
app.get("/", (_req, res) => {
  res.json({ message: "Senti Baba API is live" }); // ✅ changed from send() to json()
});

// Routes
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/conflict", conflictRoutes);
app.use("/api/judgment", judgmentRoutes);
app.use("/api/healing", healingRoutes);

// ——— 404 Not Found Handler ———
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});


app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
