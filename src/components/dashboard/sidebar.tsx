"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Globe, LogOut, UserCircle } from "lucide-react";

export function DashboardSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, clear tokens from secure storage
    router.push("/");
  };

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-card p-4">
        <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold">ExecTracker</h1>
        </div>
      
      <div className="flex flex-col items-center space-y-2">
        <Avatar className="h-20 w-20 border-2 border-primary">
          <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <AvatarFallback>
            <UserCircle className="h-20 w-20 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
        <div className="text-center">
            <p className="font-semibold">Alex Doe</p>
            <p className="text-sm text-muted-foreground">manager@company.com</p>
        </div>
      </div>
      
      <Separator className="my-6" />

      <div className="mt-auto">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
