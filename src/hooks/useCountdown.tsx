import { useEffect, useState } from "react";

// La tienda se renueva cada día a las 00:00 UTC
function msToNextReset() {
  const now = new Date();
  const next = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  );
  return next - now.getTime();
}

function format(ms: number) {
  const seconds = Math.floor(ms / 1000);
  return [seconds / 3600, (seconds % 3600) / 60, seconds % 60]
    .map((part) => String(Math.floor(part)).padStart(2, "0"))
    .join(":");
}

const useCountdown = (onReset: () => void) => {
  const [remaining, setRemaining] = useState(msToNextReset);

  useEffect(() => {
    let previous = msToNextReset();
    const id = setInterval(() => {
      const next = msToNextReset();
      if (next > previous) onReset();
      previous = next;
      setRemaining(next);
    }, 1000);
    return () => clearInterval(id);
  }, [onReset]);

  return format(remaining);
};

export default useCountdown;
