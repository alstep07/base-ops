"use client";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";

// Basic config for Base & Base Sepolia following Base Learn stack
// See: `https://docs.base.org/learn/welcome`
const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? "YOUR_WALLETCONNECT_PROJECT_ID";

// Singleton pattern to prevent multiple WalletConnect Core initializations
let config: ReturnType<typeof getDefaultConfig> | null = null;

function getConfig() {
  if (!config) {
    config = getDefaultConfig({
      appName: "FryReef",
      projectId,
      chains: [base, baseSepolia],
      ssr: true,
    });
  }
  return config;
}

// Singleton QueryClient
let queryClient: QueryClient | null = null;

function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1 minute
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return queryClient;
}

export const wagmiConfig = getConfig();

export function Web3Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={getConfig()}>
      <QueryClientProvider client={getQueryClient()}>
        <RainbowKitProvider
          modalSize="compact"
          initialChain={baseSepolia}
          coolMode
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}


