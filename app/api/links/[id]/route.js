import connectToDb from "../../../../src/lib/db";
import Link from "../../../../src/models/link";
export async function GET(req, context) {
    const { params } = await context; 
    await connectToDb();
  
    const { id } = await params;
    if (!id) {
      return Response.json({ message: "ID is required" }, { status: 400 });
    }
  
    const link = await Link.findOne({ shortId: id });
    if (!link) {
      return Response.json({ message: "Link not found" }, { status: 404 });
    }
  
    // update visit count
    link.visitCount += 1;
    await link.save();
  
    // redirect to long URL
    return Response.redirect(link.longUrl);
  }
  
export async function DELETE(req, context) {
    try {
    const { params } = await context; 
    await connectToDb();
    const { id } = await params;
    if (!id) {
      return Response.json({ message: "ID is required" }, { status: 400 });
    }
    const link = await Link.findOne({ shortId: id });
    if (!link) {
      return Response.json({ message: "Link not found" }, { status: 404 });
    }
    await link.deleteOne();
    return Response.json({ message: "Link deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete link", error);
    return Response.json({ message: "Failed to delete link", error: error.message }, { status: 500 });
  }
  }