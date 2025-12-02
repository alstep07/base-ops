"use client";

import { useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useChainId,
  useSwitchChain,
} from "wagmi";
import { baseSepolia } from "wagmi/chains";
import {
  dailyCheckInAbi,
  DAILY_CHECK_IN_ADDRESS,
  isContractConfigured,
  type UserInfo,
} from "@/contracts/dailyCheckIn";
import { DEFAULT_CHAIN_ID } from "@/lib/contracts";

export function useOnchainCheckIn(address?: string) {
  const { address: connectedAddress, chainId: currentChainId } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const userAddress = (address || connectedAddress) as
    | `0x${string}`
    | undefined;

  const isOnCorrectNetwork = (currentChainId || chainId) === baseSepolia.id;

  const isConfigured = isContractConfigured();
  const contractAddress = isConfigured
    ? (DAILY_CHECK_IN_ADDRESS as `0x${string}`)
    : undefined;

  // Read user info - only on correct network
  const {
    data: userInfo,
    isLoading,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: dailyCheckInAbi,
    functionName: "getUserInfo",
    args: userAddress ? [userAddress] : undefined,
    chainId: DEFAULT_CHAIN_ID,
    query: {
      enabled: !!userAddress && !!contractAddress && isOnCorrectNetwork,
    },
  }) as { data: UserInfo | undefined; isLoading: boolean; refetch: () => void };

  // Check if checked in today - only on correct network
  const { data: checkedInToday } = useReadContract({
    address: contractAddress,
    abi: dailyCheckInAbi,
    functionName: "hasCheckedInToday",
    args: userAddress ? [userAddress] : undefined,
    chainId: DEFAULT_CHAIN_ID,
    query: {
      enabled: !!userAddress && !!contractAddress && isOnCorrectNetwork,
    },
  }) as { data: boolean | undefined };

  // Write check-in
  const {
    writeContract,
    data: hash,
    isPending: isWriting,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    chainId: DEFAULT_CHAIN_ID,
  });

  const checkIn = async () => {
    if (!contractAddress || !userAddress) return;

    // Switch to Base Sepolia if on wrong network
    if (!isOnCorrectNetwork) {
      try {
        await switchChain({ chainId: baseSepolia.id });
        return;
      } catch (error) {
        console.error("Failed to switch network:", error);
        return;
      }
    }

    try {
      writeContract({
        address: contractAddress,
        abi: dailyCheckInAbi,
        functionName: "checkIn",
        chainId: DEFAULT_CHAIN_ID,
      });
    } catch (error) {
      console.error("Check-in error:", error);
    }
  };

  const switchToBaseSepolia = async () => {
    try {
      await switchChain({ chainId: baseSepolia.id });
    } catch (error) {
      console.error("Failed to switch network:", error);
    }
  };

  // Refetch after successful transaction
  useEffect(() => {
    if (isSuccess && hash) {
      const timer = setTimeout(() => {
        refetch();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, hash, refetch]);

  return {
    lastCheckInTimestamp: userInfo?.lastCheckIn
      ? Number(userInfo.lastCheckIn)
      : null,
    totalCount: userInfo?.totalCheckIns ? Number(userInfo.totalCheckIns) : 0,
    currentMonthStreak: userInfo?.currentMonthStreak
      ? Number(userInfo.currentMonthStreak)
      : 0,
    bestMonthStreak: userInfo?.bestMonthStreak
      ? Number(userInfo.bestMonthStreak)
      : 0,
    checkedInToday: checkedInToday ?? false,
    isLoading: isLoading || isConfirming,
    isWriting,
    checkIn,
    isSuccess,
    error: writeError ? (writeError as Error) : null,
    isOnCorrectNetwork,
    switchToBaseSepolia,
  };
}
