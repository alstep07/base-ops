"use client";

interface CheckInInfoProps {
  address: string;
  lastCheckIn: string | null;
}

export function CheckInInfo({ address, lastCheckIn }: CheckInInfoProps) {
  const formattedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  const formattedDate = lastCheckIn
    ? new Date(lastCheckIn).toLocaleString()
    : "No check-ins yet";

  return (
    <div className="space-y-1">
      <p className="mb-1 text-slate-300">
        Wallet: <span className="font-mono text-slate-100">{formattedAddress}</span>
      </p>
      <p className="mb-4 text-slate-400">Last check-in: {formattedDate}</p>
    </div>
  );
}

