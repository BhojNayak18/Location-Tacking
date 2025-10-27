"use client";

import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Building } from "lucide-react";

export function UserInfoCard() {
  const { data: session } = useSession();

  if (!session?.user) {
    return null;
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border-slate-200 dark:bg-slate-800/70 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 group touch-manipulation">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
              <User className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                {session.user.name || 'Salesforce User'}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {session.user.email || 'No email available'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 group-hover:bg-green-200 dark:group-hover:bg-green-800 group-hover:scale-105 transition-all duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover:bg-green-600 transition-colors"></div>
              Connected
            </Badge>
            <div className="text-right group-hover:scale-105 transition-transform duration-300">
              <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Salesforce</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">Active</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
