"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useBalance } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { useFryReef } from "@/hooks/useFryReef";
import { RESOURCE_CONFIG, Resource } from "@/constants/gameConfig";

export function WalletHeader() {
  const { address, isConnected, isConnecting, isReconnecting } = useAccount();
  const { pearlShards, spawnDust, starterPackClaimed, isLoading } = useFryReef();

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: baseSepolia.id,
    query: {
      enabled: !!address && isConnected,
    },
  });

  const ethBalance = balanceData
    ? (Number(balanceData.value) / 10 ** balanceData.decimals).toFixed(3)
    : "-.--";

  // Don't show balance panel while connecting
  const showBalancePanel = isConnected && !isConnecting && !isReconnecting;

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {/* Combined balance & resources panel */}
      {showBalancePanel && (
        <div className="flex items-center gap-2 sm:gap-3 rounded-xl bg-white/5 px-2.5 py-2 sm:px-4 sm:py-3 backdrop-blur-sm">
          {/* ETH Balance */}
          <div className="flex items-center gap-1">
            <span className="text-xs sm:text-sm">⟠</span>
            <span className="font-mono text-xs sm:text-sm font-medium text-white tabular-nums">
              {isBalanceLoading ? "-.--" : ethBalance}
            </span>
          </div>

          {/* Divider & Resources - only show after starter pack claimed */}
          {starterPackClaimed && !isLoading && (
            <>
              <div className="h-3 sm:h-4 w-px bg-white/20" />
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">{RESOURCE_CONFIG[Resource.PearlShard].icon}</span>
                <span className="font-mono text-xs sm:text-sm font-medium text-white tabular-nums">{pearlShards}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm">{RESOURCE_CONFIG[Resource.SpawnDust].icon}</span>
                <span className="font-mono text-xs sm:text-sm font-medium text-white tabular-nums">{spawnDust}</span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Wallet connect button */}
      <ConnectButton
        showBalance={false}
        chainStatus="none"
        accountStatus={{ smallScreen: "avatar", largeScreen: "full" }}
      />
    </div>
  );
}

