import { api } from "../api/api";

const PAST_STATUSES = ["COMPLETED", "CANCELLED"];

export async function autoCompleteBookings(bookings: any[]): Promise<string[]> {
  const now = new Date();
  const DELAY_HOURS = 2;
  const delayMs = DELAY_HOURS * 60 * 60 * 1000;
  
  const thresholdDate = new Date(now.getTime() - delayMs);
  const completedIds: string[] = [];

  const tasks = bookings
    .filter((b) => {
      if (PAST_STATUSES.includes(b.status?.toUpperCase())) return false;
      const rawDate = b.start_date || (b.date && b.time ? `${b.date}T${b.time}:00` : null);
      if (!rawDate) return false;

      return new Date(rawDate) < thresholdDate;
    })
    .map(async (b) => {
      try {
        await api.updateBookingStatus(b.id, "COMPLETED");
        completedIds.push(b.id);
      } catch {
      }
    });

  await Promise.all(tasks);
  return completedIds;
}