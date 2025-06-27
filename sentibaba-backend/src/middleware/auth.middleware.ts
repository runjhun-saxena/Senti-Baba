import { Request, Response, NextFunction } from "express";
import { auth } from "../firebase/firebase";

export const verifyFirebaseAuth = async (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing auth token" });
  }
  const token = header.split(" ")[1];
  try {
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;                     // Attach user info
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
