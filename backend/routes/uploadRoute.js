import express from 'express';
import multer from 'multer';
import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import File from '../models/fileModel.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getToken } from '../utils/dropboxAuth.js';

const uploadRoutes = express.Router();

const upload = multer({ storage: multer.memoryStorage() });


uploadRoutes.post('/api/save-file', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    let accessToken = await getToken();
    const dbx = new Dropbox({
  accessToken: accessToken,
    fetch
    });

    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });
    const isPublic = req.body.isPublic;
    const dropboxPath = `/${file.originalname}`;
    const dropboxResponse = await dbx.filesUpload({
      path: dropboxPath,
      contents: file.buffer,
      mode: { '.tag': 'overwrite' }
    });

    const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: dropboxResponse.result.path_lower
    });

    const fileUrl = linkResponse.result.url.replace('&dl=0', '&dl=1'); 

    const ownerId = req.user.id;
    const newFile = new File({
      name: file.originalname || 'unnamed',
      url: fileUrl,
      owner: ownerId,
      parentFolder: null,
      size: file.size || 0,
      type: file.mimetype || 'misc',
      uploadedAt: new Date(),
      isPublic: (isPublic==='true' ? true : false)
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded and saved', file: newFile });

  } catch (err) {
    console.error('Error uploading or saving file: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default uploadRoutes;
