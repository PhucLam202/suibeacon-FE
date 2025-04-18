
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Analytics() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Analytics" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Analytics</h1>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-neutral-mid p-4 bg-neutral-light lg:col-span-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-[150px]" />
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-[120px]" />
                  <Skeleton className="h-8 w-[80px]" />
                </div>
              </div>
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
          <div className="rounded-lg border border-neutral-mid p-4 bg-neutral-light">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-neutral-mid p-4 bg-neutral-light">
              <div className="space-y-2">
                <Skeleton className="h-5 w-[150px]" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
