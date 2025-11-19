import Link from "../models/link";
async function generateShortUrl() {
  const shortId = Math.random().toString(36).substring(2, 8);
  const shortUrl = "https://vk.sht.at/" + shortId;
  const link = await Link.findOne({ shortId });
  if (link) return generateShortUrl();
  return { shortUrl, shortId };
}

export default generateShortUrl;