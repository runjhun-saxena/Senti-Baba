import { Request, Response } from "express";
import { getGeminiResponse } from "../services/gemini.service";

export const analyzeJudgment = async (req: Request, res: Response) => {
  const { story } = req.body;

  if (!story) {
    return res.status(400).json({ error: "Story is required" });
  }

  const prompt = `
 I am Sharing a story which was a conflict :
"${story}"

Please:
1. Analyze both perspectives neutrally.
2. Identify red or green flags.
3. Give an estimate of how much each person is at fault (in percentage).
4. Offer a short, respectful judgment summary.
`;

  try {
    const reply = await getGeminiResponse(prompt);
    res.json({ analysis: reply });
  } catch (err) {
    res.status(500).json({ error: "Failed to get analysis" });
  }
};
