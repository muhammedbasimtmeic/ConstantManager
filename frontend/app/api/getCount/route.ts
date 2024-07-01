import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    return NextResponse.json({ count: 18 });
  } catch (error) {
    console.log("[SERVER_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
