"use client";

import { CheckInCard } from "@/components/features/checkin/CheckInCard";
import { WalletHeader } from "@/components/features/wallet/WalletHeader";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Home() {
  return (
    <div className="min-h-screen bg-baseBg bg-linear-to-b from-slate-950 to-baseBg text-slate-100">
      <main className="container mx-auto flex min-h-screen flex-col px-4 py-6 sm:px-6 sm:py-10 lg:max-w-5xl">
        <PageHeader
          title="Based Analytics"
          description="Minimal onchain analytics playground on Base. Start with daily check-ins, then grow into badges, NFTs, and simple games."
          action={<WalletHeader />}
        />

        <section className="flex flex-1 items-start justify-center pb-10">
          <CheckInCard />
        </section>
      </main>
    </div>
  );
}
