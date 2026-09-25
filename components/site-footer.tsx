import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-foreground">Yojana Sathi</p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Ek prototype jo chhote aur marginalized entrepreneurs ko sahi government schemes dhoondhne me
            madad karta hai.
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm font-semibold text-foreground">Quick Links</p>
          <div className="mt-2 flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
            <Link href="/questionnaire" className="hover:text-foreground">
              Find My Scheme
            </Link>
            <Link href="/assistant" className="hover:text-foreground">
              AI Assistant
            </Link>
            <Link href="/about" className="hover:text-foreground">
              How It Works
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4">
        <p className="mx-auto max-w-6xl text-center text-xs text-muted-foreground">
          SIH 2026 prototype - JB Institute of Technology (JBIT), Dehradun. Yeh koi official government portal
          nahi hai.
        </p>
      </div>
    </footer>
  )
}
