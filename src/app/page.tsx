"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { GameDashboard } from "@/components/features/game/GameDashboard";
import { WalletHeader } from "@/components/features/wallet/WalletHeader";
import { WalletConnectPrompt } from "@/components/features/wallet/WalletConnectPrompt";
import { MobileResourceBar } from "@/components/features/wallet/MobileResourceBar";
import { PageHeader } from "@/components/ui/PageHeader";
import { BubbleAnimation } from "@/components/ui/BubbleAnimation";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  const { isConnected, isConnecting, isReconnecting } = useAccount();
  const [showLoader, setShowLoader] = useState(true);

  // Timeout to prevent infinite loader - max 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    // Clear loader immediately if connection state is resolved
    if (!isConnecting && !isReconnecting) {
      setShowLoader(false);
    }

    return () => clearTimeout(timer);
  }, [isConnecting, isReconnecting]);

  // Show loading state while connecting (with timeout protection)
  const isLoading = showLoader && (isConnecting || isReconnecting);

  return (
    <div className="relative flex min-h-dvh flex-col text-slate-100 overflow-hidden">
      <BubbleAnimation />
      <main className="relative z-10 container mx-auto flex flex-1 flex-col px-4 pt-[calc(env(safe-area-inset-top)+1rem)] pb-6 sm:px-6 sm:pt-10 sm:pb-10 lg:max-w-5xl">
        <PageHeader
          title="FryReef"
          description="Breed, merge, evolve on Base"
          action={<WalletHeader />}
        />
        <MobileResourceBar />
        <section className={`flex flex-1 justify-center pt-6 sm:pt-8 pb-10 ${isConnected ? "items-start" : "items-center"}`}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-baseBlue" />
            </div>
          ) : !isConnected ? (
            <WalletConnectPrompt />
          ) : (
            <GameDashboard />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
