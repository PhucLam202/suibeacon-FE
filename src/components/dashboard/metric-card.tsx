
import * as React from "react";
import { Card } from "@/components/ui/card";
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
  tooltipContent?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  tooltipContent,
  className,
}: MetricCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className={cn("p-6 transition-colors hover:bg-accent/5", className)}>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          </Card>
        </TooltipTrigger>
        {tooltipContent && (
          <TooltipContent side="top">
            <p className="max-w-xs text-xs">{tooltipContent}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
