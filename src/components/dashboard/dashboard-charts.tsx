
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  TooltipProps
} from "recharts";
import { cn } from "@/lib/utils";
import { 
  HelpCircle, 
  Download, 
  MoreHorizontal 
} from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toggle } from "@/components/ui/toggle";

// Mock data for charts
const uploadData = [
  { date: "Jan", value: 120 },
  { date: "Feb", value: 150 },
  { date: "Mar", value: 180 },
  { date: "Apr", value: 130 },
  { date: "May", value: 210 },
  { date: "Jun", value: 240 },
  { date: "Jul", value: 290 },
  { date: "Aug", value: 320 },
  { date: "Sep", value: 270 },
  { date: "Oct", value: 230 },
  { date: "Nov", value: 260 },
  { date: "Dec", value: 310 },
];

const versionData = [
  { name: "Stable", value: 65 },
  { name: "Beta", value: 35 },
];

const teamActivityData = [
  { team: "Frontend", uploads: 45, reviews: 30, versions: 20 },
  { team: "Backend", uploads: 30, reviews: 15, versions: 22 },
  { team: "Mobile", uploads: 25, reviews: 18, versions: 15 },
  { team: "QA", uploads: 15, reviews: 40, versions: 10 },
];

const COLORS = ["#0ea5e9", "#f59e0b", "#10b981"];

export function UploadVolumeChart() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">Upload Volume (Real-time)</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs text-xs">Number of uploads over time, updated in real-time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Download className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuItem>Set alerts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          <div className="flex h-[200px] animate-pulse items-center justify-center bg-muted/20">
            <span className="text-sm text-muted-foreground">Loading chart data...</span>
          </div>
        ) : (
          <div className="h-[250px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={uploadData}
                margin={{
                  top: 5,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                />
                <RechartsTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <p className="mb-1 text-xs font-medium">{label}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-primary">
                              {payload[0].value}
                            </span>{" "}
                            uploads
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 3 }}
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function VersionDistributionChart() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">Version Distribution</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs text-xs">Distribution of stable vs beta versions</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Download className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[200px] animate-pulse items-center justify-center bg-muted/20">
            <span className="text-sm text-muted-foreground">Loading chart data...</span>
          </div>
        ) : (
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={versionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1800}
                  animationBegin={300}
                >
                  {versionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? "#0ea5e9" : "#f59e0b"} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-md">
                          <p className="text-xs font-medium">{payload[0].name}</p>
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium" style={{ color: payload[0].payload.fill }}>
                              {payload[0].value}%
                            </span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry, index) => (
                    <span className="text-xs">{value}</span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function TeamActivityChart() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showUploads, setShowUploads] = React.useState(true);
  const [showReviews, setShowReviews] = React.useState(true);
  const [showVersions, setShowVersions] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="dashboard-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">Team Activity</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs text-xs">Activity metrics by team</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Download className="h-3.5 w-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Export data</DropdownMenuItem>
              <DropdownMenuItem>Set alerts</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[200px] animate-pulse items-center justify-center bg-muted/20">
            <span className="text-sm text-muted-foreground">Loading chart data...</span>
          </div>
        ) : (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              <Toggle
                pressed={showUploads}
                onPressedChange={setShowUploads}
                size="sm"
                variant="outline"
                className={cn(
                  showUploads && "border-blue-200 bg-blue-50 text-blue-700"
                )}
              >
                Uploads
              </Toggle>
              <Toggle
                pressed={showReviews}
                onPressedChange={setShowReviews}
                size="sm"
                variant="outline"
                className={cn(
                  showReviews && "border-amber-200 bg-amber-50 text-amber-700"
                )}
              >
                Reviews
              </Toggle>
              <Toggle
                pressed={showVersions}
                onPressedChange={setShowVersions}
                size="sm"
                variant="outline"
                className={cn(
                  showVersions && "border-green-200 bg-green-50 text-green-700"
                )}
              >
                Versions
              </Toggle>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={teamActivityData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="team" tick={{ fontSize: 12 }} />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}`}
                  />
                  <RechartsTooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-md">
                            <p className="mb-1 text-xs font-medium">{label} Team</p>
                            {payload.map((p, index) => (
                              <p key={index} className="text-xs text-muted-foreground">
                                <span
                                  className="font-medium"
                                  style={{ color: p.color }}
                                >
                                  {p.value}
                                </span>{" "}
                                {p.name}
                              </p>
                            ))}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  {showUploads && (
                    <Bar
                      dataKey="uploads"
                      name="Uploads"
                      fill="#0ea5e9"
                      animationDuration={1500}
                    />
                  )}
                  {showReviews && (
                    <Bar
                      dataKey="reviews"
                      name="Reviews"
                      fill="#f59e0b"
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  )}
                  {showVersions && (
                    <Bar
                      dataKey="versions"
                      name="Versions"
                      fill="#10b981"
                      animationDuration={1500}
                      animationBegin={600}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
