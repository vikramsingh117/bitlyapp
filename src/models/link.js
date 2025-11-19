import mongoose from "mongoose";

const linkSchema =
  new mongoose.Schema({
    longUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    shortId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    visitCount: { type: Number, default: 0 },
  });

const Link = mongoose.models.Link || mongoose.model("Link", linkSchema);

export default Link;