
import * as React from "react";
import { Search, X } from "lucide-react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "/" && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const suggestions = [
    "Dashboard overview",
    "Recent uploads",
    "Team activity",
    "Project stats",
    "System status"
  ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "flex w-full max-w-sm items-center justify-between gap-2 text-muted-foreground md:max-w-xs lg:max-w-sm", 
            className
          )}
        >
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            <span className="hidden md:inline-block">Search dashboard...</span>
            <span className="inline-block md:hidden">Search...</span>
          </div>
          <kbd className="hidden rounded border bg-muted px-1.5 font-mono text-xs md:inline-block">
            /
          </kbd>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-full p-0" sideOffset={4}>
        <div className="flex items-center border-b px-3 py-2">
          <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dashboard..."
            className="border-0 bg-transparent p-1 shadow-none focus-visible:ring-0"
            {...props}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0 rounded-full"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        {open && (
          <div className="max-h-64 overflow-y-auto p-2">
            {suggestions.length > 0 ? (
              suggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  className="w-full justify-start px-2 py-1.5 text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {suggestion}
                </Button>
              ))
            ) : (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
