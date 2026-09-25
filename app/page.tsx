import Link from "next/link"
import {
  Search,
  ListChecks,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Store,
  Home as HomeIcon,
  Scissors,
  Wrench,
} from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import { SCHEMES } from "@/lib/schemes"

const STEPS = [
  {
    icon: ListChecks,
    title: "1. Kuch simple sawaal",
    text: "Apne business ke baare me 4 asaan sawaalon ke jawab dein - koi lambi form nahi.",
  },
  {
    icon: Search,
    title: "2. Smart matching",
    text: "Hum aapke jawaab ko schemes ke rules se milaate hain aur match score dikhaate hain.",
  },
  {
    icon: Sparkles,
    title: "3. Top schemes",
    text: "Sabse relevant 2-3 schemes, unke benefits, documents aur apply karne ka tareeka.",
  },
]

const AUDIENCE = [
  { icon: Store, label: "Street Vendor / Thela" },
  { icon: HomeIcon, label: "Home-based Business" },
  { icon: Scissors, label: "Tailor / Artisan" },
  { icon: Wrench, label: "Repair / Service" },
]

export default function HomePage() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-secondary/60 to-background">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Sarkari schemes, asaan bhaasha me
            </span>
            <h1 className="mt-5 text-pretty text-3xl font-extrabold leading-tight text-foreground sm:text-5xl">
              Apne business ke liye sahi Government Schemes dhoondein
            </h1>
            <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
              Kuch simple sawaalon ke jawab dein aur jaanein kaunsi sarkari schemes aapke liye relevant ho
              sakti hain - loan, subsidy, training ya machinery.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full text-base sm:w-auto">
                <Link href="/questionnaire">
                  Find My Schemes
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full text-base sm:w-auto">
                <Link href="/assistant">
                  <Sparkles className="size-5" />
                  AI Assistant se poochein
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Login ki zaroorat nahi - bilkul free aur simple.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {AUDIENCE.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card px-3 py-4 text-center"
              >
                <Icon className="size-6 text-primary" aria-hidden="true" />
                <span className="text-xs font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Kaise kaam karta hai?</h2>
          <p className="mt-2 text-muted-foreground">Sirf 3 asaan steps me apni schemes tak pahunchein.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats + CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-2xl border border-border bg-primary px-6 py-10 text-center text-primary-foreground sm:px-10">
          <p className="text-3xl font-extrabold sm:text-4xl">{SCHEMES.length}+ schemes</p>
          <p className="mt-2 text-primary-foreground/80">
            verified sarkari schemes ka database - loan, subsidy, training aur machinery ke liye.
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-6">
            <Link href="/questionnaire">
              Abhi shuru karein
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <Disclaimer />
      </section>
    </PageShell>
  )
}
