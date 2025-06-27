import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const rooms: any = {};

export const createRoom = (req: Request, res: Response) => {
  const code = uuidv4().split("-")[0];
  rooms[code] = { users: [], messages: {} };
  res.json({ code });
};

export const joinRoom = (req: Request, res: Response) => {
  const { code, userId } = req.body;
  if (!rooms[code]) return res.status(404).json({ error: "Room not found" });

  if (rooms[code].users.length >= 2) return res.status(403).json({ error: "Room is full" });

  rooms[code].users.push(userId);
  res.json({ message: "Joined room", users: rooms[code].users });
};

export const saveMessage = (req: Request, res: Response) => {
  const { roomId } = req.params;
  const { userId, message } = req.body;

  if (!rooms[roomId]) return res.status(404).json({ error: "Room not found" });

  rooms[roomId].messages[userId] = message;
  res.json({ success: true });
};

export const getRoomData = (roomId: string) => rooms[roomId];
