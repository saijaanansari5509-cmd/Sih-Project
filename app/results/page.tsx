import Link from "next/link"
import { ArrowLeft, Sparkles, SearchX } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Disclaimer } from "@/components/disclaimer"
import { SchemeResultCard } from "@/components/scheme-result-card"
import { Button } from "@/components/ui/button"
import { parseAnswers, topMatches, labelFor } from "@/lib/match"

export const metadata = {
  title: "Aapke liye recommended schemes - Yojana Sathi",
}

type SearchParams = Promise<{
  business?: string
  income?: string
  support?: string
  documents?: string
}>

export default async function ResultsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const answers = parseAnswers(params)

  if (!answers) {
    return (
      <PageShell>
        <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
          <SearchX className="size-12 text-muted-foreground" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-foreground">Answers nahi mile</h1>
          <p className="mt-2 text-muted-foreground">
            Lagta hai aapne abhi questionnaire complete nahi kiya. Kripya sawaalon ke jawab dein.
          </p>
          <Button asChild className="mt-6" size="lg">
            <Link href="/questionnaire">Questionnaire shuru karein</Link>
          </Button>
        </section>
      </PageShell>
    )
  }

  const results = topMatches(answers, 3)

  const summary = [
    labelFor("business", answers.business),
    labelFor("income", answers.income),
    labelFor("support", answers.support),
  ]

  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link href="/questionnaire">
            <ArrowLeft className="size-4" />
            Jawab badlein
          </Link>
        </Button>

        <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">Aapke liye top schemes</h1>
        <p className="mt-2 text-muted-foreground">
          Aapke jawaab ke aadhaar par yeh schemes sabse zyada relevant lagti hain.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {summary.map((s) => (
            <span
              key={s}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <Disclaimer />
        </div>

        {results.length > 0 ? (
          <div className="mt-6 space-y-5">
            {results.map((result, i) => (
              <SchemeResultCard key={result.scheme.id} result={result} rank={i + 1} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-xl border border-border bg-card p-8 text-center">
            <p className="text-foreground">
              Aapke exact jawaab se koi strong match nahi mila. Aap AI Assistant se detail me poochein.
            </p>
          </div>
        )}

        <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-6 text-center">
          <Sparkles className="mx-auto size-7 text-primary" aria-hidden="true" />
          <h2 className="mt-2 text-lg font-semibold text-foreground">Aur madad chahiye?</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Apni situation apne shabdon me likhein aur AI Assistant se personalised suggestion lein.
          </p>
          <Button asChild className="mt-4">
            <Link href="/assistant">
              <Sparkles className="size-4" />
              AI Assistant kholein
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
