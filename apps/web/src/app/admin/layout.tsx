"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
    // 1. ADD STATE HERE
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] dark:bg-[#0F1117] transition-colors duration-300 overflow-x-hidden">
            {/* 2. PASS STATE TO SIDEBAR */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* 3. UPDATE MAIN MARGIN DYNAMICALLY */}
            <main className={`flex-1 transition-all duration-300 ease-in-out 
                           ml-0 ${isCollapsed ? "lg:ml-24" : "lg:ml-72"} 
                           pb-32 lg:pb-0 
                           min-h-screen overflow-y-auto`}>
                <div className="p-4 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    {children}
                </div>
            </main>
        </div>
    );
}