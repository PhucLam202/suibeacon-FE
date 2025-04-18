
import * as React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  description?: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  tooltipContent?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  description,
  change,
  tooltipContent,
  className,
}: MetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={cn(
            "dashboard-card overflow-hidden transition-all duration-200 hover:scale-[1.02]",
            className
          )}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <CardTitle className="text-sm font-medium">
                  {title}
                </CardTitle>
              </div>
              <div className="rounded-md bg-primary/10 p-1.5 text-primary">
                {icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <div className="text-xl font-bold tracking-tight">
                  {value}
                </div>
                {change && (
                  <div
                    className={cn(
                      "text-xs",
                      change.trend === "up" && "text-green-600",
                      change.trend === "down" && "text-red-600",
                      change.trend === "neutral" && "text-muted-foreground"
                    )}
                  >
                    {change.value}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-[200px]">
          <p className="text-xs">{tooltipContent || description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
