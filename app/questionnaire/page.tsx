"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, ChevronLeft, ChevronRight } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Button } from "@/components/ui/button"
import { QUESTIONS } from "@/lib/match"
import { cn } from "@/lib/utils"

export default function QuestionnairePage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const question = QUESTIONS[step]
  const total = QUESTIONS.length
  const selected = answers[question.id]
  const progress = useMemo(() => Math.round(((step + 1) / total) * 100), [step, total])

  function choose(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }))
  }

  function next() {
    if (!selected) return
    if (step < total - 1) {
      setStep((s) => s + 1)
      return
    }
    const params = new URLSearchParams(answers as Record<string, string>)
    router.push(`/results?${params.toString()}`)
  }

  function back() {
    if (step > 0) setStep((s) => s - 1)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-10">
        {/* Progress */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Sawaal {step + 1} / {total}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl text-balance">{question.title}</h1>
          <p className="mt-1 text-muted-foreground">{question.subtitle}</p>
        </div>

        <fieldset className="mt-6 space-y-3">
          <legend className="sr-only">{question.subtitle}</legend>
          {question.options.map((opt) => {
            const isSelected = selected === opt.value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(opt.value)}
                aria-pressed={isSelected}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl border-2 p-4 text-left transition-colors",
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40 hover:bg-secondary/50",
                )}
              >
                <span className="text-base font-medium text-foreground">{opt.label}</span>
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2",
                    isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                >
                  {isSelected && <Check className="size-4" />}
                </span>
              </button>
            )
          })}
        </fieldset>

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            <ChevronLeft className="size-4" />
            Peeche
          </Button>
          <Button onClick={next} disabled={!selected} size="lg">
            {step < total - 1 ? "Aage" : "Schemes dekhein"}
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
