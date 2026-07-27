import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Process lead inquiry (e.g., save to DB or send email)
    console.log('Received lead inquiry:', body);

    return NextResponse.json({ success: true, message: 'Inquiry received' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to process inquiry' }, { status: 500 });
  }
}
