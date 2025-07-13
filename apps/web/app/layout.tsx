'use client';
import { Sidebar } from "@repo/ui/Sidebar";
import { TopNavBar } from "@repo/ui/TopNavBar";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        <div className="flex flex-col h-screen">
          <TopNavBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}