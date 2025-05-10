
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { MetricCard } from "@/components/dashboard/metric-card";
import { 
  FolderKanban, 
  Calendar, 
  Package,
  Loader2
} from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/sonner";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import WalletConnectionGuard from "@/components/WalletConnectionGuard";
import { useApiEndpoints } from "@/utils/api";

export default function Index() {
  const { isConnected, walletAddress } = useSuiWallet();
  const endpoints = useApiEndpoints();
  const [summary, setSummary] = React.useState({
    totalProjects: 0,
    totalPackages: 0
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!isConnected) return;
    
    const fetchSummary = async () => {
      try {
        // Gọi API để lấy summary
        const response = await axios.get(endpoints.SUMMARY);
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
  }, [isConnected, endpoints.SUMMARY]);

  return (
    <DashboardLayout breadcrumbs={[{ title: "Dashboard" }]}>
      {isConnected ? (
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
        </div>
      ) : (
        <div className="h-[calc(100vh-120px)] flex items-center justify-center">
          <WalletConnectionGuard>
            {null}
          </WalletConnectionGuard>
        </div>
      )}
    </DashboardLayout>
  );
}
