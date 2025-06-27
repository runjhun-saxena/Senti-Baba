import { Request, Response } from "express";

export const getPlans = (_req: Request, res: Response) => {
  const plans = [
    { id: 1, name: "Free Plan", price: 0 },
    { id: 2, name: "Premium Monthly", price: 499 },
    { id: 3, name: "Premium Yearly", price: 4999 },
  ];
  res.json(plans);
};
