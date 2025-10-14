"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("salesforce", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
            <Globe className="h-8 w-8" />
        </div>
        <CardTitle className="text-2xl font-bold">ExecTracker</CardTitle>
        <CardDescription>
          Real-time Executive Location Tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            onClick={handleLogin} 
            className="w-full" 
            size="lg"
            disabled={isLoading || status === "loading"}
          >
            {isLoading || status === "loading" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Login with Salesforce
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Authenticate with your Salesforce account to track location.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
