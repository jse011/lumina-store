/**
 * Formats a given number of seconds into a MM:SS string.
 * @param totalSeconds Number of seconds to format
 * @returns Formatted string (e.g., "04:59")
 */
export function formatTimeMMSS(totalSeconds: number): string {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}
