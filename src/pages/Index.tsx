
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { 
  UploadVolumeChart, 
  VersionDistributionChart, 
  TeamActivityChart 
} from "@/components/dashboard/dashboard-charts";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { 
  Package, 
  Tag, 
  Laptop, 
  ClipboardCheck 
} from "lucide-react";

export default function Index() {
  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Apps"
            value="253"
            icon={<Package className="h-4 w-4" />}
            description="Last 30 days"
            change={{ value: "+12%", trend: "up" }}
            tooltipContent="Total number of applications uploaded to the platform"
          />
          <MetricCard
            title="Latest Version"
            value="v2.4.1"
            icon={<Tag className="h-4 w-4" />}
            description="Released 2 days ago"
            tooltipContent="Most recent stable version release"
          />
          <MetricCard
            title="Devices Online"
            value="1,862"
            icon={<Laptop className="h-4 w-4" />}
            description="Active devices"
            change={{ value: "-3%", trend: "down" }}
            tooltipContent="Devices currently connected to the platform"
          />
          <MetricCard
            title="Pending Reviews"
            value="24"
            icon={<ClipboardCheck className="h-4 w-4" />}
            description="8 high priority"
            change={{ value: "+5", trend: "neutral" }}
            tooltipContent="Reviews awaiting completion by the team"
          />
        </div>
        
        {/* Charts Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <UploadVolumeChart />
          </div>
          <div>
            <VersionDistributionChart />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TeamActivityChart />
          </div>
          <div className="lg:col-span-1">
            {/* This could be a future widget area */}
          </div>
        </div>
        
        {/* Activity Feed */}
        <ActivityFeed />
      </div>
    </DashboardLayout>
  );
}
