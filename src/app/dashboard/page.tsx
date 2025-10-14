"use client";

import { useState, useCallback, useRef } from "react";
import { Header } from "@/components/dashboard/header";
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
        userId: session.user?.id
      });
      
      result = await sendLocationDataClient(
        location,
        session.accessToken,
        session.instanceUrl,
        {
          // name: session.user?.name || undefined,
          // email: session.user?.email || undefined,
          id: session.user?.id  // Salesforce user ID from session
        }
      );
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
    interval: 300000, // 5 minutes
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Header />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-4">
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
        <div className="lg:col-span-3 space-y-4">
            <UserInfoCard />
            <LocationHistoryCard history={locationHistory} />
        </div>
      </div>
    </div>
  );
}
