const eventTime = Date.parse('2026-09-26T15:00:00-05:00');
export function countdown(now) {
  const seconds = Math.max(0, Math.floor((eventTime - now) / 1000));
  return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
}
