import React from "react";
import DashboardLayoutClient from "./DashboardLayoutClient";
import { getUserDashboardData } from "@/lib/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // 🚨 If no session → block access
  if (!session?.user?.email) {
    redirect("/login");
  }

  // 🧠 Use real identity (replace mock userId system)
  const userId = session.user.id ?? session.user.email;

  const data = userId ? await getUserDashboardData(userId) : null;

  return (
    <DashboardLayoutClient userData={data}>
      {children}
    </DashboardLayoutClient>
  );
}