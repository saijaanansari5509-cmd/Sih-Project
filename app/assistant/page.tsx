"use client"

import { useState } from "react"
import Link from "next/link"
import { Sparkles, Send, Loader2, ExternalLink, ChevronRight, Info } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"

interface Suggestion {
  id: string
  name: string
  shortDescription: string
  officialUrl: string
  reason: string
}

interface AssistantResponse {
  intro: string
  suggestions: Suggestion[]
  mode: "ai" | "offline"
}

const EXAMPLES = [
  "Main Uttarakhand me chhota tailoring ka kaam karti hoon aur business badhane ke liye loan chahiye.",
  "Main sabzi ka thela lagata hoon, mujhe kaam ke liye thoda paisa chahiye.",
  "Ghar se achaar aur papad banati hoon, machine aur training chahiye.",
]

export default function AssistantPage() {
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [result, setResult] = useState<AssistantResponse | null>(null)

  async function submit(text: string) {
    const query = text.trim()
    if (!query || loading) return
    setLoading(true)
    setError("")
    setResult(null)
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      })
      if (!res.ok) throw new Error("Request failed")
      const data = (await res.json()) as AssistantResponse
      setResult(data)
    } catch {
      setError("Kuch gadbad ho gayi. Kripya dobara try karein.")
    } finally {
      setLoading(false)
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    submit(message)
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-2xl px-4 py-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground sm:text-3xl">AI Scheme Assistant</h1>
            <p className="text-sm text-muted-foreground">
              Apni zaroorat apne shabdon me likhein - hum relevant schemes suggest karenge.
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6">
          <label htmlFor="message" className="sr-only">
            Apni zaroorat likhein
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                e.preventDefault()
                submit(message)
              }
            }}
            rows={4}
            placeholder="Example: Main chhoti kirana dukaan chalata hoon aur stock ke liye loan chahiye..."
            className="w-full resize-none rounded-xl border-2 border-border bg-card p-4 text-base text-foreground outline-none transition-colors focus:border-primary"
          />
          <div className="mt-3 flex justify-end">
            <Button type="submit" size="lg" disabled={loading || !message.trim()}>
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Soch raha hoon...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Schemes suggest karein
                </>
              )}
            </Button>
          </div>
        </form>

        {!result && !loading && (
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Ya inme se koi try karein
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {EXAMPLES.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setMessage(ex)
                    submit(ex)
                  }}
                  className="rounded-lg border border-border bg-card px-4 py-3 text-left text-sm text-foreground hover:border-primary/40 hover:bg-secondary/50"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-8">
            {result.mode === "offline" && (
              <div className="mb-4 flex items-start gap-2 rounded-lg border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0" />
                <span>
                  AI service abhi available nahi hai, isliye simple keyword matching se suggestions dikha rahe
                  hain. Matching system phir bhi kaam kar raha hai.
                </span>
              </div>
            )}
            <p className="text-base font-medium text-foreground">{result.intro}</p>

            <div className="mt-4 space-y-4">
              {result.suggestions.length > 0 ? (
                result.suggestions.map((s) => (
                  <article key={s.id} className="rounded-xl border border-border bg-card p-5">
                    <h2 className="text-lg font-bold text-foreground">{s.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{s.shortDescription}</p>
                    <p className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                      <Sparkles className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      <span>
                        <span className="font-semibold">Kyun: </span>
                        {s.reason}
                      </span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button asChild>
                        <Link href={`/scheme/${s.id}`}>
                          Details dekhein
                          <ChevronRight className="size-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <a href={s.officialUrl} target="_blank" rel="noopener noreferrer">
                          Official website
                          <ExternalLink className="size-4" />
                        </a>
                      </Button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground">
                  Koi clear match nahi mila. Kripya thoda aur detail me likhein (business type aur kaunsi madad
                  chahiye).
                </p>
              )}
            </div>

            <div className="mt-6">
              <Disclaimer />
            </div>
          </div>
        )}

        {!result && (
          <div className="mt-8">
            <Disclaimer />
          </div>
        )}
      </section>
    </PageShell>
  )
}
