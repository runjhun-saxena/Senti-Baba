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
  res: Response<HealingAdviceResponse | { error: string }>
) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const prompt = `Person says: "${message}". Give a warm GenZ self‑growth reply ending with a reflective question.`;

  try {
    const healing = await getGeminiResponse(prompt);
    res.json({ healing });
  } catch (error) {
    console.error("Error in healingAdvice:", error);
    res.status(500).json({ error: "Failed to generate healing advice" });
  }
};

