
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu, Home, BarChart3, Users, Settings, Package, FolderKanban, Trophy, Plus, Upload, Loader2 } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { useSuiWallet } from '@/hooks/useSuiWallet';
import { useApiEndpoints } from "@/utils/api";
interface SidebarProps {
  className?: string;
}

interface Project {
  id: string;
  name: string;
  blobId: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [recentProjects, setRecentProjects] = React.useState<Project[]>([]);
  const [loading, setLoading] = React.useState(false);
  const location = useLocation();
  const { isConnected,walletAddress } = useSuiWallet();
  const endpoints = useApiEndpoints();

  // Fetch projects from API or localStorage
  React.useEffect(() => {
    if (!isConnected) return;
    
    const fetchProjects = async () => {
      // Check if we have cached projects
      const cachedProjects = localStorage.getItem('recentProjects');
      
      if (cachedProjects) {
        setRecentProjects(JSON.parse(cachedProjects));
        return;
      }
      
      // If no cached data, fetch from API
      try {
        setLoading(true);
        const response = await axios.get(endpoints.PROJECTS);
        
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          // Format projects
          const formattedProjects = response.data.data.data.map((item) => ({
            id: item._id,
            name: item.projectName || `Project ${item._id.substring(0, 8)}`,
            blobId: item.blobId
          }));
          
          // Save to state and localStorage
          setRecentProjects(formattedProjects);
          localStorage.setItem('recentProjects', JSON.stringify(formattedProjects));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback to default projects if API fails
        const fallbackProjects = [
          { id: "1", name: "Dashboard App v2.1", blobId: "sample1" },
          { id: "2", name: "Mobile UI Kit", blobId: "sample2" },
          { id: "3", name: "Analytics Dashboard", blobId: "sample3" },
          { id: "4", name: "User Authentication Service", blobId: "sample4" },
          { id: "5", name: "E-commerce API", blobId: "sample5" }
        ];
        setRecentProjects(fallbackProjects);
        localStorage.setItem('recentProjects', JSON.stringify(fallbackProjects));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [isConnected, endpoints.PROJECTS]);

  // Danh sách các mục chính
  const mainNavItems = [
    { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Projects", href: "/projects", icon: <FolderKanban className="h-5 w-5" /> },
    { name: "Achievements", href: "/achievements", icon: <Trophy className="h-5 w-5" /> },
    { name: "Analytics", href: "/analytics", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <aside
      className={cn(
        "group relative flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "sidebar-collapsed" : "sidebar-expanded",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <span className="font-medium">Dashboard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 rounded-full",
            isCollapsed && "mx-auto"
          )}
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        {/* User Profile Section */}
        <div className="mb-6 flex items-center gap-3">
          {isCollapsed ? (
            <Avatar className="mx-auto h-8 w-8">
              <AvatarImage src="/lovable-uploads/phuclamavata.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ) : (
            <>
              {/* <Avatar className="h-10 w-10">
                <AvatarImage src="/lovable-uploads/phuclamavata.jpg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Phuc Lam</span>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-1.5 w-1.5 rounded-full bg-green-500 p-0" />
                  <span className="text-xs text-muted-foreground">Development</span>
                </div>
              </div> */}
            </>
          )}
        </div>

        {/* Main Navigation */}
        <div className="space-y-1">
          {mainNavItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));
            
            return (
              <Link to={item.href} key={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  {item.icon}
                  {!isCollapsed && <span className="ml-2">{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Recent Projects Section */}
        <div className="mt-8">
          {!isCollapsed && (
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium">Recent Projects</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Upload className="h-3.5 w-3.5" />
              </Button>
            </div>
          )}
          
          <div className="space-y-1">
            {isCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-full">
                      <Package className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Recent Projects</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div className="space-y-1">
                {loading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  recentProjects.map((project) => (
                    <Link to={`/projects/${project.id}?blobId=${project.blobId}`} key={project.id}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-muted-foreground hover:text-foreground"
                      >
                        <span className="truncate">{project.name}</span>
                      </Button>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload New App Button */}
      <div className="flex w-full items-center border-t p-4">
        {isCollapsed ? (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="mx-auto h-10 w-10 rounded-full"
                >
                  <Plus className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                Upload New App
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : (
          <Button className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Upload New App
          </Button>
        )}
      </div>
    </aside>
  );
}
