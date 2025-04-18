
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Achievements() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Achievements" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Achievements</h1>
        
        <div className="rounded-lg border border-neutral-mid p-8 bg-neutral-light">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="mx-auto h-4 w-[250px]" />
              <Skeleton className="mx-auto h-4 w-[200px]" />
            </div>
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-neutral-mid p-4 bg-neutral-light">
              <div className="space-y-3">
                <Skeleton className="mx-auto h-12 w-12 rounded-full" />
                <Skeleton className="mx-auto h-4 w-[150px]" />
                <Skeleton className="mx-auto h-3 w-[180px]" />
                <Skeleton className="mx-auto h-8 w-[100px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
