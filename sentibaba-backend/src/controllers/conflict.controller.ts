import express from "express";
import { getGeminiResponse } from "../services/gemini.service";

interface AnalyzeConflictRequestBody {
  msgA: string;
  msgB: string;
}

export const analyzeConflict = async (
  req: express.Request<{}, {}, AnalyzeConflictRequestBody>,
  res: express.Response
) => {
  const { msgA, msgB } = req.body;

  if (!msgA || !msgB) {
    return res.status(400).json({ error: "Both messages are required." });
  }

  const prompt = `
You are an empathetic, GenZ-style relationship coach named Senti Baba...

**Partner A’s Story:**  
${msgA}

**Partner B’s Story:**  
${msgB}

Now generate your response.
`;

  try {
    const reply = await getGeminiResponse(prompt);
    return res.json({ reply });
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return res.status(500).json({ error: "Failed to analyze conflict." });
  }
};
