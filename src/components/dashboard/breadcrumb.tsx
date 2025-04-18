
import * as React from "react";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  items: {
    title: string;
    href?: string;
  }[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbsProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm", className)}>
      <a
        href="/"
        className="flex items-center text-muted-foreground hover:text-foreground"
      >
        <Home className="mr-2 h-4 w-4" />
        <span className="sr-only">Home</span>
      </a>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          {item.href ? (
            <a
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.title}
            </a>
          ) : (
            <span className="font-medium text-foreground">{item.title}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
