// apps/web/src/app/ai/para/page.tsx
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ParaStudioClient from "./components/ParaStudioClient";

export default function ParaPage() {
  return (
    <DashboardLayout>
      {/* This client component now sits inside the server layout */}
      <ParaStudioClient />
    </DashboardLayout>
  );
}