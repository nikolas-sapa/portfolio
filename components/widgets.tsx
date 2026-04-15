"use client";

import { useState, useEffect } from "react";

function useAthensTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Europe/Athens",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function useAthensTemp() {
  const [temp, setTemp] = useState<number | null>(null);
  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.73&current=temperature_2m"
    )
      .then((r) => r.json())
      .then((d) => setTemp(Math.round(d.current.temperature_2m)))
      .catch(() => {});
  }, []);
  return temp;
}

export function TitleBarWidgets() {
  const time = useAthensTime();
  const temp = useAthensTemp();

  return (
    <div className="flex items-center gap-2.5 flex-none select-none">
      {temp !== null && (
        <span className="hidden sm:block text-[11px] text-[#86868b]">
          {temp}°C
        </span>
      )}
      {time && (
        <span className="text-[11px] font-medium text-[#3d3d3d] tabular-nums">
          {time}
        </span>
      )}
    </div>
  );
}
