import Link from "next/link"
import { ArrowRight, ListChecks, Calculator, Sparkles, ShieldCheck } from "lucide-react"
import { PageShell } from "@/components/page-shell"
import { Disclaimer } from "@/components/disclaimer"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "How It Works - Yojana Sathi",
}

const POINTS = [
  {
    icon: ListChecks,
    title: "Simple questionnaire",
    text: "Hum aapse 4 asaan sawaal poochte hain: business type, monthly income, kaunsi madad chahiye, aur aapke paas kaunse documents hain.",
  },
  {
    icon: Calculator,
    title: "Transparent matching (koi fake score nahi)",
    text: "Har scheme ke fixed rules hain. Aapke jawaab match hone par points milte hain - Business 40, Support 30, Income 20, Documents 10. In points se match percentage banta hai.",
  },
  {
    icon: Sparkles,
    title: "Optional AI Assistant",
    text: "Aap normal bhaasha me apni zaroorat likh sakte hain. AI sirf hamare scheme database me se relevant schemes suggest karta hai - naye schemes ya rules khud nahi banata.",
  },
  {
    icon: ShieldCheck,
    title: "Awareness first, official verification zaroori",
    text: "Yeh sirf ek pehla guidance hai. Final eligibility aur latest details hamesha official government website se verify karni chahiye.",
  },
]

export default function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-extrabold text-foreground sm:text-4xl">How It Works</h1>
        <p className="mt-3 text-muted-foreground">
          Yojana Sathi ek SIH 2026 prototype hai jo chhote aur marginalized entrepreneurs ko relevant
          government schemes dhoondhne me madad karta hai - bina complicated bhaasha ke.
        </p>

        <div className="mt-8 space-y-4">
          {POINTS.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-foreground">Match score ka matlab</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-semibold text-emerald-700">75% se upar</span> - strong match, aapke jawaab
              is scheme se kaafi milte hain.
            </li>
            <li>
              <span className="font-semibold text-amber-700">45% - 74%</span> - possible match, details padh
              ke check karein.
            </li>
            <li>
              <span className="font-semibold text-slate-600">45% se kam</span> - low match, shayad kam
              relevant hai.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Yeh prototype relevance score hai - official government eligibility nahi.
          </p>
        </div>

        <div className="mt-8">
          <Disclaimer />
        </div>

        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/questionnaire">
              Find My Schemes
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
