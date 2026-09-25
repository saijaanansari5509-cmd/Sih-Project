// ---------------------------------------------------------------------------
// AI ASSISTANT HELPERS
// ---------------------------------------------------------------------------
// Yahan 2 cheezein hain:
// 1. Scheme dataset ka ek compact summary jo hum AI ko context ke roop me dete hain.
//    (AI sirf isi list me se schemes suggest karega - naye schemes nahi banayega.)
// 2. Ek simple keyword-based fallback matcher jo BINA kisi API key ke chalta hai.
//    Isse app kabhi break nahi hota - agar AI available nahi to yeh use hota hai.
// ---------------------------------------------------------------------------

import { SCHEMES, type BusinessType, type SupportType } from "./schemes"

export interface AssistantSuggestion {
  schemeId: string
  reason: string
}

// AI ko dene ke liye chhota, saaf context.
export function schemeContext(): string {
  return SCHEMES.map((s) => {
    return [
      `id: ${s.id}`,
      `name: ${s.name}`,
      `about: ${s.shortDescription}`,
      `for: ${s.targetUsers}`,
      `businessTypes: ${s.businessTypes.join(", ")}`,
      `supportTypes: ${s.supportTypes.join(", ")}`,
      `benefits: ${s.benefits.join(" | ")}`,
    ].join("\n")
  }).join("\n---\n")
}

// Keywords -> attributes mapping (fallback ke liye).
const BUSINESS_KEYWORDS: Record<BusinessType, string[]> = {
  street_vendor: ["street", "vendor", "thela", "rehri", "patri", "footpath", "cart"],
  home_based: ["home", "ghar", "home-based", "homemade", "food", "achaar", "papad", "tiffin"],
  tailoring_artisan: ["tailor", "tailoring", "silai", "artisan", "handicraft", "craft", "weaver", "potter", "carpenter"],
  small_shop: ["shop", "dukaan", "store", "kirana", "retail"],
  repair_service: ["repair", "mechanic", "electrician", "plumber", "service", "cobbler", "barber"],
  other: [],
}

const SUPPORT_KEYWORDS: Record<SupportType, string[]> = {
  loan: ["loan", "credit", "paisa", "fund", "financial", "capital", "money", "karza", "karz"],
  machinery: ["machine", "machinery", "tool", "equipment", "auzaar", "toolkit"],
  training: ["training", "skill", "seekh", "learn", "course", "sikhna"],
  market_access: ["market", "sell", "bech", "customer", "online", "grahak"],
  subsidy: ["subsidy", "chhoot", "grant", "sarkari madad"],
}

// Bina AI ke, sirf text me keywords dhoond ke schemes rank karta hai.
export function keywordMatch(text: string): AssistantSuggestion[] {
  const lower = ` ${text.toLowerCase()} `

  const matchedBusiness = (Object.keys(BUSINESS_KEYWORDS) as BusinessType[]).filter((b) =>
    BUSINESS_KEYWORDS[b].some((k) => lower.includes(k)),
  )
  const matchedSupport = (Object.keys(SUPPORT_KEYWORDS) as SupportType[]).filter((s) =>
    SUPPORT_KEYWORDS[s].some((k) => lower.includes(k)),
  )

  const scored = SCHEMES.map((scheme) => {
    let score = 0
    const reasons: string[] = []

    for (const b of matchedBusiness) {
      if (scheme.businessTypes.includes(b)) {
        score += 2
      }
    }
    for (const s of matchedSupport) {
      if (scheme.supportTypes.includes(s)) {
        score += 3
        reasons.push("aapki maangi gayi madad se match karta hai")
      }
    }
    if (matchedBusiness.some((b) => scheme.businessTypes.includes(b))) {
      reasons.push("aapke business type ke liye relevant hai")
    }

    return { scheme, score, reason: reasons[0] ?? "aapki zaroorat ke hisaab se relevant ho sakti hai" }
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)

  // Agar kuch bhi match nahi hua to 2 sabse aam schemes suggest karo.
  if (scored.length === 0) {
    return [
      { schemeId: "pmmy-mudra", reason: "chhote business ke liye general purpose loan scheme" },
      { schemeId: "udyam-registration", reason: "free MSME registration se aur schemes ka fayda milta hai" },
    ]
  }

  return scored.map((r) => ({ schemeId: r.scheme.id, reason: r.reason }))
}
