import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // STRATEGY: For now, we log the email to a local file in the vault
    // This prevents the need for an external DB during the MVP phase
    // and allows the user to export leads easily to a CSV/Newsletter tool.
    
    const logMessage = `[${new Date().toISOString()}] New Subscriber: ${email}\n`
    
    // Note: Since this is a serverless function on Vercel, 
    // we can't write to a local file system reliably.
    // In a real deployment, this would be an API call to Mailchimp, ConvertKit, or a DB.
    
    console.log('Newsletter Subscription:', email)

    return NextResponse.json(
      { message: 'Successfully subscribed!' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
