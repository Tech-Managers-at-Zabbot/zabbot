import React from "react";
import DashboardLayoutClient from "./DashboardLayoutClient";
import { getUserDashboardData } from "@/lib/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * 🛠️ DEVELOPER BYPASS
   * Using a static ID until NextAuth is implemented.
   * Verify this ID exists in your local Prisma Studio (npx prisma studio)
   */
  const userId = "user_debug_123"; 

  // Fetch data or return null
  const data = userId ? await getUserDashboardData(userId) : null;

  return (
    // ✅ data is now correctly handled by the updated Client Interface
    <DashboardLayoutClient userData={data}>
      {children}
    </DashboardLayoutClient>
  );
}