
import * as React from "react";
import { 
  Bell, 
  ChevronDown,
  LogOut, 
  Settings, 
  User as UserIcon,
  Languages,
  Sun,
  Moon,
  Wallet
} from "lucide-react";
import { Logo } from "@/components/dashboard/logo";
import { SearchInput } from "@/components/dashboard/search-input";
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
import { useSuiWallet } from "@/hooks/useSuiWallet";
import SuiWallet from "@/components/SuiWalletModal";

export function Header() {
  const [language, setLanguage] = React.useState("English");
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [walletModalOpen, setWalletModalOpen] = React.useState(false);
  const { isConnected, walletAddress } = useSuiWallet();
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-4">
        <Logo />
      </div>
      
      <div className="flex-1 px-4">
        <SearchInput className="mx-auto w-full max-w-xl" />
      </div>
      
      <div className="flex items-center gap-4">
        {/* Dark Mode Toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              {isDarkMode ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              setIsDarkMode(false);
              document.documentElement.classList.remove("dark");
            }}>
              Light {!isDarkMode && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              setIsDarkMode(true);
              document.documentElement.classList.add("dark");
            }}>
              Dark {isDarkMode && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Languages className="h-5 w-5" />
              <span className="sr-only">Language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage("English")}>
              English {language === "English" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("French")}>
              French {language === "French" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("German")}>
              German {language === "German" && "✓"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage("Spanish")}>
              Spanish {language === "Spanish" && "✓"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Notifications */}
        <div className="relative">
          <Button size="icon" variant="ghost" className="relative rounded-full">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full p-0 text-[10px]">
              3
            </Badge>
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
        
        {/* Wallet Connect Button - Simple version */}
        <div className="relative">
          <SuiWallet />
        </div>
        

            
        {/* User Menu
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 rounded-full" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/lovable-uploads/phuclamavata.jpg" alt="User avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">PhucLam</p>
                <p className="text-xs leading-none text-muted-foreground">
                  phuclpst09495@gmail.com
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
        </DropdownMenu>Dashboard Overview
         */}
      </div>
    </header>
  );
}
