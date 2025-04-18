import * as React from "react";
import { 
  Bell, 
  ChevronDown,
  LogOut, 
  Settings, 
  User as UserIcon,
  Search,
  Sun,
  Moon
} from "lucide-react";
import { Logo } from "@/components/dashboard/logo";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CommandDialog } from "@/components/ui/command";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
  const [open, setOpen] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-4">
        <Logo />
      </div>
      
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={() => setOpen(true)}
        >
          <Search className="h-4 w-4" />
          <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
        
        <CommandDialog open={open} onOpenChange={setOpen}>
          <div className="px-4 py-2">
            <h1 className="text-lg font-semibold">Global Search</h1>
            <p className="text-sm text-muted-foreground">
              Search anything in the dashboard
            </p>
          </div>
        </CommandDialog>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleDarkMode}
          className="relative"
        >
          {isDarkMode ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </Button>

        <div className="relative">
          <Button size="icon" variant="ghost" className="relative rounded-full">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 rounded-full" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/d1f6bd9d-355b-4bfe-8c63-5091012c10a1.png" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
