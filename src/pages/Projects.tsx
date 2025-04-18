
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Projects() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Projects" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        
        <div className="flex flex-col space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-[200px]" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[80px]" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-9 w-[100px]" />
                  <Skeleton className="h-9 w-9" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
