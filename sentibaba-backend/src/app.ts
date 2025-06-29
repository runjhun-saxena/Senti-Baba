import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
// import { initializeFirebase } from "./firebase/firebase";
import subscriptionRoutes from "./routes/subscription.routes";
import roomRoutes from "./routes/room.routes";
import conflictRoutes from "./routes/conflict.routes";
import judgmentRoutes from "./routes/judgement.routes";
import healingRoutes from "./routes/healing.routes";

dotenv.config();                          // ➤ Load .env
// initializeFirebase();                    // ➤ Init Firebase SDK

const app = express();
app.use(cors());                          // ➤ Enable CORS
app.use(express.json());                  // ➤ Handle JSON payloads

app.get("/", (_req: Request, res: Response) => {
  res.send("Senti Baba API is live");
});


app.use("/api/subscription", subscriptionRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/conflict", conflictRoutes);
app.use("/api/judgment", judgmentRoutes);
app.use("/api/healing", healingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up on http://localhost:${PORT}`));
