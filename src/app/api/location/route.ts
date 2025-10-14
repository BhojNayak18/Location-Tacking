import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: NextRequest) {
  try {
    // Get session from request headers instead of JWT
    const sessionCookie = request.headers.get('cookie');
    const session = await getServerSession(authOptions);
    
    if (!session?.accessToken || !session?.instanceUrl) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated with Salesforce' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { latitude, longitude, timestamp, userId } = body;

    if (!latitude || !longitude || !timestamp || !userId) {
      return NextResponse.json(
        { success: false, message: 'Missing required location data' },
        { status: 400 }
      );
    }

    // Prepare payload for your custom REST endpoint
    const locationPayload = [{
      executiveId: userId,
      latitude: latitude,
      longitude: longitude,
      timestamp: timestamp
    }];

    console.log('Sending location payload to Salesforce:', locationPayload);

    // Use your custom REST endpoint
    const response = await fetch(
      `${session.instanceUrl}/services/apexrest/execLocations/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationPayload),
      }
    );

    if (!response.ok) {
      let errorMessage = `Salesforce API Error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch (e) {
        // If response is not JSON, use status text
      }
      return NextResponse.json(
        { success: false, message: errorMessage },
        { status: response.status }
      );
    }

    const result = await response.json();
    
    return NextResponse.json({
      success: true,
      message: "Location sent successfully to Salesforce.",
      data: result
    });

  } catch (error) {
    console.error('Location API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send location' 
      },
      { status: 500 }
    );
  }
}
