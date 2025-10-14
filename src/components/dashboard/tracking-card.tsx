"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, PauseCircle, CloudUpload, MapPin, AlertTriangle, Loader2 } from "lucide-react";
import type { LocationData } from "@/lib/types";
import { useSession } from "next-auth/react";

interface TrackingCardProps {
  isTracking: boolean;
  isSending: boolean;
  lastLocation: LocationData | null;
  onStart: () => void;
  onStop: () => void;
  onSendNow: () => void;
  locationError: string | null;
}

export function TrackingCard({
  isTracking,
  isSending,
  lastLocation,
  onStart,
  onStop,
  onSendNow,
  locationError,
}: TrackingCardProps) {
  const { data: session } = useSession();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>Location Tracking</CardTitle>
                <CardDescription>
                    Manage real-time location updates to Salesforce.
                    {session?.user && (
                      <span className="block text-xs text-muted-foreground mt-1">
                        Sending as: {session.user.name || session.user.email}
                      </span>
                    )}
                </CardDescription>
            </div>
            <Badge className={`capitalize ${isTracking ? 'bg-accent text-accent-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                {isTracking ? "Tracking On" : "Tracking Off"}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {locationError && (
            <div className="flex items-center gap-2 text-destructive p-3 bg-destructive/10 rounded-md">
                <AlertTriangle className="h-5 w-5"/>
                <p className="text-sm font-medium">{locationError}</p>
            </div>
        )}
        <div className="flex items-center text-sm p-4 border rounded-lg">
            <MapPin className="h-6 w-6 mr-4 text-primary" />
            <div>
                <p className="font-medium text-muted-foreground">Last Sent Location</p>
                {lastLocation ? (
                    <p className="font-mono text-base">
                        {lastLocation.latitude.toFixed(6)}, {lastLocation.longitude.toFixed(6)}
                    </p>
                ) : (
                    <p className="text-muted-foreground">No location sent yet.</p>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        {isTracking ? (
          <Button onClick={onStop} variant="destructive" className="w-full sm:w-auto">
            <PauseCircle className="mr-2 h-4 w-4" />
            Stop Background Tracking
          </Button>
        ) : (
          <Button onClick={onStart} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <PlayCircle className="mr-2 h-4 w-4" />
            Start Background Tracking
          </Button>
        )}
        <Button onClick={onSendNow} variant="secondary" className="w-full sm:w-auto" disabled={isSending}>
            {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <CloudUpload className="mr-2 h-4 w-4" />
            )}
          Send Location Now
        </Button>
      </CardFooter>
    </Card>
  );
}
