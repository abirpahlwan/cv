'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate }: { targetDate: string }) {
  const target = new Date(targetDate).getTime()
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)

  useEffect(() => {
    setTimeLeft(getTimeLeft(target))
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(target))
    }, 1000)
    return () => clearInterval(interval)
  }, [target])

  const units: { label: string; value: number }[] = [
    { label: 'Days', value: timeLeft?.days ?? 0 },
    { label: 'Hours', value: timeLeft?.hours ?? 0 },
    { label: 'Minutes', value: timeLeft?.minutes ?? 0 },
    { label: 'Seconds', value: timeLeft?.seconds ?? 0 },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" aria-live="polite">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="flex flex-col items-center justify-center rounded-xl border border-neutral-800 bg-neutral-800/50 p-6"
        >
          <span className="text-4xl md:text-6xl font-bold tabular-nums text-white">
            {timeLeft ? String(unit.value).padStart(2, '0') : '--'}
          </span>
          <span className="mt-2 text-sm font-medium uppercase tracking-wide text-neutral-400">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
