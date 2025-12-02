import { getCheckIn, isTodayCheckedIn } from "@/utils/checkin";

export function useDailyCheckIn(address?: string, version: number = 0) {
  // touch version so React knows this hook depends on it
  void version;

  if (!address || typeof window === "undefined") {
    return { lastCheckIn: null as string | null, todayCheckedIn: false };
  }

  const lastCheckIn = getCheckIn(address);

  if (!lastCheckIn) {
    return { lastCheckIn: null as string | null, todayCheckedIn: false };
  }

  const todayCheckedIn = isTodayCheckedIn(address);

  return { lastCheckIn, todayCheckedIn };
}


