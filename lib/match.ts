// ---------------------------------------------------------------------------
// MATCHING ENGINE (Rule based - NO fake AI random score)
// ---------------------------------------------------------------------------
// User ke 4 answers ko har scheme ke attributes se compare karte hain.
// Har matching cheez par points milte hain. Fir percentage nikaal ke rank karte hain.
//
//   Business type match  -> 40 points
//   Support/need match   -> 30 points
//   Income range match   -> 20 points
//   Document readiness   -> 10 points (optional / bonus)
//
// Yeh score sirf prototype ka "relevance score" hai - official eligibility NAHI.
// ---------------------------------------------------------------------------

import {
  SCHEMES,
  type Scheme,
  type BusinessType,
  type IncomeRange,
  type SupportType,
  type DocumentLevel,
} from "./schemes"

export interface Answers {
  business: BusinessType
  income: IncomeRange
  support: SupportType
  documents: DocumentLevel
}

export interface MatchResult {
  scheme: Scheme
  score: number // 0 - 100
  reasons: string[] // Why this matches (green ticks)
  gaps: string[] // Points to verify
}

const WEIGHTS = {
  business: 40,
  support: 30,
  income: 20,
  documents: 10,
}

// Document readiness ko ek simple number me convert karte hain
// taaki "user ke paas jitne documents hain" >= "scheme ko jitne chahiye" check ho sake.
const DOC_RANK: Record<DocumentLevel, number> = {
  none: 0,
  aadhaar_only: 1,
  other_id: 1,
  aadhaar_pan: 2,
}

export function scoreScheme(scheme: Scheme, answers: Answers): MatchResult {
  let earned = 0
  const reasons: string[] = []
  const gaps: string[] = []

  // 1) Business type
  const businessMatch = scheme.businessTypes.includes(answers.business)
  if (businessMatch) {
    earned += WEIGHTS.business
    reasons.push("Aapka business type is scheme se match karta hai")
  } else {
    gaps.push("Yeh scheme mukhya roop se doosre business types ke liye hai")
  }

  // 2) Support / need
  const supportMatch = scheme.supportTypes.includes(answers.support)
  if (supportMatch) {
    earned += WEIGHTS.support
    reasons.push("Aapko jo support chahiye, wo yeh scheme deti hai")
  } else {
    gaps.push("Aapki maangi gayi support is scheme ka main focus nahi hai")
  }

  // 3) Income range
  const incomeMatch = scheme.incomeRanges.includes(answers.income)
  if (incomeMatch) {
    earned += WEIGHTS.income
    reasons.push("Aapki income range is scheme ke liye suitable lagti hai")
  } else {
    gaps.push("Aapki income range is scheme ke typical range se alag ho sakti hai")
  }

  // 4) Documents (bonus / readiness)
  const hasEnoughDocs = DOC_RANK[answers.documents] >= DOC_RANK[scheme.minDocuments]
  if (hasEnoughDocs && answers.documents !== "none") {
    earned += WEIGHTS.documents
    reasons.push("Aapke paas zaroori basic documents mostly maujood hain")
  } else if (answers.documents === "none") {
    gaps.push("Apply karne ke liye kam se kam Aadhaar zaroori ho sakta hai")
  } else {
    gaps.push("Kuch extra documents (jaise PAN) chahiye ho sakte hain")
  }

  const total = WEIGHTS.business + WEIGHTS.support + WEIGHTS.income + WEIGHTS.documents
  const score = Math.round((earned / total) * 100)

  return { scheme, score, reasons, gaps }
}

// Sabhi schemes ko score karke high se low rank karta hai.
export function matchSchemes(answers: Answers): MatchResult[] {
  return SCHEMES.map((s) => scoreScheme(s, answers)).sort((a, b) => b.score - a.score)
}

// Home / results ke liye top N (relevant) results.
export function topMatches(answers: Answers, count = 3): MatchResult[] {
  return matchSchemes(answers)
    .filter((r) => r.score > 0)
    .slice(0, count)
}

// ---------------------------------------------------------------------------
// QUESTIONNAIRE CONFIG  (form ke sabhi questions + options yahin se aate hain)
// ---------------------------------------------------------------------------

export interface QuestionOption {
  value: string
  label: string
  hint?: string
}

export interface Question {
  id: keyof Answers
  title: string
  subtitle: string
  options: QuestionOption[]
}

export const QUESTIONS: Question[] = [
  {
    id: "business",
    title: "Aap kis type ka business karte hain?",
    subtitle: "What type of business do you run?",
    options: [
      { value: "street_vendor", label: "Street Vendor / Thela / Rehri" },
      { value: "home_based", label: "Home-based Business (ghar se)" },
      { value: "tailoring_artisan", label: "Tailoring / Artisan / Handicraft" },
      { value: "small_shop", label: "Small Shop (chhoti dukaan)" },
      { value: "repair_service", label: "Repair / Service Business" },
      { value: "other", label: "Other (koi aur)" },
    ],
  },
  {
    id: "income",
    title: "Aapki approx monthly income kitni hai?",
    subtitle: "What is your approximate monthly income?",
    options: [
      { value: "below_10k", label: "₹10,000 se kam" },
      { value: "10k_20k", label: "₹10,000 – ₹20,000" },
      { value: "20k_30k", label: "₹20,000 – ₹30,000" },
      { value: "above_30k", label: "₹30,000 se zyada" },
    ],
  },
  {
    id: "support",
    title: "Aapko kis tarah ki madad chahiye?",
    subtitle: "What kind of support do you need?",
    options: [
      { value: "loan", label: "Loan / Financial Support" },
      { value: "machinery", label: "Machinery / Tools" },
      { value: "training", label: "Training (skill seekhna)" },
      { value: "market_access", label: "Market Access (saman bechna)" },
      { value: "subsidy", label: "Subsidy (sarkari chhoot)" },
    ],
  },
  {
    id: "documents",
    title: "Aapke paas abhi kaunse documents / ID hain?",
    subtitle: "What documents / ID do you currently have?",
    options: [
      { value: "aadhaar_only", label: "Sirf Aadhaar" },
      { value: "aadhaar_pan", label: "Aadhaar + PAN" },
      { value: "other_id", label: "Koi aur Government ID" },
      { value: "none", label: "Abhi koi nahi" },
    ],
  },
]

// URL query params (?business=...&income=...) ko safe Answers me convert karta hai.
export function parseAnswers(params: {
  business?: string
  income?: string
  support?: string
  documents?: string
}): Answers | null {
  const valid = (id: keyof Answers, value?: string) => {
    const q = QUESTIONS.find((question) => question.id === id)
    return q?.options.some((o) => o.value === value)
  }
  if (
    valid("business", params.business) &&
    valid("income", params.income) &&
    valid("support", params.support) &&
    valid("documents", params.documents)
  ) {
    return {
      business: params.business as BusinessType,
      income: params.income as IncomeRange,
      support: params.support as SupportType,
      documents: params.documents as DocumentLevel,
    }
  }
  return null
}

export function labelFor(id: keyof Answers, value: string): string {
  const q = QUESTIONS.find((question) => question.id === id)
  return q?.options.find((o) => o.value === value)?.label ?? value
}
