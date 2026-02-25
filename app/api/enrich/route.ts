import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const companyUrl = body.url;

  
    const enrichmentData = {
      summary: `AI Analysis for ${companyUrl}: High-growth startup showing 30% MoM increase in platform engagement.`,
      signals: [
        "Expanding engineering team",
        "Recent patent filing in AI Infrastructure",
        "Strong market sentiment"
      ],
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(enrichmentData);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}