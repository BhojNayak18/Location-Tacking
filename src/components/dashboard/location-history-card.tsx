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
    <Card className="h-full bg-white/70 backdrop-blur-sm border-slate-200 dark:bg-slate-800/70 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group touch-manipulation">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-xl font-bold text-slate-900 dark:text-slate-100">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <Clock className="w-6 h-6 mr-2 text-purple-600 dark:text-purple-400" />
              Sync History
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Recent location updates sent to Salesforce.
            </CardDescription>
          </div>
          <Badge variant="outline" className="ml-2 px-3 py-1 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300">
            {history.length} {history.length === 1 ? 'Entry' : 'Entries'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] sm:h-[500px] px-6">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400 pt-8 sm:pt-16">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-center font-medium text-slate-700 dark:text-slate-300">No location updates yet</p>
              <p className="text-sm text-center mt-1">Start tracking or send a manual update to see history here.</p>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              {history.map((entry, index) => (
                <div key={entry.timestamp} className="flex items-start space-x-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md transition-all duration-200 group/item touch-manipulation">
                  <div className="flex-shrink-0 mt-1">
                    {entry.status === 'success' ? (
                       <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/40 group-hover/item:scale-110 transition-all duration-200">
                         <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 group-hover/item:scale-110 transition-transform duration-200" />
                       </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center group-hover/item:bg-red-200 dark:group-hover/item:bg-red-800/40 group-hover/item:scale-110 transition-all duration-200">
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 group-hover/item:scale-110 transition-transform duration-200" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-slate-900 dark:text-slate-100 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300 transition-colors">
                        {new Date(entry.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                      <Badge 
                        variant={entry.status === 'success' ? 'outline' : 'destructive'} 
                        className={`text-xs px-2 py-1 group-hover/item:scale-105 transition-all duration-200 ${
                          entry.status === 'success' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800 group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800' 
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800 group-hover/item:bg-red-200 dark:group-hover/item:bg-red-800'
                        }`}
                      >
                        {entry.status === 'success' ? 'Synced' : 'Failed'}
                      </Badge>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-mono group-hover/item:text-slate-700 dark:group-hover/item:text-slate-300 transition-colors">
                        Lat: {entry.latitude.toFixed(4)}, Lng: {entry.longitude.toFixed(4)}
                    </p>
                    {entry.status === 'failed' && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-2 p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800 group-hover/item:bg-red-100 dark:group-hover/item:bg-red-900/30 transition-colors">
                          {entry.responseMessage}
                        </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
