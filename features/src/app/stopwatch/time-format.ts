const MS_PER_SECOND = 1000;

/** Format milliseconds as mm:ss.cs (centiseconds, two digits). */
export function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / MS_PER_SECOND);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % MS_PER_SECOND) / 10);
  return `${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}

function pad(value: number): string {
  return value.toString().padStart(2, '0');
}