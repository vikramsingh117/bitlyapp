import Link from "../models/link";
async function generateShortUrl() {
  const shortId = Math.random().toString(36).substring(2, 8);
  const baseUrl = process.env.SHORT_URL || "http://localhost:3000";
  const shortUrl = `${baseUrl}/api/links/${shortId}`;
  const link = await Link.findOne({ shortId });
  if (link) return generateShortUrl();
  return { shortUrl, shortId };
}

export default generateShortUrl;