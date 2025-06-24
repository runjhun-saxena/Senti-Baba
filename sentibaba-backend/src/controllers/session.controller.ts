import { Request, Response } from 'express';
import {
  createNewSession,
  joinExistingSession,
  addUserStory,
  generateResolutionIfReady,
} from '../services/session.service';

export const createSession = (req: Request, res: Response) => {
  const code = createNewSession(); // generate a new code (like "B6F3KD")
  res.json({ code }); // send code back to frontend
};

export const joinSession = (req: Request, res: Response) => {
  const { code } = req.body;
  const success = joinExistingSession(code);
  success
    ? res.json({ message: 'Session joined' })
    : res.status(404).json({ error: 'Session not found' });
};

export const submitStory = (req: Request, res: Response) => {
  const { code, userId, story } = req.body;
  if (!code || !userId || !story)
    return res.status(400).json({ error: 'Missing parameters' });

  const result = addUserStory(code, userId, story);
  res.json(result);
};

export const getResolution = async (req: Request, res: Response) => {
  const { code } = req.params;
  const resolution = await generateResolutionIfReady(code);
  if (!resolution)
    return res.status(400).json({ error: 'Both stories not submitted yet' });

  res.json({ resolution });
};
