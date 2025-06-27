import { Router, Request, Response } from "express";
import { analyzeConflict } from "../controllers/conflict.controller";

const router = Router();

router.post("/:roomId/analyze", (req: Request, res: Response) => {
  analyzeConflict(req, res);
});

export default router;
