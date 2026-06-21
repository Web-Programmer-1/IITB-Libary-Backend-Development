"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OVERDUE_FINE_PER_DAY = void 0;
exports.calculateOverdueDays = calculateOverdueDays;
exports.calculateOverdueFine = calculateOverdueFine;
exports.OVERDUE_FINE_PER_DAY = 50;
const DAY_IN_MS = 1000 * 60 * 60 * 24;
function calculateOverdueDays(dueDate, asOf = new Date()) {
    return Math.max(0, Math.ceil((asOf.getTime() - dueDate.getTime()) / DAY_IN_MS));
}
function calculateOverdueFine(dueDate, asOf = new Date()) {
    return calculateOverdueDays(dueDate, asOf) * exports.OVERDUE_FINE_PER_DAY;
}
//# sourceMappingURL=circulation.constants.js.map