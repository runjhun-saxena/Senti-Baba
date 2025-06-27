import { rooms } from "../controllers/room.controller"; // ✅ Import actual rooms

export const getRoomData = (roomId: string) => {
  return rooms[roomId];
};