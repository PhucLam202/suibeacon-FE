import React from 'react';
import { useSuiWallet } from '@/hooks/useSuiWallet';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import { ConnectButton } from '@mysten/dapp-kit';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface WalletConnectionGuardProps {
  children: React.ReactNode;
}

const WalletConnectionGuard: React.FC<WalletConnectionGuardProps> = ({ children }) => {
  const { isConnected } = useSuiWallet();

  if (isConnected) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-[400px] shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mb-2">
            <Wallet className="h-5 w-5 text-blue-500" />
          </div>
          <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
          <CardDescription className="text-sm">
            Please connect your Sui wallet to access the dashboard and manage your projects.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <ConnectButton className="w-full" />
        </CardContent>
        <CardFooter className="flex flex-col pt-0">
          <div className="text-center text-xs text-muted-foreground">
            <p>Don't have a Sui wallet?</p>
            <a 
              href="https://docs.sui.io/build/wallet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600 text-xs font-medium"
            >
              Learn how to set up a wallet
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WalletConnectionGuard;
