/**
 * Utility functions for check-in functionality
 */

const STORAGE_PREFIX = "checkin";

export function getCheckInKey(address: string): string {
  return `${STORAGE_PREFIX}-${address.toLowerCase()}`;
}

export function saveCheckIn(address: string): string {
  const now = new Date().toISOString();
  const key = getCheckInKey(address);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, now);
  }
  return now;
}

export function getCheckIn(address: string): string | null {
  if (typeof window === "undefined") return null;
  const key = getCheckInKey(address);
  return window.localStorage.getItem(key);
}

export function isTodayCheckedIn(address: string): boolean {
  const lastCheckIn = getCheckIn(address);
  if (!lastCheckIn) return false;

  const last = new Date(lastCheckIn).toDateString();
  const today = new Date().toDateString();
  return last === today;
}

