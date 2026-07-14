import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[AICost Audit API] Received submission:", body);
    
    // Process the submission here if needed
    
    return NextResponse.json(
      { 
        success: true, 
        message: "AI Cost audit submitted successfully",
        data: body 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[AICost Audit API] Error parsing request:", error);
    return NextResponse.json(
      { error: "Invalid JSON body or submission failed" },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "AICost Audit API is running" });
}
