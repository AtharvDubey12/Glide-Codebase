import express from "express";
import axios from "axios";
import fetch from "node-fetch";
import FormData from "form-data";

const router = express.Router();
router.post("/api/scan", async (req, res) => {
  try {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return res.status(400).json({ error: "No file URL provided" });
    }

    // download back from cloudi..
    const fileResponse = await fetch(fileUrl);
    if (!fileResponse.ok) {
      throw new Error(`Failed to fetch file: ${fileResponse.statusText}`);
    }
    const arrayBuffer = await fileResponse.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const form = new FormData();
    form.append("file", fileBuffer, { filename: "upload.bin" });

    const uploadResponse = await axios.post(
      "https://api.metadefender.com/v4/file",
      form,
      {
        headers: {
          apikey: process.env.METADEFENDER_APIKEY,
          ...form.getHeaders(),
        },
      }
    );

    const dataId = uploadResponse.data.data_id;

    let scanResult;
    while (true) {
      const resultResponse = await axios.get(
        `https://api.metadefender.com/v4/file/${dataId}`,
        {
          headers: { apikey: process.env.METADEFENDER_APIKEY },
        }
      );

      if (resultResponse.data.scan_results.progress_percentage === 100) {
        scanResult = resultResponse.data;
        break;
      }
      await new Promise((r) => setTimeout(r, 2000)); 
    }

    res.json(scanResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "File scanning failed" });
  }
});

export default router;
