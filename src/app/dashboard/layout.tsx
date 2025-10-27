import type { ReactNode } from "react";
import ProtectedRoute from "@/components/auth/protected-route";
import { Navbar } from "@/components/dashboard/navbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-full bg-background">
        <Navbar />
        <main className="flex flex-col min-h-screen">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
