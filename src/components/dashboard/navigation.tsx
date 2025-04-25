
import * as React from "react";
import { cn } from "@/lib/utils";
import { Home, Trophy, FolderKanban, BarChart3 } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { startTransition } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/projects",
    label: "Projects",
    icon: FolderKanban,
  },
  {
    href: "/achievements",
    label: "Achievements",
    icon: Trophy,
  },

  {
    href: "/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    startTransition(() => {
      navigate(href);
    });
  };

  return (
    <nav className="sticky top-16 z-20 flex h-12 w-full items-center justify-center border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex h-full space-x-1">
        {navItems.map((item) => {
          const isActive = currentPath === item.href;
          const Icon = item.icon;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavigation(item.href, e)}
              className={cn(
                "nav-link",
                isActive ? "active" : ""
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
