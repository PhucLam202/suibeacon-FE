
import React from 'react';
import { cn } from '@/lib/utils';
import { Cloud } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center rounded-md bg-primary p-1 text-primary-foreground">
        <Cloud className="h-5 w-5" />
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex flex-col items-start">
            <span className="text-lg font-semibold leading-none tracking-tight">SkyDash</span>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p className="text-xs">Your apps at a glance</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
