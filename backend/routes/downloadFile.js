import express from 'express';
import File from '../models/fileModel.js';
import fetch from 'node-fetch';

const routes = express.Router();

// Fetch file metadata
routes.post('/api/getfile', async (req, res) => {
  try {
    const { id } = req.body;
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    return res.json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Download file via backend proxy
routes.get('/api/download/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);
    if (!file) return res.status(404).json({ message: 'File not found' });

    // Fetch from Dropbox API
    const dropboxUrl = file.url; // original shared URL
    const directUrl = dropboxUrl
      .replace('www.dropbox.com', 'dl.dropboxusercontent.com')
      .replace('&dl=0', '&dl=1');

    const response = await fetch(directUrl);
    if (!response.ok) throw new Error('Failed to fetch file from Dropbox');

    // Stream file to client
    res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    response.body.pipe(res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default routes;
