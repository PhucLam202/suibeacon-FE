
import * as React from "react";
import { Navigation } from "@/components/dashboard/navigation";
import { Header } from "@/components/dashboard/header";
import { MetricCard } from "@/components/dashboard/metric-card";
import { 
  UploadVolumeChart, 
  VersionDistributionChart, 
  TeamActivityChart 
} from "@/components/dashboard/dashboard-charts";

export default function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <Navigation />
      
      <main className="ml-14 p-6">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              title="Total Apps"
              value="253"
              tooltipContent="Total number of applications uploaded to the platform"
            />
            <MetricCard
              title="Latest Version"
              value="v2.4.1"
              tooltipContent="Most recent stable version release"
            />
            <MetricCard
              title="Devices Online"
              value="1,862"
              tooltipContent="Devices currently connected to the platform"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <UploadVolumeChart />
            </div>
            <div className="lg:col-span-2">
              <VersionDistributionChart />
            </div>
          </div>
          
          <div>
            <TeamActivityChart />
          </div>
        </div>
      </main>
    </div>
  );
}
