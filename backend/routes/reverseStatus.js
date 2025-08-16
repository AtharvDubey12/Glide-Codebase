import express from 'express';
import File from '../models/fileModel.js';

const fileRoutes = express.Router();

fileRoutes.post('/api/change-file-status', async (req, res) => {
    try {
        const {id} = req.body;
        const file =await File.findById(id);
        const old = file.isPublic;
        file.isPublic = !file.isPublic;
        await file.save();
        res.status(200).json({message: !old});
    }
    catch (err) {
        res.status(500).json({message: "changing access control failed"});
    }
});

export default fileRoutes;
