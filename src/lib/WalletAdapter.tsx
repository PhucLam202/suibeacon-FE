import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletAdapterContextType {
  walletAddress: string | null;
  isConnected: boolean;
  isInitialized: boolean;
  // Add any additional wallet-specific functionality here
}

const WalletAdapterContext = createContext<WalletAdapterContextType>({
  walletAddress: null,
  isConnected: false,
  isInitialized: false,
});

export function WalletAdapterProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletAdapterContextType>({
    walletAddress: null,
    isConnected: false,
    isInitialized: false,
  });

  useEffect(() => {
    // Initialize wallet adapter here if needed
    setState(prev => ({ ...prev, isInitialized: true }));
  }, []);

  return (
    <WalletAdapterContext.Provider value={state}>
      {children}
    </WalletAdapterContext.Provider>
  );
}

export function useWalletAdapter() {
  return useContext(WalletAdapterContext);
}