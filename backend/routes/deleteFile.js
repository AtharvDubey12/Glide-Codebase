import express from 'express';
import fetch from 'node-fetch';
import File from '../models/fileModel.js';
import { getToken } from '../utils/dropboxAuth.js';

const routes = express.Router();

const getDropPath = async (url, accessToken) => {
    try {
        const response = await fetch("https://api.dropboxapi.com/2/sharing/get_shared_link_metadata", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });
        const metadata = await response.json();
        if (!metadata || !metadata.path_lower) return -1;
        return metadata.path_lower;
    } catch (err) {
        console.error("Error getting Dropbox path:", err);
        return -1;
    }
};

routes.post('/api/delfile', async (req, res) => {
    const { url, id } = req.body;
    const accessToken = await getToken();

    try {
        const mongoInstance = await File.findById(id);
        if (!mongoInstance) {
            return res.status(404).json({ message: "File Not Found" });
        }
    } catch {
        return res.status(500).json({ message: "Error while contacting the database." });
    }
    const path = await getDropPath(url, accessToken);
    if (path === -1) return res.status(500).json({ message: "Error occurred while retrieving Dropbox path" });
    try {
       
        const response = await fetch("https://api.dropboxapi.com/2/files/delete_v2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ path })
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(500).json({ message: "Dropbox delete failed", error });
        }

        await File.findByIdAndDelete(id);
        res.status(200).json({ message: "File deleted successfully" });

    } catch (err) {
        console.error("Error deleting file:", err);
        return res.status(500).json({ message: "Error occurred while deleting file" });
    }
});

export default routes;
