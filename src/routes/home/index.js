import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Restful Ecommerce API' });
});

export default router;
