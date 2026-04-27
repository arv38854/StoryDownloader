import axios from 'axios';

// ─── Constants ────────────────────────────────────────────────────────────────

const TIMEOUT = 5000;
const MAX_RETRIES = 2;

// Mobile app User-Agent to mimic the Instagram app and bypass web restrictions
const INSTAGRAM_HEADERS = (sessionId) => ({
  'User-Agent': 'Instagram 155.0.0.37.107 Android (28/9; 411dpi; 1080x2220; samsung; SM-G975F; beyond2; exynos9820; en_US; 239490550)',
  'Accept-Language': 'en-US',
  'Accept-Encoding': 'gzip, deflate',
  'X-IG-Capabilities': '3brTvw==',
  'X-IG-Connection-Type': 'WIFI',
  'X-IG-App-ID': '567067343352427',
  Cookie: `sessionid=${sessionId}; ds_user_id=0;`,
});

// ─── Retry Wrapper ────────────────────────────────────────────────────────────

/**
 * Retries an async function up to `retries` times on failure.
 * Waits 300ms between attempts.
 */
async function withRetry(fn, retries = MAX_RETRIES) {
  let lastError;
  for (let attempt = 1; attempt <= retries + 1; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const status = err?.response?.status;

      // Don't retry on auth errors — session is expired/invalid
      if (status === 401 || status === 403) {
        throw new Error('Instagram session expired or invalid. Please update INSTAGRAM_SESSION_ID.');
      }

      // Don't retry on 404 — user/story doesn't exist
      if (status === 404) {
        throw new Error('Instagram user or story not found.');
      }

      if (attempt <= retries) {
        console.warn(`[Instagram] Attempt ${attempt} failed: ${err.message}. Retrying...`);
        await new Promise((r) => setTimeout(r, 300));
      }
    }
  }
  throw lastError;
}

// ─── Step 1: Extract Username ─────────────────────────────────────────────────

/**
 * Parses the Instagram story URL and extracts the username.
 * Supports: /stories/{username}/{story_id}/
 */
export function extractUsername(url) {
  try {
    const { hostname, pathname } = new URL(url);

    if (!hostname.includes('instagram.com')) {
      throw new Error('Not a valid Instagram URL.');
    }

    // Match /stories/{username}/{story_id}
    const match = pathname.match(/^\/stories\/([^/]+)\//);
    if (!match) {
      throw new Error('URL does not appear to be an Instagram story. Expected format: /stories/{username}/{story_id}/');
    }

    return match[1];
  } catch (err) {
    if (err.message.includes('Invalid URL')) throw new Error('Malformed URL provided.');
    throw err;
  }
}

// ─── Step 2: Get User ID ──────────────────────────────────────────────────────

/**
 * Fetches the numeric Instagram user ID for a given username
 * using Instagram's web profile info endpoint.
 */
export async function getUserId(username, sessionId) {
  return withRetry(async () => {
    const { data } = await axios.get(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          ...INSTAGRAM_HEADERS(sessionId),
          // Web endpoint needs a slightly different UA
          'User-Agent': 'Mozilla/5.0 (Linux; Android 9; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
          'X-Requested-With': 'XMLHttpRequest',
          Referer: `https://www.instagram.com/${username}/`,
        },
        timeout: TIMEOUT,
      }
    );

    const userId = data?.data?.user?.id;
    if (!userId) throw new Error('Could not retrieve user ID. The account may be private or does not exist.');

    return userId;
  });
}

// ─── Step 3: Fetch Story Data ─────────────────────────────────────────────────

/**
 * Fetches all active story items for a given user ID.
 * Requires a valid Instagram session cookie.
 */
export async function getStory(userId, sessionId) {
  return withRetry(async () => {
    const { data } = await axios.get(
      `https://i.instagram.com/api/v1/feed/user/${userId}/story/`,
      {
        headers: INSTAGRAM_HEADERS(sessionId),
        timeout: TIMEOUT,
      }
    );

    const items = data?.reel?.items || data?.items || [];

    if (!items.length) {
      throw new Error('No active stories found for this user.');
    }

    return items;
  });
}

// ─── Step 4: Extract Media URL ────────────────────────────────────────────────

/**
 * Extracts direct CDN media URL from a single story item.
 * Returns type ('video'|'image'), downloadUrl, and thumbnail.
 */
function extractMediaFromItem(item) {
  // Video story
  if (item.video_versions?.length) {
    return {
      type: 'video',
      downloadUrl: item.video_versions[0].url,
      thumbnail: item.image_versions2?.candidates?.[0]?.url || null,
    };
  }

  // Image story
  if (item.image_versions2?.candidates?.length) {
    return {
      type: 'image',
      downloadUrl: item.image_versions2.candidates[0].url,
      thumbnail: item.image_versions2.candidates[0].url,
    };
  }

  return null;
}

// ─── Main Export: processInstagramStory ──────────────────────────────────────

/**
 * Full pipeline: URL → username → userId → stories → media URLs.
 * Returns array of all story items with their media URLs.
 */
export async function processInstagramStory(url, sessionId) {
  if (!sessionId || sessionId === 'your_session_id_here') {
    throw new Error('Instagram session ID is not configured. Set INSTAGRAM_SESSION_ID in .env');
  }

  // Step 1
  const username = extractUsername(url);
  console.log(`[Instagram] Processing stories for @${username}`);

  // Step 2
  const userId = await getUserId(username, sessionId);
  console.log(`[Instagram] Resolved user ID: ${userId}`);

  // Step 3
  const items = await getStory(userId, sessionId);
  console.log(`[Instagram] Found ${items.length} story item(s)`);

  // Step 4 — extract media from all items
  const stories = items
    .map((item, i) => {
      const media = extractMediaFromItem(item);
      if (!media) {
        console.warn(`[Instagram] Could not extract media from story item ${i}`);
        return null;
      }
      return { index: i, ...media };
    })
    .filter(Boolean);

  if (!stories.length) {
    throw new Error('Stories found but media could not be extracted.');
  }

  return stories;
}
