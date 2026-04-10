// apps/web/src/app/ai/ore/page.tsx
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OreChat from "@/app/ai/ore/components/OreChat";

export default function OrePage() {
  return (
    <DashboardLayout>
      <OreChat />
    </DashboardLayout>
  );
}