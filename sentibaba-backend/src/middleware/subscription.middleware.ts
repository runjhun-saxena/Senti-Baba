// import { Request, Response, NextFunction } from "express";

// export const checkSubscription = (req: Request, res: Response, next: NextFunction) => {
//   const mock = ["uid123", "uid456"];        // Mock subscribed users
//   if (!req.user || !mock.includes(req.user.uid)) {
//     return res.status(403).json({ error: "No active subscription" });
//   }
//   next();
// };
