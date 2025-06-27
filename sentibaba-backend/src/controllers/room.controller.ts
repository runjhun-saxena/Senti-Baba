import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

export const rooms: Record<string, { users: string[]; messages: Record<string, string> }> = {};


export const createRoom = (req: Request, res: Response, next: NextFunction) => {
  try {
    const code = uuidv4().split("-")[0];
    rooms[code] = { users: [], messages: {} };
    res.json({ code });
  } catch (error) {
    next(error);
  }
};

export const joinRoom = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { code, userId } = req.body;

    if (!rooms[code]) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    if (rooms[code].users.length >= 2) {
      res.status(403).json({ error: "Room is full" });
      return;
    }

    rooms[code].users.push(userId);
    res.json({ message: "Joined room", users: rooms[code].users });
  } catch (err) {
    next(err);
  }
};

export const saveMessage = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { roomId } = req.params;
    const { userId, message } = req.body;

    if (!rooms[roomId]) {
      res.status(404).json({ error: "Room not found" });
      return;
    }

    rooms[roomId].messages[userId] = message;
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getRoomData = (roomId: string) => rooms[roomId];
