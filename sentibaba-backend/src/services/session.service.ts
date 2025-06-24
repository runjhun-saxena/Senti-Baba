import { sessions } from '../models/session.model';
import { generateCode } from '../utils/codeGenerator';
import { getGeminiResolution } from '../config/gemini.config';



export const createNewSession = () => {
  const code = generateCode(); // random 6-digit code like "A3F2KD"
  sessions.set(code, { userStories: new Map(), resolved: false });
  return code;
};

export const joinExistingSession = (code: string): boolean => {
  return sessions.has(code);
};

export const addUserStory = (
  code: string,
  userId: string,
  story: string
): { message: string } => {
  const session = sessions.get(code);
  if (!session) return { message: 'Invalid session code' };

  if (story.trim().split(' ').length > 40) {
    return { message: 'Story exceeds 40 words' };
  }

  session.userStories.set(userId, story);
  return { message: 'Story submitted' };
};


export const generateResolutionIfReady = async (code: string) => {
  const session = sessions.get(code);
  if (!session || session.resolved) return null;

  const stories = Array.from(session.userStories.values());
  if (stories.length < 2) return null;

  const resolution = await getGeminiResolution(stories);
  session.resolved = true;
  return resolution;
};