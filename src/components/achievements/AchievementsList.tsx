import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AchievementCard } from "./AchievementCard";
import { AchievementUploader } from "./AchievementUploader";
import { AchievementDetailView } from "./AchievementDetailView";
import { useApiEndpoints } from "@/utils/api";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { Loader2, Search, Filter, Plus } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { Achievement } from "@/types/ArchievementType";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AchievementsList() {
  const { isConnected, walletAddress } = useSuiWallet();
  const endpoints = useApiEndpoints();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showUploader, setShowUploader] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [achievementDetails, setAchievementDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [showDetailView, setShowDetailView] = useState(false);
  // Function to refresh achievements after upload
  const refreshAchievements = async () => {
    if (!isConnected) return;
    
    try {
      setLoading(true);
      
      const response = await axios.get(endpoints.ACHIEVEMENTS, {
        headers: {
          "wallet-address": walletAddress as string
        }
      });
      console.log("Achievement Details",response)
      if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
        const formattedAchievements = response.data.data.data.map((item: any) => {
          let image = item.imageURL;
          
          return {
            id: item._id || Math.random().toString(),
            title: item.description || "Achievement",
            description: `Blob ID: ${item.blobId}` || "No description available",
            date: new Date(item.createdAt).toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
            level: item.status ? "gold" : "bronze",
            featured: false,
            progress: item.status ? 100 : 50,
            issuer: "SuiBeacon",
            details: `User Address: ${item.userAddress}`,
            status: item.status ? "Completed" : "In Progress",
            image: image,
            blobId: item.blobId
          };
        });
        
        setAchievements(formattedAchievements);
        setError(null);
      } else {
        setAchievements([]);
        setError("Unexpected API response format");
      }
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setError("Failed to load achievements from API");
      setAchievements([]);
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch achievements from API
  useEffect(() => {
    if (!isConnected) {
      setLoading(false);
      return;
    }
    
    refreshAchievements();
    
  }, [isConnected, endpoints.ACHIEVEMENTS, walletAddress]);
  
  // Handle successful upload
  const handleUploadSuccess = () => {
    setShowUploader(false);
    toast.success("Achievement uploaded successfully!");
    refreshAchievements();
  };
  
  // Fetch achievement details
  const fetchAchievementDetails = async (achievement: Achievement) => {
    if (!achievement.blobId) {
      toast.error("No blob ID available for this achievement");
      return;
    }
    
    try {
      setLoadingDetails(true);
      setSelectedAchievement(achievement);
      setShowDetailView(true);
      
      const response = await axios.get(endpoints.ACHIEVEMENT_DETAILS(achievement.blobId), {
        headers: {
          "wallet-address": walletAddress as string
        }
      });
      
      if (response.data && response.data.data && response.data.data.achievement) {
        setAchievementDetails(response.data.data.achievement);
      } else {
        toast.error("Failed to load achievement details");
        setAchievementDetails(null);
      }
    } catch (error) {
      console.error("Error fetching achievement details:", error);
      toast.error("Error loading achievement details");
      setAchievementDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };
  
  // Close detail view
  const handleCloseDetailView = () => {
    setShowDetailView(false);
    setSelectedAchievement(null);
    setAchievementDetails(null);
  };
  
  // Filter achievements based on search query and active tab
  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "minted") return matchesSearch && achievement.progress === 100;
    if (activeTab === "unminted") return matchesSearch && achievement.progress < 100;
    
    return matchesSearch;
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="md:col-span-3 border rounded-lg p-4 bg-card">
          <div className="space-y-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Achievements</h2>
                <div className="flex items-center gap-2">
                  <Dialog open={showUploader} onOpenChange={setShowUploader}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Add Achievement
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Upload New Achievement</DialogTitle>
                      </DialogHeader>
                      <AchievementUploader onSuccess={handleUploadSuccess} />
                    </DialogContent>
                  </Dialog>
                  
                  <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="minted">Minted</TabsTrigger>
                      <TabsTrigger value="unminted">Unminted</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search achievements..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              {/* Filter section */}
              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4" />
                  <span className="font-medium">Filter</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Button variant="outline" size="sm" className="justify-start">All Levels</Button>
                  <Button variant="outline" size="sm" className="justify-start">All Categories</Button>
                  <Button variant="outline" size="sm" className="justify-start">All Dates</Button>
                </div>
              </div>
            </div>
            
            {/* Loading state */}
            {loading && (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}
            
            {/* Error state */}
            {error && !loading && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            
            {/* Achievement cards */}
            {!loading && !error && (
              <>
                {filteredAchievements.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No achievements found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAchievements.map((achievement) => (
                      <div key={achievement.id} onClick={() => fetchAchievementDetails(achievement)} className="cursor-pointer">
                        <AchievementCard achievement={achievement} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
            
            {/* Achievement Details Sheet */}
            <Sheet open={showDetailView} onOpenChange={setShowDetailView}>
              <SheetContent className="w-full sm:max-w-[700px] overflow-y-auto p-6">
                {loadingDetails ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  </div>
                ) : achievementDetails ? (
                  <AchievementDetailView 
                    achievement={achievementDetails} 
                    onClose={handleCloseDetailView} 
                    originalAchievement={selectedAchievement}
                  />
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Failed to load achievement details.</p>
                    <Button 
                      variant="outline" 
                      onClick={handleCloseDetailView}
                      className="mt-4"
                    >
                      Close
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
