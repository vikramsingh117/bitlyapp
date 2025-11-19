import connectToDb from "../../../src/lib/db";
import Link from "../../../src/models/link";
import generateShortUrl from "../../../src/utils/shorturl";
export async function POST(req) {
  await connectToDb();
  const { longUrl } = await req.json();
  console.log(longUrl);
  if (!longUrl) {
    return Response.json({ message: "Long URL is required" }, { status: 400 });
  }
  if (!longUrl.startsWith("http")) {
    return Response.json({ message: "Long URL must start with http or https" }, { status: 400 });
  }
  if (await Link.findOne({ longUrl })) {
    return Response.json({ message: "Long URL already exists" }, { status: 400 });
  }
  const { shortUrl, shortId } = await generateShortUrl();
  const link = new Link({ longUrl, shortUrl, shortId, visitCount: 0 });
  await link.save();
  return Response.json({ message: "Link created", shortUrl: link.shortUrl }, { status: 201 });
}

export async function GET() {
    await connectToDb();
    const links = await Link.find();
    return Response.json(links, { status: 200 });
}