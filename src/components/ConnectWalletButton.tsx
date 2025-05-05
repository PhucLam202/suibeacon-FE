import { ConnectButton } from "@mysten/dapp-kit";
import { useDisconnectWallet } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { ChevronDown, Check } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const ConnectWalletButton = () => {
  const disconnectWallet = useDisconnectWallet();
  const [isOpen, setIsOpen] = useState(false);

  const handleDisconnect = () => {
    disconnectWallet.mutate();
    setIsOpen(false);
  };

  return (
    <ConnectButton>
      {({ connected, connecting, connect }) => {
        if (connected) {
          return (
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-foreground rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50"
                >
                  <span className="font-medium">Vi Code CL</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] p-2 bg-white">
                <DropdownMenuItem className="flex items-center py-2">
                  <span className="font-medium">Vi Code CL</span>
                  <Check className="w-4 h-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDisconnect} className="py-2">
                  <span>Disconnect</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        }

        return (
          <Button
            variant="outline"
            className="bg-white text-foreground rounded-lg px-4 py-2 hover:bg-gray-50"
            onClick={connect}
            disabled={connecting}
          >
            {connecting ? "Connecting..." : "Vi Code CL"}
          </Button>
        );
      }}
    </ConnectButton>
  );
};

export default ConnectWalletButton;
