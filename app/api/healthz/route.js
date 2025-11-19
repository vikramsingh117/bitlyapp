export async function GET() {
  console.log("Healthz endpoint hit");
  return Response.json({ message: "OK" }, { status: 200 });
}
