export const OVERDUE_FINE_PER_DAY = 50;

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function calculateOverdueDays(dueDate: Date, asOf: Date = new Date()) {
  return Math.max(0, Math.ceil((asOf.getTime() - dueDate.getTime()) / DAY_IN_MS));
}

export function calculateOverdueFine(dueDate: Date, asOf: Date = new Date()) {
  return calculateOverdueDays(dueDate, asOf) * OVERDUE_FINE_PER_DAY;
}
