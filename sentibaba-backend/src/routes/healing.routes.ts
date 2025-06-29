import { Router, Request, Response } from "express";
import { healingAdvice } from "../controllers/healing.controller";
// import { verifyFirebaseAuth } from "../middleware/auth.middleware";
// import { checkSubscription } from "../middleware/subscription.middleware";

const r = Router();


r.post("/message", healingAdvice); 

export default r;
