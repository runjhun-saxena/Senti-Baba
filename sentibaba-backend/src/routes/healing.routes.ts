import { Router, Request, Response } from "express";
import { healingAdvice } from "../controllers/healing.controller";
// import { verifyFirebaseAuth } from "../middleware/auth.middleware";
// import { checkSubscription } from "../middleware/subscription.middleware";

const r = Router();

r.post("/message", (req: Request, res: Response) => {
  healingAdvice(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  });
});

export default r;
