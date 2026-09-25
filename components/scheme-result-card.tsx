import Link from "next/link"
import { Check, ChevronRight } from "lucide-react"
import type { MatchResult } from "@/lib/match"
import { MatchBadge } from "@/components/match-badge"
import { Button } from "@/components/ui/button"

export function SchemeResultCard({ result, rank }: { result: MatchResult; rank?: number }) {
  const { scheme, score, reasons } = result

  return (
    <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {rank != null && (
            <span className="mb-1 inline-block rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              #{rank} Recommended
            </span>
          )}
          <h3 className="text-lg font-bold leading-snug text-foreground text-balance">{scheme.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{scheme.shortDescription}</p>
        </div>
        <div className="shrink-0">
          <MatchBadge score={score} />
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Yeh scheme kyun match karti hai
        </p>
        <ul className="mt-2 space-y-1.5">
          {reasons.length > 0 ? (
            reasons.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))
          ) : (
            <li className="text-sm text-muted-foreground">
              Aapke answers se limited match hai - details zaroor padhein.
            </li>
          )}
        </ul>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button asChild>
          <Link href={`/scheme/${scheme.id}`}>
            Scheme details dekhein
            <ChevronRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
            Official website
          </a>
        </Button>
      </div>
    </article>
  )
}
