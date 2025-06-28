import { Router, Request, Response } from "express";
import { analyzeJudgment } from "../controllers/judgement.controller";
// import { verifyFirebaseAuth } from "../middleware/auth.middleware";
// import { checkSubscription } from "../middleware/subscription.middleware";

const r = Router();

// Temporarily disabled auth for testing
r.post("/analyze", (req: Request, res: Response) => {
  analyzeJudgment(req, res).catch((err) => {
	console.error(err);
	res.status(500).json({ error: "Internal server error" });
  });
});

export default r;
