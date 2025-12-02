/**
 * DailyCheckIn Contract Configuration
 * @fileoverview ABI, types, and configuration for the DailyCheckIn smart contract
 */

import type { Abi } from "viem";

/**
 * Contract ABI
 * Generated from compiled contract
 */
export const dailyCheckInAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "currentStreak",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bestStreak",
        type: "uint256",
      },
    ],
    name: "CheckedIn",
    type: "event",
  },
  {
    inputs: [],
    name: "checkIn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getUserInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "lastCheckIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "totalCheckIns",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentMonthStreak",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bestMonthStreak",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "currentMonthStart",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "bestMonthTimestamp",
            type: "uint256",
          },
        ],
        internalType: "struct DailyCheckIn.UserInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "hasCheckedInToday",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

/**
 * UserInfo struct from contract
 */
export interface UserInfo {
  lastCheckIn: bigint;
  totalCheckIns: bigint;
  currentMonthStreak: bigint;
  bestMonthStreak: bigint;
  currentMonthStart: bigint;
  bestMonthTimestamp: bigint;
}

/**
 * Contract address configuration
 * Set via NEXT_PUBLIC_CHECK_IN_CONTRACT_ADDRESS environment variable
 */
export const DAILY_CHECK_IN_ADDRESS = (
  process.env.NEXT_PUBLIC_CHECK_IN_CONTRACT_ADDRESS || ""
) as `0x${string}` | "";

/**
 * Check if contract is configured
 */
export const isContractConfigured = (): boolean => {
  return !!DAILY_CHECK_IN_ADDRESS && DAILY_CHECK_IN_ADDRESS.startsWith("0x");
};

