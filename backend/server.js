import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// Heartbeat to force reload: 2026-04-17T15:43:00
import { detectPlatform } from './utils/detectPlatform.js';
import { extractInstagram, extractFacebook, extractYoutube } from './utils/extractMedia.js';
import { processInstagramStory } from './utils/instagram.js';
import rateLimit from 'express-rate-limit';

// ─── Rate Limiter Configuration ──────────────────────────────────────────────
const downloadLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 10, // 20 requests per IP per day
  message: {
    success: false,
    error: 'You have reached your daily download limit. Please try again tomorrow.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
const PORT = process.env.PORT || 5000;

// Trust Render/proxy so rate limiter uses real client IP
app.set('trust proxy', 1);

const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'https://your-frontend.vercel.app', // replace with your real Vercel URL after deploy
  'https://story-downloader-one.vercel.app',
  'https://free-story-downloader.vercel.app',
  process.env.FRONTEND_URL,           // set this in Render environment variables
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
}));
app.use(express.json());

// ─── Health check / keep-alive ping endpoint ─────────────────────────────────
app.get('/ping', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/fetch/media', downloadLimiter, async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid URL provided.' });
  }

  const platform = detectPlatform(url.trim());

  if (!platform) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported platform. Only YouTube Shorts, Instagram, and Facebook are supported.',
    });
  }

  try {
    let downloadUrl, mediaType;

    if (platform === 'youtube') {
      const result = await extractYoutube(url);
      downloadUrl = result.url;
      mediaType = result.type;

    } else if (platform === 'instagram') {
      const result = await extractInstagram(url);
      downloadUrl = result.url;
      mediaType = result.type;

    } else if (platform === 'facebook') {
      const result = await extractFacebook(url);
      downloadUrl = result.url;
      mediaType = result.type;
    }

    return res.json({ success: true, platform, downloadUrl, mediaType });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err?.message || 'Something went wrong. Please try again.',
    });
  }
});

// ─── POST /api/instagram ─────────────────────────────────────────────────────
// Dedicated Instagram story downloader using session-based private API
app.post('/fetch/instagram', downloadLimiter, async (req, res) => {
  const { url } = req.body;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'Invalid URL provided.' });
  }

  const sessionId = process.env.INSTAGRAM_SESSION_ID;

  try {
    const stories = await processInstagramStory(url.trim(), sessionId);

    // Return first story item as primary + full array for multiple stories
    const primary = stories[0];
    return res.json({
      success: true,
      type: primary.type,
      downloadUrl: primary.downloadUrl,
      thumbnail: primary.thumbnail,
      totalStories: stories.length,
      allStories: stories,
    });
  } catch (err) {
    console.error('[Instagram API Error]', err.message);
    return res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);

  // ─── Keep-alive: ping self every 14 min to prevent Render free tier sleep ──
  // Render sleeps after 15 min of inactivity — we ping at 14 min to stay awake
  const BACKEND_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;
  setInterval(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/ping`);
      const data = await res.json();
      console.log(`[keep-alive] ping ok — ${data.timestamp}`);
    } catch (err) {
      console.warn(`[keep-alive] ping failed — ${err.message}`);
    }
  }, 14 * 60 * 1000); // 14 minutes
});
