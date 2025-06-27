import { getGeminiResponse } from "../services/gemini.service";
import { Request, Response } from "express";

interface HealingAdviceRequestBody {
  message: string;
}

interface HealingAdviceResponse {
  healing: string;
}

export const healingAdvice = async (
  req: Request<unknown, unknown, HealingAdviceRequestBody>,
  res: Response<HealingAdviceResponse>
) => {
  const { message } = req.body;
  const prompt = `Person says: "${message}". Give a warm GenZ self‑growth reply ending with a reflective question.`;
  const healing = await getGeminiResponse(prompt);
  res.json({ healing });
};
