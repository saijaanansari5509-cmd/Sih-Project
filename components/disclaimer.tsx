import { Info } from "lucide-react"
import { cn } from "@/lib/utils"

export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900",
        className,
      )}
      role="note"
    >
      <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p className="text-sm leading-relaxed">
        <span className="font-semibold">Zaroori soochna:</span> Yeh platform sirf awareness ke liye
        preliminary recommendations deta hai aur official eligibility decide nahi karta. Kripya final
        eligibility aur latest scheme details official government source se zaroor verify karein.
      </p>
    </div>
  )
}
