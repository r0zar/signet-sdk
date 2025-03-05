"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
/**
 * Generates a random ID string
 */
function generateId() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}
