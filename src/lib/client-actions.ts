"use client";

import type { LocationData } from "./types";

interface ActionResult {
  success: boolean;
  message?: string;
  requiresReauth?: boolean;
}

// Client-side function to send location data via our API route
export async function sendLocationDataClient(
  location: LocationData,
  accessToken: string,
  instanceUrl: string,
  userInfo: { name?: string; email?: string; id?: string }
): Promise<ActionResult> {
  console.log("Sending location data to Salesforce (client-side):", location);

  try {
    console.log('Sending location data via API route:', {
      latitude: location.latitude,
      longitude: location.longitude,
      timestamp: location.timestamp,
      userId: userInfo?.id
    });

    // Use our internal API route to avoid CORS issues
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: location.timestamp,
        userId: userInfo?.id
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || `HTTP ${response.status}`);
    }

    return {
      success: result.success,
      message: result.message,
    };

  } catch (error) {
    console.error('Location API Error:', error);
    
    // Check if it's an authentication error
    if (error instanceof Error && error.message.includes('Unauthorized')) {
      // Force session refresh
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);
      
      return {
        success: false,
        message: 'Session expired. Please try again or log in again.',
        requiresReauth: true
      };
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to send location to Salesforce',
    };
  }
}
