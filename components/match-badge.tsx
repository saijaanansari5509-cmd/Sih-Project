import { cn } from "@/lib/utils"

function tone(score: number) {
  if (score >= 75) return { text: "text-emerald-700", ring: "text-emerald-500", label: "Strong match" }
  if (score >= 45) return { text: "text-amber-700", ring: "text-amber-500", label: "Possible match" }
  return { text: "text-slate-600", ring: "text-slate-400", label: "Low match" }
}

export function MatchBadge({ score, size = 72 }: { score: number; size?: number }) {
  const t = tone(score)
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="flex flex-col items-center" aria-label={`${score} percent match`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-secondary"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={t.ring}
          />
        </svg>
        <span className={cn("absolute inset-0 flex items-center justify-center text-lg font-bold", t.text)}>
          {score}%
        </span>
      </div>
      <span className={cn("mt-1 text-xs font-medium", t.text)}>{t.label}</span>
    </div>
  )
}
