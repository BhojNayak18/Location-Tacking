"use client";

import { useState, useCallback, useRef } from "react";
import { TrackingCard } from "@/components/dashboard/tracking-card";
import { MapCard } from "@/components/dashboard/map-card";
import { LocationHistoryCard } from "@/components/dashboard/location-history-card";
import { UserInfoCard } from "@/components/dashboard/user-info-card";
import { useLocationTracking } from "@/hooks/use-location-tracking";
import type { LocationData, LocationHistoryEntry } from "@/lib/types";
import { sendLocationData } from "@/lib/actions";
import { sendLocationDataClient } from "@/lib/client-actions";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [locationHistory, setLocationHistory] = useState<LocationHistoryEntry[]>([]);
  const [lastSentLocation, setLastSentLocation] = useState<LocationData | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const isSendingRef = useRef(false);

  const handleSendLocation = useCallback(async (location: LocationData | null, source: 'manual' | 'auto') => {
    if (!location) {
      toast({
        title: "Error",
        description: "Could not retrieve current location.",
        variant: "destructive",
      });
      return;
    }

    if (isSendingRef.current) {
        if (source === 'manual') {
            toast({
                title: "In Progress",
                description: "A location update is already being sent.",
            });
        }
        return;
    }

    isSendingRef.current = true;
    if (source === 'manual') setIsSending(true);

    // Use client-side action directly since server action has JWT issues
    let result;
    if (session?.accessToken && session?.instanceUrl) {
      console.log("Using client action with session:", {
        hasToken: !!session.accessToken,
        hasInstanceUrl: !!session.instanceUrl,
        userId: (session.user as any)?.id
      });
      
      result = await sendLocationDataClient(
        location,
        session.accessToken,
        session.instanceUrl,
        {
          // name: session.user?.name || undefined,
          // email: session.user?.email || undefined,
          id: (session.user as any)?.id  // Salesforce user ID from session
        }
      );
      
      // Handle token expiration
      if (result.requiresReauth) {
        // Attempt to refresh the session
        const { getSession } = await import("next-auth/react");
        await getSession();
        
        if (source === 'manual') {
          toast({
            title: "Session Refreshed",
            description: "Please try sending your location again.",
            variant: "default",
          });
        }
      }
    } else {
      console.log("Session missing required data:", session);
      result = {
        success: false,
        message: "Session expired. Please log in again."
      };
    }

    const historyEntry: LocationHistoryEntry = {
      ...location,
      status: result.success ? "success" : "failed",
      responseMessage: result.message,
    };

    setLocationHistory(prev => [historyEntry, ...prev]);
    if (result.success) {
      setLastSentLocation(location);
      if (source === 'manual') {
        toast({
          title: "Success",
          description: "Location sent successfully.",
          variant: "default",
        });
      }
    } else {
      toast({
        title: "Sync Failed",
        description: result.message || "Could not send location to Salesforce.",
        variant: "destructive",
      });
    }

    isSendingRef.current = false;
    if (source === 'manual') setIsSending(false);
  }, [toast, session]);

  const {
    currentLocation,
    isTracking,
    startTracking,
    stopTracking,
    error: locationError,
  } = useLocationTracking({
    onLocationUpdate: (location) => handleSendLocation(location, 'auto'),
    interval: 120000, // 2 minutes
  });

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      <div className="container mx-auto px-4 py-6 space-y-6 md:space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-3 md:space-y-4 animate-in fade-in-50 duration-700">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg mb-3 md:mb-4 active:scale-95 transition-transform duration-200 touch-manipulation">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
            Location Dashboard
          </h1>
          <p className="text-sm md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
            Track and manage your location data with Salesforce integration. Monitor real-time updates and maintain comprehensive location history.
          </p>
        </div>

        {/* User Information Section - Compact */}
        <div className="max-w-4xl mx-auto animate-in slide-in-from-top-4 duration-700 delay-200">
          <UserInfoCard />
        </div>
        
        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
            {/* Left Column - Location Tracking */}
            <div className="xl:col-span-2 space-y-6 animate-in slide-in-from-left-4 duration-700 delay-300">
              <TrackingCard
                isTracking={isTracking}
                isSending={isSending}
                lastLocation={lastSentLocation}
                onStart={startTracking}
                onStop={stopTracking}
                onSendNow={() => handleSendLocation(currentLocation, 'manual')}
                locationError={locationError}
              />
              <MapCard />
            </div>
            
            {/* Right Column - Location History */}
            <div className="xl:col-span-1 animate-in slide-in-from-right-4 duration-700 delay-400">
              <LocationHistoryCard history={locationHistory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
