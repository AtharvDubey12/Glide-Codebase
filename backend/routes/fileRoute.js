import express from 'express';
import File from '../models/fileModel.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const fileRoutes = express.Router();

fileRoutes.get('/api/files', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await File.find({ owner: userId }).sort({ uploadedAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch files' });
  }
});

export default fileRoutes;
