import axios from "axios";
import dotenv from 'dotenv';
import fs from 'fs/promises';
import path from 'path';
dotenv.config();

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_FILE = path.join(__dirname, "readTkn.json");
let memoryToken = null;
const REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN;
const CLIENT_ID = process.env.DROPBOX_APP_KEY;
const CLIENT_SECRET = process.env.DROPBOX_APP_SECRET;

async function readTknFile() {
    try {
        const data = await fs.readFile(TOKEN_FILE, "utf-8");
        return JSON.parse(data);
    } catch {
        return null;
    }
}
async function writeTknFile(tokenData) {
    await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2), "utf-8");
}

async function refreshAccessToken() {
  try {
    console.log("sending request to drop")
    const res = await axios.post(
      "https://api.dropboxapi.com/oauth2/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
    console.log("request finished")

    const data = res.data;
    const expiryTime = Date.now() + data.expires_in * 1000;

    const tokenData = {
      token: data.access_token,
      expiry: expiryTime,
    };

    await writeTknFile(tokenData);
    memoryToken = tokenData
    return tokenData.token;
  } catch (err) {
    throw new Error(
      `Failed to refresh token: ${err.response?.data?.error_description || err.message}`
    );
  }
}

export async function getToken() {
  // Try memory first
  if (!memoryToken) {
    memoryToken = await readTknFile();
  }

  // If still null, refresh
  if (!memoryToken) {
    await refreshAccessToken();
    return memoryToken.token; // immediately return
  }

  // Check if token is near expiry
  const now = Date.now();
  const tokenLifetime = 14400 * 1000; // 4 hours
  const refreshThreshold = memoryToken.expiry - tokenLifetime * 0.1;

  if (now >= refreshThreshold) {
    await refreshAccessToken();
  }

  return memoryToken.token; // always return current token
}
