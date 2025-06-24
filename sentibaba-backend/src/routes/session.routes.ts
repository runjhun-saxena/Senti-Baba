import { Router } from 'express';
import {
  createSession,
  joinSession,
  submitStory,
  getResolution,
} from '../controllers/session.controller';

const router = Router();

router.post('/create', createSession);
router.post('/join', joinSession);
router.post('/story', submitStory);
router.get('/resolve/:code', getResolution); 

export default router;
