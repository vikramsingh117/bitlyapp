import Link from "../models/link";
async function generateShortUrl() {
  const shortId = Math.random().toString(36).substring(2, 8);
  // Check for BASE_URL, SHORT_URL, or NEXT_PUBLIC_BASE_URL, with fallback to localhost:3000
  const baseUrl = process.env.BASE_URL || process.env.SHORT_URL || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const shortUrl = `${baseUrl}/api/links/${shortId}`;
  const link = await Link.findOne({ shortId });
  if (link) return generateShortUrl();
  return { shortUrl, shortId };
}

export default generateShortUrl;