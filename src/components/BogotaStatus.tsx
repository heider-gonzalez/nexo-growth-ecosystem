import { useEffect, useState } from "react";

const TIME_ZONE = "America/Bogota";
const OPEN_HOUR = 8;
const CLOSE_HOUR = 18;

interface Status {
  time: string;
  open: boolean;
  message: string;
}

function readStatus(): Status {
  const now = new Date();

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);

  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const time = new Intl.DateTimeFormat("es-CO", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(now);

  const isSunday = weekday === "Sun";
  const open = !isSunday && hour >= OPEN_HOUR && hour < CLOSE_HOUR;

  if (open) return { time, open, message: "Estamos atendiendo." };

  let when = "mañana";
  if (!isSunday && hour < OPEN_HOUR) when = "hoy";
  else if (weekday === "Sat") when = "el lunes";

  return { time, open, message: `Te respondemos ${when} desde las 8:00 a. m.` };
}

export function BogotaStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(readStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={className}>
      <span aria-hidden="true" className="relative mr-2 inline-flex h-2 w-2 align-middle">
        {status?.open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            status?.open ? "bg-emerald-400" : "bg-slate-500"
          }`}
        />
      </span>
      {status
        ? `Barranquilla, ${status.time}${status.time.endsWith(".") ? " " : ". "}${status.message}`
        : "Barranquilla, Colombia."}
    </p>
  );
}

export default BogotaStatus;
