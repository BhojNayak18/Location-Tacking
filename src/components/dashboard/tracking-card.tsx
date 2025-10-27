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
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200 dark:bg-slate-800/70 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group touch-manipulation">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Location Tracking
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                    Manage real-time location updates to Salesforce.
                    {session?.user && (
                      <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Sending as: {session.user.name || session.user.email}
                      </span>
                    )}
                </CardDescription>
            </div>
            <Badge className={`capitalize px-3 py-1 ${
              isTracking 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${isTracking ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isTracking ? "Tracking On" : "Tracking Off"}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {locationError && (
            <div className="flex items-center gap-3 text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <AlertTriangle className="h-5 w-5 flex-shrink-0"/>
                <p className="text-sm font-medium">{locationError}</p>
            </div>
        )}
        <div className="flex items-center text-sm p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group-hover:border-blue-300 dark:group-hover:border-blue-600">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
              <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="flex-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1 group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors">Last Sent Location</p>
                {lastLocation ? (
                    <p className="font-mono text-lg text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lastLocation.latitude.toFixed(6)}, {lastLocation.longitude.toFixed(6)}
                    </p>
                ) : (
                    <p className="text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">No location sent yet.</p>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
        {isTracking ? (
          <Button onClick={onStop} variant="destructive" className="w-full sm:w-auto h-11 font-semibold hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-200 touch-manipulation">
            <PauseCircle className="mr-2 h-5 w-5" />
            Stop Background Tracking
          </Button>
        ) : (
          <Button onClick={onStart} className="w-full sm:w-auto h-11 font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 touch-manipulation">
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Background Tracking
          </Button>
        )}
        <Button onClick={onSendNow} variant="outline" className="w-full sm:w-auto h-11 font-semibold border-2 border-slate-300 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-700 dark:hover:text-blue-300 hover:scale-105 active:scale-95 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100 touch-manipulation" disabled={isSending}>
            {isSending ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
                <CloudUpload className="mr-2 h-5 w-5" />
            )}
          Send Location Now
        </Button>
      </CardFooter>
    </Card>
  );
}
