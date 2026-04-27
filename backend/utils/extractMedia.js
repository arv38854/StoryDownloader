import axios from 'axios';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'YOUR_RAPIDAPI_KEY_HERE';

const rapidApi = axios.create({
  baseURL: 'https://social-media-video-downloader.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com',
  },
  timeout: 7000,
});

const storyApi = axios.create({
  baseURL: 'https://instagram-scraper-stable-api.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': RAPIDAPI_KEY,
    'x-rapidapi-host': 'instagram-scraper-stable-api.p.rapidapi.com',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  timeout: 7000,
});

// ── In-memory TTL cache (5 min) ───────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

function cacheGet(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { cache.delete(key); return null; }
  return entry.value;
}

function cacheSet(key, value) {
  cache.set(key, { value, ts: Date.now() });
}

function hardTimeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out. Please try again.')), ms)
  );
}

// ── Instagram ─────────────────────────────────────────────────────────────────
export async function extractInstagram(url) {
  const cached = cacheGet(url);
  if (cached) { console.log('[cache] HIT instagram'); return cached; }

  const result = await Promise.race([_extractInstagram(url), hardTimeout(8000)]);
  cacheSet(url, result);
  return result;
}

async function _extractInstagram(url) {
  try {
    if (url.includes('/stories/') || url.includes('/s/')) {
      console.log('[Instagram] Detected story/highlight URL.');

      let username = null;
      let storyId = null;
      const storyMatch = url.match(/\/stories\/([^/?#]+)(?:\/([^/?#]+))?/);
      if (storyMatch) {
        username = storyMatch[1];
        storyId = storyMatch[2];
      }

      const { data: rawStories } = await storyApi.post(
        '/get_ig_user_stories.php',
        `username_or_url=${encodeURIComponent(username || url)}`
      );

      const stories = Array.isArray(rawStories)
        ? rawStories
        : (rawStories?.items || rawStories?.data || []);

      if (stories && stories.length > 0) {
        let story = stories[0];
        if (storyId) {
          const found = stories.find(
            s => s.id === storyId || s.pk === storyId || (s.id && s.id.includes(storyId))
          );
          if (found) story = found;
        }

        let downloadUrl = null;
        let mediaType = 'image';

        if (story.video_versions?.length > 0) {
          downloadUrl = story.video_versions[0].url;
          mediaType = 'video';
        } else if (story.image_versions2?.candidates?.length > 0) {
          downloadUrl = story.image_versions2.candidates[0].url;
          mediaType = 'image';
        }

        if (downloadUrl) return { type: mediaType, url: downloadUrl };
      }
    }

    const match = url.match(/(?:\/p\/|\/reel\/|\/tv\/|\/reels\/)([^/?#&]+)/);
    const shortcode = match ? match[1] : null;

    if (!shortcode && !url.includes('instagram.com')) {
      throw new Error('Invalid Instagram URL provided.');
    }

    const { data } = await rapidApi.get('/instagram/v3/media/post/details', {
      params: { shortcode: shortcode || url, renderableFormats: '720p,highres' },
    });

    if (!data?.contents?.length) {
      throw new Error('Could not extract media. The post may be private or unavailable.');
    }

    const content = data.contents[0];
    let downloadUrl = null;

    if (content.videos?.length > 0) {
      const video = content.videos.find(v => v.metadata?.has_audio) || content.videos[0];
      downloadUrl = video.url;
    } else if (content.images?.length > 0) {
      downloadUrl = content.images[0].url;
    }

    if (!downloadUrl) throw new Error('No media links found in the API response.');

    return { type: content.videos?.length ? 'video' : 'image', url: downloadUrl };
  } catch (error) {
    console.error('[Instagram Extraction Error]', error.message);
    if (error.response?.data?.message) {
      throw new Error(`RapidAPI Error: ${error.response.data.message}.`);
    }
    throw error;
  }
}

// ── Facebook ──────────────────────────────────────────────────────────────────
export async function extractFacebook(url) {
  const cached = cacheGet(url);
  if (cached) { console.log('[cache] HIT facebook'); return cached; }

  const result = await Promise.race([_extractFacebook(url), hardTimeout(8000)]);
  cacheSet(url, result);
  return result;
}

async function _extractFacebook(url) {
  try {
    const { data } = await rapidApi.get('/facebook/v3/post/details', {
      params: { url },
    });

    if (!data?.contents?.length) {
      // Fallback: scrape og:image for photo posts
      try {
        const response = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
          },
          timeout: 5000,
        });
        const ogMatch = response.data.match(/property="og:image" content="([^"]+)"/) ||
                        response.data.match(/meta name="twitter:image" content="([^"]+)"/);
        if (ogMatch?.[1]) {
          return { type: 'image', url: ogMatch[1].replace(/&amp;/g, '&') };
        }
      } catch (fallbackError) {
        console.error('[Facebook Fallback Error]', fallbackError.message);
      }

      throw new Error('Could not extract media. The post may be private or unavailable.');
    }

    const content = data.contents[0];
    let downloadUrl = null;
    let mediaType = 'video';

    if (content.videos?.length > 0) {
      const video = content.videos.find(v => v.metadata?.has_audio) || content.videos[0];
      downloadUrl = video.url;
    } else if (content.images?.length > 0) {
      downloadUrl = content.images[0].url;
      mediaType = 'image';
    } else if (content.links?.length > 0) {
      downloadUrl = content.links[0].url;
    }

    if (!downloadUrl) throw new Error('No downloadable media links found in the Facebook post.');

    return { type: mediaType, url: downloadUrl };
  } catch (error) {
    console.error('[Facebook Extraction Error]', error.message);
    if (error.response?.data?.message) {
      throw new Error(`RapidAPI Error: ${error.response.data.message}.`);
    }
    throw error;
  }
}

// ── YouTube ───────────────────────────────────────────────────────────────────
export async function extractYoutube(url) {
  const cached = cacheGet(url);
  if (cached) { console.log('[cache] HIT youtube'); return cached; }

  const result = await Promise.race([_extractYoutube(url), hardTimeout(8000)]);
  cacheSet(url, result);
  return result;
}

async function _extractYoutube(url) {
  try {
    const match = url.match(/(?:v=|shorts\/|youtu\.be\/|\/v\/|\/e\/)([^&?\n]+)/);
    if (!match?.[1]) throw new Error('Invalid YouTube URL provided.');

    const videoId = match[1];

    const { data } = await rapidApi.get('/youtube/v3/video/details', {
      params: { videoId },
    });

    if (data?.error) {
      throw new Error(`YouTube API Error: ${data.error.message || 'Unknown'}`);
    }

    if (!data?.contents?.length) {
      throw new Error('Could not extract media from YouTube. No contents returned.');
    }

    const content = data.contents[0];
    let downloadUrl = null;

    if (content.videos?.length > 0) {
      const video = content.videos.find(v => v.metadata?.has_audio && v.metadata?.has_video) || content.videos[0];
      downloadUrl = video.url;
    } else if (content.links?.length > 0) {
      downloadUrl = content.links[0].url;
    }

    if (!downloadUrl) throw new Error('No media links found in the API response.');

    return { type: 'video', url: downloadUrl };
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(`RapidAPI Error: ${error.response.data.message}.`);
    }
    throw error;
  }
}
