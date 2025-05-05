
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
  FolderKanban, 
  Calendar, 
  Package,
  Loader2
} from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/sonner";

export default function Index() {
  const [summary, setSummary] = React.useState({
    totalProjects: 0,
    totalPackages: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchSummary = async () => {
      try {
        // Gọi API để lấy summary
        const response = await axios.get(
          "http://localhost:5000/v1/display/summary/0xc9b3863e6f8249dfbd6c559c3f530adfce1e2976b726848c37d550ebb90774fe"
        );

        if (response.data && response.data.data && response.data.data.summary) {
          const summaryData = response.data.data.summary;
          setSummary(summaryData);
        }
      } catch (error) {
        console.error("Error fetching summary:", error);
        toast.error("Failed to load dashboard summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard" }]}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        
        {/* Metrics Grid - Redesigned with 3 boxes */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Total Projects - Larger box spanning 2 columns */}
          <div className="md:col-span-2">
            {loading ? (
              <div className="flex h-full items-center justify-center rounded-lg border p-6">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <MetricCard
                title="Total Projects"
                value={summary.totalProjects.toString()}
                icon={<FolderKanban className="h-5 w-5" />}
                description="Active projects"
                change={{ value: "+8%", trend: "up" }}
                tooltipContent="Total number of active projects in the platform"
                className="border-l-4 border-l-blue-500 h-full p-6"
              />
            )}
          </div>
          
          {/* Publish Date */}
          <div>
            <MetricCard
              title="Publish Date"
              value="June 15"
              icon={<Calendar className="h-4 w-4" />}
              description="Next release"
              tooltipContent="Scheduled date for the next major release"
              className="border-l-4 border-l-amber-500 h-[calc(50%-0.5rem)] mb-4"
            />
            
            {/* Total Packages */}
            {loading ? (
              <div className="flex h-[calc(50%-0.5rem)] items-center justify-center rounded-lg border">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <MetricCard
                title="Total Packages"
                value={summary.totalPackages.toString()}
                icon={<Package className="h-4 w-4" />}
                description="Across all projects"
                change={{ value: "+15%", trend: "up" }}
                tooltipContent="Total number of packages deployed across all projects"
                className="border-l-4 border-l-green-500 h-[calc(50%-0.5rem)]"
              />
            )}
          </div>
        </div>
        
        {/* Charts will be uncommented later */}
        {/* <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
          </div>
        </div> */}
        
        {/* Activity Feed */}
        {/* <ActivityFeed /> */}
      </div>
    </DashboardLayout>
  );
}
