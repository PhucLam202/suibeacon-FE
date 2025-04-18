
import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, Trophy, FolderKanban, BarChart3 } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Dashboard",
    icon: Home,
  },
  {
    href: "/achievements",
    label: "Achievements",
    icon: Trophy,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <TooltipProvider>
      <nav className="fixed left-0 top-14 flex h-[calc(100vh-3.5rem)] w-14 flex-col items-center border-r border-border/40 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.href;
            const Icon = item.icon;

            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right" className="border-border/40">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
}
