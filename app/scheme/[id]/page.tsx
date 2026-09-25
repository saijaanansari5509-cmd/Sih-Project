import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  ExternalLink,
  Users,
  Gift,
  FileText,
  ClipboardList,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"
import { SCHEMES, getSchemeById } from "@/lib/schemes"

export function generateStaticParams() {
  return SCHEMES.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scheme = getSchemeById(id)
  return { title: scheme ? `${scheme.name} - Yojana Sathi` : "Scheme not found" }
}

function InfoList({
  icon: Icon,
  title,
  items,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  items: string[]
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold text-foreground">
        <Icon className="size-5 text-primary" aria-hidden="true" />
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default async function SchemeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const scheme = getSchemeById(id)
  if (!scheme) notFound()

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-4 py-10">
        <Button asChild variant="ghost" size="sm" className="mb-4 -ml-2">
          <Link href="/questionnaire">
            <ArrowLeft className="size-4" />
            Wapas
          </Link>
        </Button>

        <header>
          <h1 className="text-3xl font-extrabold text-foreground text-balance">{scheme.name}</h1>
          <p className="mt-2 text-muted-foreground">{scheme.shortDescription}</p>
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" aria-hidden="true" />
            <span>{scheme.targetUsers}</span>
          </div>
        </header>

        <div className="mt-6">
          <Button asChild size="lg">
            <a href={scheme.officialUrl} target="_blank" rel="noopener noreferrer">
              Official website kholein
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">Source: {scheme.officialName}</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <InfoList icon={Gift} title="Benefits (faayde)" items={scheme.benefits} />
          <InfoList icon={ClipboardList} title="Basic Eligibility" items={scheme.eligibility} />
          <InfoList icon={FileText} title="Required Documents" items={scheme.documents} />
          <InfoList icon={ClipboardList} title="Kaise apply karein" items={scheme.howToApply} />
        </div>

        <div className="mt-4 flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm">
            <span className="font-semibold">Verify karein:</span> {scheme.verifyNote}
          </p>
        </div>

        <div className="mt-6">
          <Disclaimer />
        </div>
      </article>
    </PageShell>
  )
}
