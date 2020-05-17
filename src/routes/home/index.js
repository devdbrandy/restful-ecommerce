import { Router } from 'express';
import { messages } from '@helpers/constants';

const router = Router();
const { WELCOME_MESSAGE } = messages;

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ success: true, message: WELCOME_MESSAGE });
});

export default router;
