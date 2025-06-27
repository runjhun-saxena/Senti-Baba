import { Request, Response } from "express";
import { getGeminiResponse } from "../services/gemini.service";

export const analyzeJudgment = async (req: Request, res: Response) => {
  const { user1, user2 } = req.body;
  const prompt = `User1: "${user1}", User2: "${user2}". Who is more wrong, what are the red/green flags, and give a fair judgment.`;

  const reply = await getGeminiResponse(prompt);
  res.json({ analysis: reply });
};
