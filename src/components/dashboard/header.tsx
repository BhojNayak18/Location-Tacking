"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex items-center justify-between space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Location Dashboard</h2>
      <div className="flex items-center space-x-4">
        {session?.user && (
          <div className="flex flex-col items-end text-sm">
            <div className="flex items-center space-x-2 font-medium">
              <User className="h-4 w-4" />
              <span>{session.user.name || 'Salesforce User'}</span>
            </div>
            {session.user.email && (
              <span className="text-xs text-muted-foreground">{session.user.email}</span>
            )}
          </div>
        )}
        <Button onClick={handleLogout} variant="outline" size="sm">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
