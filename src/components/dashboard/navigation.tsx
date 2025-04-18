
import * as React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Home, Trophy, FolderDot, LineChart } from "lucide-react";

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      <Link
        to="/"
        className="nav-link transition-colors hover:text-primary"
      >
        <Home />
        <span className="hidden md:inline">Home</span>
      </Link>
      <Link
        to="/achievements"
        className="nav-link transition-colors hover:text-primary"
      >
        <Trophy />
        <span className="hidden md:inline">Achievements</span>
      </Link>
      <Link
        to="/projects"
        className="nav-link transition-colors hover:text-primary"
      >
        <FolderDot />
        <span className="hidden md:inline">Projects</span>
      </Link>
      <Link
        to="/analytics"
        className="nav-link transition-colors hover:text-primary"
      >
        <LineChart />
        <span className="hidden md:inline">Analytics</span>
      </Link>
    </nav>
  );
}
