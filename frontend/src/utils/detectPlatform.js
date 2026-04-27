/**
 * Detects platform from URL on the client side.
 * Returns: 'youtube' | 'instagram' | 'facebook' | null
 */
export function detectPlatform(url) {
  try {
    const { hostname, pathname } = new URL(url);
    const host = hostname.replace('www.', '');

    if (host === 'youtube.com' || host === 'youtu.be') {
      if (host === 'youtu.be' || pathname.includes('/shorts/') || pathname.includes('/watch')) {
        return 'youtube';
      }
    }
    if (host === 'instagram.com') return 'instagram';
    if (host === 'facebook.com' || host === 'fb.watch') return 'facebook';

    return null;
  } catch {
    return null;
  }
}
