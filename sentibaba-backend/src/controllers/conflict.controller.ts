import { Request, Response } from "express";
import { getGeminiResponse } from "../services/gemini.service";
import { getRoomData } from "./room.controller";

export const analyzeConflict = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const room = getRoomData(roomId);

  if (!room || room.users.length < 2 || !room.messages) {
    return res.status(400).json({ error: "Not enough data" });
  }

  const [userA, userB] = room.users;
  const msgA = room.messages[userA];
  const msgB = room.messages[userB];

  if (!msgA || !msgB) return res.status(400).json({ error: "Both users must submit messages" });

  const prompt = `UserA: "${msgA}". UserB: "${msgB}". Write a 150-word GenZ empathetic reply to resolve the fight and end with a thoughtful question.`;
  const reply = await getGeminiResponse(prompt);

  res.json({ reply });
};
