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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Information
        </CardTitle>
        <CardDescription>
          Your Salesforce account details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Name:</span>
          </div>
          <span>{session.user.name || 'Not available'}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Email:</span>
          </div>
          <span className="text-sm">{session.user.email || 'Not available'}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Status:</span>
          </div>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Connected to Salesforce
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
