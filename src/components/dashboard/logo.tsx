
import React from 'react';
import { cn } from '@/lib/utils';
import { Cloud } from 'lucide-react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center rounded-md bg-primary p-1 text-primary-foreground">
        <Cloud className="h-6 w-6" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-none tracking-tight">SkyDash</span>
        {showTagline && <span className="text-xs text-muted-foreground">Cloud Management Suite</span>}
      </div>
    </div>
  );
}
