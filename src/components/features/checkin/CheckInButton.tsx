"use client";

import { LiquidGlassButton } from "@/components/ui/LiquidGlassButton";

interface CheckInButtonProps {
  onCheckIn: () => void;
  isCheckedIn: boolean;
  disabled?: boolean;
}

export function CheckInButton({
  onCheckIn,
  isCheckedIn,
  disabled = false,
}: CheckInButtonProps) {
  return (
    <LiquidGlassButton
      onClick={onCheckIn}
      disabled={disabled || isCheckedIn}
      variant="primary"
    >
      {isCheckedIn ? "Checked in for today" : "Check in for today"}
    </LiquidGlassButton>
  );
}

