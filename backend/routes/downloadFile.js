import express from 'express';
import File from '../models/fileModel.js';

const routes = express.Router();

routes.post('/api/getfile', async (req,res) => {
    try{
    const {id} = req.body;
    const file = await File.findById(id);
    if(!file) return res.status(404).json({message: 'File not found'});
    return res.json(file);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}
)
export default routes;
