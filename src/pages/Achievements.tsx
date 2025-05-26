// Achievements.tsx
import * as React from "react";
import { DashboardLayout } from "@/components/dashboard/layout";
import { ConnectButton } from "@mysten/dapp-kit";
import { AchievementsList } from "@/components/achievements/AchievementsList";
import { useSuiWallet } from "@/hooks/useSuiWallet";
import WalletConnectionGuard from "@/components/WalletConnectionGuard";

export default function Achievements() {
  const { isConnected } = useSuiWallet();

  return (
    <DashboardLayout breadcrumbs={[{ title: "Thành tựu" }]}>  
      <WalletConnectionGuard>
        <AchievementsList />
      </WalletConnectionGuard>
    </DashboardLayout>
  );
}
