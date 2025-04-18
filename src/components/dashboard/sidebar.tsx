
import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  ChevronRight, 
  Upload, 
  Menu,
  Sun,
  Moon,
  Search,
  Languages,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isUploadCollapsed, setIsUploadCollapsed] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  // Mock recent upload data
  const recentUploads = [
    { id: 1, name: "Dashboard App v2.1", status: "published" },
    { id: 2, name: "Mobile UI Kit", status: "draft" },
    { id: 3, name: "Analytics Dashboard", status: "published" },
    { id: 4, name: "User Authentication Service", status: "pending" },
    { id: 5, name: "E-commerce API", status: "draft" },
  ];

  const filteredUploads = recentUploads.filter(upload => 
    upload.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

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
              <AvatarImage src="/lovable-uploads/d1f6bd9d-355b-4bfe-8c63-5091012c10a1.png" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          ) : (
            <>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/lovable-uploads/d1f6bd9d-355b-4bfe-8c63-5091012c10a1.png" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="h-1.5 w-1.5 rounded-full bg-green-500 p-0" />
                  <span className="text-xs text-muted-foreground">Product Manager</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mb-6 space-y-2">
          {isCollapsed ? (
            <div className="space-y-2">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mx-auto h-8 w-8"
                      onClick={toggleDarkMode}
                    >
                      {isDarkMode ? (
                        <Moon className="h-4 w-4" />
                      ) : (
                        <Sun className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mx-auto h-8 w-8"
                        >
                          <Languages className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" side="right">
                        <DropdownMenuItem>English</DropdownMenuItem>
                        <DropdownMenuItem>French</DropdownMenuItem>
                        <DropdownMenuItem>German</DropdownMenuItem>
                        <DropdownMenuItem>Spanish</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    Language
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Language</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8">
                      English
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>English</DropdownMenuItem>
                    <DropdownMenuItem>French</DropdownMenuItem>
                    <DropdownMenuItem>German</DropdownMenuItem>
                    <DropdownMenuItem>Spanish</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </div>

        <Separator className="my-4" />

        {/* Recent Uploads Section */}
        <Collapsible
          open={!isUploadCollapsed}
          onOpenChange={setIsUploadCollapsed}
          className="space-y-2"
        >
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h3 className="text-sm font-medium">Recent Uploads</h3>
            )}
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isCollapsed && "mx-auto"
                )}
              >
                <Upload className="h-4 w-4" />
                <ChevronRight
                  className={cn(
                    "ml-auto h-4 w-4 transition-transform",
                    !isUploadCollapsed && "rotate-90"
                  )}
                />
                <span className="sr-only">Toggle uploads</span>
              </Button>
            </CollapsibleTrigger>
          </div>

          <CollapsibleContent className="space-y-2">
            {!isCollapsed && (
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search uploads..."
                  className="pl-8"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}

            <div className={cn(
              "space-y-1",
              isCollapsed ? "hidden" : "block"
            )}>
              {filteredUploads.map((upload) => (
                <div
                  key={upload.id}
                  className="flex cursor-pointer items-center justify-between rounded-md p-2 hover:bg-sidebar-accent"
                >
                  <span className="text-sm">{upload.name}</span>
                  <Badge
                    variant={
                      upload.status === "published"
                        ? "default"
                        : upload.status === "draft"
                          ? "outline"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
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
