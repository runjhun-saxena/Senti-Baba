import { Router } from "express";
import { createRoom, joinRoom, saveMessage } from "../controllers/room.controller";
import { verifyFirebaseAuth } from "../middleware/auth.middleware";
import { checkSubscription } from "../middleware/subscription.middleware";

const r = Router();
r.post("/create",createRoom);
r.post("/join", joinRoom);
r.post("/:roomId/message", saveMessage);

export default r;
//  verifyFirebaseAuth, checkSubscription, 