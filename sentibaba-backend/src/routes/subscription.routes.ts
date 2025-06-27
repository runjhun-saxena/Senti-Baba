import { Router } from "express";
import { getPlans } from "../controllers/subscription.controller";

const r = Router();
r.get("/", getPlans);
export default r;
