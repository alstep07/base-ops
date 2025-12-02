# Project Structure

This document describes the project structure and organization following best practices.

## Directory Structure

```
based-repo/
├── contracts/              # Solidity smart contracts
│   └── DailyCheckIn.sol
├── deploy/                 # Hardhat deployment scripts
│   └── 001_deploy_daily_checkin.js
├── deployments/            # Deployment artifacts (generated)
│   └── baseSepolia/
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/        # React components
│   │   ├── features/      # Feature-specific components
│   │   │   ├── checkin/   # Check-in feature components
│   │   │   └── wallet/    # Wallet feature components
│   │   └── ui/            # Reusable UI components
│   ├── contracts/         # Contract configurations (ABI, types, addresses)
│   │   ├── dailyCheckIn.ts
│   │   └── index.ts
│   ├── constants/         # Application constants
│   │   └── config.ts
│   ├── hooks/             # Custom React hooks
│   │   └── useOnchainCheckIn.ts
│   ├── lib/               # Library code and utilities
│   │   ├── web3.tsx       # Web3 providers setup
│   │   └── contracts.ts   # Contract utilities
│   └── utils/             # Utility functions (if needed)
├── public/                # Static assets
├── hardhat.config.js      # Hardhat configuration
└── package.json
```

## Best Practices

### 1. Contracts (`src/contracts/`)
- **Purpose**: Centralized contract configuration
- **Contents**: ABI, TypeScript types, contract addresses
- **Naming**: One file per contract (e.g., `dailyCheckIn.ts`)
- **Exports**: Use `index.ts` for centralized exports

### 2. Components (`src/components/`)
- **Features**: Feature-specific components grouped by domain
- **UI**: Reusable, generic UI components
- **Naming**: PascalCase, descriptive names

### 3. Hooks (`src/hooks/`)
- **Purpose**: Custom React hooks for business logic
- **Naming**: `use` prefix (e.g., `useOnchainCheckIn`)
- **Separation**: One hook per feature/concern

### 4. Lib (`src/lib/`)
- **Purpose**: Shared utilities and configurations
- **Examples**: Web3 setup, contract helpers, API clients

### 5. Constants (`src/constants/`)
- **Purpose**: Application-wide constants
- **Examples**: Network configs, environment keys, magic numbers

## Contract Integration

### Adding a New Contract

1. **Deploy the contract** using Hardhat
2. **Create contract config** in `src/contracts/yourContract.ts`:
   ```typescript
   export const yourContractAbi = [...] as const;
   export const YOUR_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_YOUR_CONTRACT_ADDRESS;
   export interface YourContractType { ... }
   ```
3. **Export from** `src/contracts/index.ts`
4. **Use in hooks** via imports from `@/contracts`

## Environment Variables

- **`.env`**: Server-side secrets (private keys, RPC URLs)
- **`.env.local`**: Client-side public config (contract addresses, API keys)

## Type Safety

- All contract ABIs use `as const` for type inference
- TypeScript interfaces for all contract structs
- Proper typing for addresses (`0x${string}`)

