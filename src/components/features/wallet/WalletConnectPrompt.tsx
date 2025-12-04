"use client";

import Image from "next/image";

export function WalletConnectPrompt() {
  return (
    <div className="flex flex-col items-center px-4">
      <Image
        src="/images/common/coral.webp"
        alt="Connect wallet"
        width={200}
        height={200}
        className="w-40 h-40 sm:w-60 sm:h-60 object-contain"
        priority
      />
      <p className="mt-6 sm:mt-8 text-center text-lg sm:text-xl text-slate-400 max-w-md">
        Connect wallet to start your underwater adventure
      </p>
    </div>
  );
}

