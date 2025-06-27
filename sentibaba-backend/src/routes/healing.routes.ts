import { Router } from "express";
import { analyzeJudgment } from "../controllers/judgement.controller";
import { verifyFirebaseAuth } from "../middleware/auth.middleware";
import { checkSubscription } from "../middleware/subscription.middleware";

const r = Router();
r.post("/analyze", analyzeJudgment);
export default r;
// , verifyFirebaseAuth, checkSubscription,