
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  Check, 
  Filter, 
  User as UserIcon 
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Activity {
  id: number;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  action: string;
  target: string;
  timestamp: Date;
  type: "upload" | "version" | "review" | "system";
  isRead: boolean;
}

export function ActivityFeed({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [userFilter, setUserFilter] = React.useState<string>("");
  const [typeFilter, setTypeFilter] = React.useState<string>("");
  
  // Mock activities data
  const allActivities: Activity[] = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/lovable-uploads/d1f6bd9d-355b-4bfe-8c63-5091012c10a1.png",
        initials: "JD",
      },
      action: "uploaded",
      target: "Mobile UI Kit",
      timestamp: new Date(2023, 3, 15, 10, 30),
      type: "upload",
      isRead: true,
    },
    {
      id: 2,
      user: {
        name: "Sarah Connor",
        initials: "SC",
      },
      action: "reviewed",
      target: "Dashboard App v2.1",
      timestamp: new Date(2023, 3, 15, 14, 45),
      type: "review",
      isRead: false,
    },
    {
      id: 3,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg",
        initials: "AJ",
      },
      action: "released",
      target: "Analytics Dashboard v1.5",
      timestamp: new Date(2023, 3, 14, 9, 15),
      type: "version",
      isRead: false,
    },
    {
      id: 4,
      user: {
        name: "System",
        initials: "SYS",
      },
      action: "deployed",
      target: "API Gateway",
      timestamp: new Date(2023, 3, 14, 2, 30),
      type: "system",
      isRead: true,
    },
    {
      id: 5,
      user: {
        name: "Maria Garcia",
        initials: "MG",
      },
      action: "commented on",
      target: "User Authentication Service",
      timestamp: new Date(2023, 3, 13, 16, 20),
      type: "review",
      isRead: true,
    },
  ];

  // Apply filters
  const activities = allActivities.filter((activity) => {
    // Date filter
    if (date) {
      const activityDate = new Date(activity.timestamp);
      if (
        activityDate.getDate() !== date.getDate() ||
        activityDate.getMonth() !== date.getMonth() ||
        activityDate.getFullYear() !== date.getFullYear()
      ) {
        return false;
      }
    }

    // User filter
    if (userFilter && activity.user.name !== userFilter) {
      return false;
    }

    // Type filter
    if (typeFilter && activity.type !== typeFilter) {
      return false;
    }

    return true;
  });

  // Unique users for filter
  const users = Array.from(new Set(allActivities.map((a) => a.user.name)));

  // Simulate loading state
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const resetFilters = () => {
    setDate(undefined);
    setUserFilter("");
    setTypeFilter("");
  };

  const markAllAsRead = () => {
    // In a real app, this would update the actual data
    console.log("Marking all as read");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-medium">Activity Feed</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Filter by user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user} value={user}>
                  {user}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upload">Uploads</SelectItem>
              <SelectItem value="version">Versions</SelectItem>
              <SelectItem value="review">Reviews</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          {(date || userFilter || typeFilter) && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8"
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-1"
            onClick={markAllAsRead}
          >
            <Check className="h-3.5 w-3.5" />
            Mark all read
          </Button>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        {isLoading ? (
          // Skeleton loading states
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[80px]" />
                </div>
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))
        ) : activities.length > 0 ? (
          // Actual activity items
          activities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "flex items-start gap-4 rounded-md p-3 transition-colors",
                !activity.isRead && "bg-primary/5"
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{activity.user.name}</span>
                  <span className="text-muted-foreground">{activity.action}</span>
                  <span className="font-medium">{activity.target}</span>
                  {!activity.isRead && (
                    <Badge variant="secondary" className="ml-auto">New</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      activity.type === "upload" && "border-blue-200 bg-blue-50 text-blue-700",
                      activity.type === "version" && "border-green-200 bg-green-50 text-green-700",
                      activity.type === "review" && "border-amber-200 bg-amber-50 text-amber-700",
                      activity.type === "system" && "border-purple-200 bg-purple-50 text-purple-700"
                    )}
                  >
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {format(activity.timestamp, "MMM d, h:mm a")}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Filter className="h-12 w-12 text-muted-foreground" />
            <h4 className="mt-4 text-lg font-medium">No activities found</h4>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
