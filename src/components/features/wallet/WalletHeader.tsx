"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BalanceDisplay } from "./BalanceDisplay";

export function WalletHeader() {
  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <ConnectButton
        showBalance={false}
        chainStatus="none"
      />
      <BalanceDisplay />
    </div>
  );
}

