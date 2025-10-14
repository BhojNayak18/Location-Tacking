"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import type { LocationHistoryEntry } from "@/lib/types";

export function LocationHistoryCard({ history }: { history: LocationHistoryEntry[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Sync History</CardTitle>
        <CardDescription>
          Recent location updates sent to Salesforce.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[480px]">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground pt-16">
              <Clock className="w-12 h-12 mb-4" />
              <p className="text-center">No location updates have been sent yet.</p>
              <p className="text-sm text-center">Start tracking or send a manual update.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry) => (
                <div key={entry.timestamp} className="flex items-start space-x-4 text-sm">
                  {entry.status === 'success' ? (
                     <CheckCircle2 className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive mt-1 flex-shrink-0" />
                  )}
                  <div className="flex-grow">
                    <p className="font-medium">
                      {new Date(entry.timestamp).toLocaleTimeString()}
                    </p>
                    <p className="text-muted-foreground text-xs">
                        Lat: {entry.latitude.toFixed(4)}, Lng: {entry.longitude.toFixed(4)}
                    </p>
                    {entry.status === 'failed' && (
                        <p className="text-destructive text-xs mt-1">{entry.responseMessage}</p>
                    )}
                  </div>
                   <Badge variant={entry.status === 'success' ? "default" : "destructive"} className={entry.status === 'success' ? 'bg-accent text-accent-foreground' : ''}>
                        {entry.status}
                    </Badge>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
