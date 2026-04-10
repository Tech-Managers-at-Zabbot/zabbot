import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadStudioClient from "./components/UploadStudioClient";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <UploadStudioClient />
    </DashboardLayout>
  );
}