import { Request, Response } from "express";
import { getRoomData } from "../utils/room.utils";
import { getGeminiResponse } from "../services/gemini.service";

export const analyzeConflict = async (
  req: Request,
  res: Response
): Promise<Response<any> | void> => {
  const { roomId } = req.params;

  let msgA: string | undefined;
  let msgB: string | undefined;

  if (roomId) {
    const room = getRoomData(roomId);
    if (!room || room.users.length < 2 || !room.messages) {
      return res.status(400).json({ error: "Not enough data in room." });
    }

    const [userA, userB] = room.users;
    msgA = room.messages[userA];
    msgB = room.messages[userB];

    if (!msgA || !msgB) {
      return res
        .status(400)
        .json({ error: "Both users must submit messages in the room." });
    }
  } else {
    msgA = req.body.msgA;
    msgB = req.body.msgB;

    if (!msgA || !msgB) {
      return res
        .status(400)
        .json({ error: "Both messages are required in the body." });
    }
  }

  const prompt = buildPrompt(msgA, msgB);

  try {
    const reply = await getGeminiResponse(prompt);
    return res.json({ reply });
  } catch (error) {
    console.error("Error generating Gemini response:", error);
    return res.status(500).json({ error: "Failed to analyze conflict." });
  }
};

const buildPrompt = (msgA: string, msgB: string): string => `
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
