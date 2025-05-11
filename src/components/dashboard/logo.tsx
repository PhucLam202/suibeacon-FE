
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className, showTagline = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center justify-center rounded-md overflow-hidden">
        <img 
          src="/lovable-uploads/BeaconLogo-removebg.png" 
          alt="SuiBeacon Logo" 
          className="h-10 w-10 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold leading-none tracking-tight">SuiBeacon</span>
        {showTagline && <span className="text-xs text-muted-foreground">Management Packages</span>}
      </div>
    </div>
  );
}
