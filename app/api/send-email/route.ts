import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to_email, from_name, from_email, subject, message } = body;

    // Validate required fields
    if (!to_email || !from_name || !from_email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailBody = `
Name: ${from_name}
Email: ${from_email}
Subject: ${subject}
Message: ${message}
    `;

    const mailtoLink = `mailto:${to_email}?subject=Portfolio Contact: ${subject}&body=${encodeURIComponent(emailBody)}`;

    return NextResponse.json({
      success: true,
      mailtoLink,
      message: 'Email client will open to send the message'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
