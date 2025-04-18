
import * as React from "react";
import { Header } from "@/components/dashboard/header";
import { Navigation } from "@/components/dashboard/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { Breadcrumb } from "@/components/dashboard/breadcrumb";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: {
    title: string;
    href?: string;
  }[];
}

export function DashboardLayout({
  children,
  breadcrumbs = [],
}: DashboardLayoutProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      {!isMobile && <Navigation />}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container py-6">
            {breadcrumbs.length > 0 && (
              <div className="mb-6">
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
      <CommandPalette />
      {isMobile && (
        <Navigation />
      )}
    </div>
  );
}
