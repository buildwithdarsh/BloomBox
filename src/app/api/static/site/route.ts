import { NextResponse } from "next/server";
import { siteData } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(siteData);
}
