import type { ReactNode } from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import ProtectedRoute from "@/components/auth/protected-route";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col bg-background">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
