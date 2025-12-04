"use client";

import Image from "next/image";

export function WalletConnectPrompt() {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/images/fish/common.webp"
        alt="Connect wallet"
        width={180}
        height={180}
        className="w-48 h-48 sm:w-60 sm:h-60 object-contain"
        priority
      />
      <p className="text-center text-md text-slate-200 max-w-md">
        Connect wallet to start your underwater adventure
      </p>
    </div>
  );
}

