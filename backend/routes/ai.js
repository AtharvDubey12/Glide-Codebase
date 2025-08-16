import express from 'express';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const routes = express.Router();

routes.post('/api/summarize', async (req, res) => {
  let { link } = req.body;
  if (!link) return res.status(400).json({ error: "Dropbox link required" });

  try {
    link = link.replace("&dl=0", "&dl=1");

    const response = await axios.get(link, { responseType: 'arraybuffer' });
    const contentType = response.headers['content-type'];

    let content;
    if (contentType.startsWith('text') || contentType === 'application/binary') {
      content = Buffer.from(response.data).toString('utf-8');
    } else if (contentType.startsWith('image')) {
      content = response.data.toString('base64');
    } else {
      return res.status(400).json({ error: 'Unsupported file type' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const aiResponse = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: `Summarize this content in detail with imagery in 150 or less words:\n\n${content}` }]
        }
      ]
    });

    const summary = aiResponse.response.candidates[0].content.parts[0].text;
    res.json({ summary });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Error contacting AI" });
  }
});

export default routes;
