"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, UserCircle, Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { data: session } = useSession();

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 shadow-lg">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 hover:opacity-80 active:opacity-70 transition-opacity cursor-pointer touch-manipulation">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200">
            <Globe className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-200">
              ExecTracker
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Location Management</p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* User Menu */}
        <div className="flex items-center space-x-4">
          {session?.user && (
            <div className="hidden sm:flex flex-col items-end text-sm mr-4 hover:bg-slate-50 dark:hover:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700 rounded-lg px-3 py-2 transition-colors touch-manipulation">
              <div className="flex items-center space-x-2 font-medium text-slate-700 dark:text-slate-300">
                <UserCircle className="h-4 w-4" />
                <span>{session.user.name || 'Salesforce User'}</span>
              </div>
              {session.user.email && (
                <span className="text-xs text-slate-500 dark:text-slate-400">{session.user.email}</span>
              )}
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 touch-manipulation">
                <Avatar className="h-10 w-10 ring-2 ring-slate-200 dark:ring-slate-700 hover:ring-blue-300 dark:hover:ring-blue-600 transition-all duration-200">
                  <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <UserCircle className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 shadow-xl border-slate-200 dark:border-slate-700" align="end" forceMount>
              <DropdownMenuLabel className="font-normal p-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900 dark:text-slate-100">{session?.user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-slate-500 dark:text-slate-400">
                    {session?.user?.email || 'No email'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-200 dark:bg-slate-700" />
              <DropdownMenuItem 
                onClick={handleLogout} 
                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 hover:bg-red-50 dark:hover:bg-red-950 transition-colors cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
