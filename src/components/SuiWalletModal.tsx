import { Button } from "@/components/ui/button";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import { Wallet, Check } from "lucide-react";
import { ConnectButton } from '@mysten/dapp-kit';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface SuiWalletProps {
  className?: string;
}

const SuiWallet = ({ className }: SuiWalletProps) => {
  const { isConnected, isConnecting, walletAddress, disconnectWallet } = useSuiWallet();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className={`flex items-center gap-2 ${className}`}
        >
          <Wallet className="h-4 w-4" />
          <span>{isConnected ? walletAddress?.slice(0, 6) + '...' + walletAddress?.slice(-4) : 'Connect Wallet'}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        {isConnected ? (
          <div className="py-2">
            <div className="flex items-center px-3 py-2">
              <span className="font-medium">Vi Code CL</span>
              <Check className="ml-auto h-4 w-4" />
            </div>
            <Button 
              variant="ghost" 
              className="w-full justify-start px-3 py-2 text-red-500 hover:text-red-600"
              onClick={disconnectWallet}
            >
              Disconnect
            </Button>
          </div>
        ) : (
          <div className="py-2">
            <ConnectButton />
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default SuiWallet;
