// controllers/conflict.controller.ts
import { Request, Response } from "express";
import { getRoomData } from "../utils/room.utils";
import { getGeminiResponse } from "../services/gemini.service";

export const analyzeConflict = async (
  req: Request,
  res: Response
): Promise<Response<any> | void> => {
  const { roomId } = req.params;
  const room = getRoomData(roomId);

  if (!room || room.users.length < 2 || !room.messages) {
    return res.status(400).json({ error: "Not enough data" });
  }

  const [userA, userB] = room.users;
  const msgA = room.messages[userA];
  const msgB = room.messages[userB];

  if (!msgA || !msgB) {
    return res.status(400).json({ error: "Both users must submit messages" });
  }

  // 🧠 You fully control the prompt here
  const prompt = `
You are an empathetic, GenZ-style relationship coach named Senti Baba.

Two people in a relationship had a disagreement and shared their sides.

Write a short, 150-word max response that:
- Acknowledges both stories
- Encourages mutual understanding
- Uses a GenZ tone (light, slightly playful, empathetic)
- Ends with a helpful question like:
  - “Want ideas for a healthy conversation starter?”
  - “Should I suggest an activity to help you reconnect?”

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
