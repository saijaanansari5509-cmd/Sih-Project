import { generateText, Output } from "ai"
import { z } from "zod"
import { getSchemeById } from "@/lib/schemes"
import { schemeContext, keywordMatch, type AssistantSuggestion } from "@/lib/assistant"

// Yeh API user ki likhi hui zaroorat lekar hamare scheme dataset me se
// relevant schemes suggest karti hai.
//
// - Pehle AI (Vercel AI Gateway) try karta hai. AI ko sirf hamari list di jaati hai,
//   isliye wo naye schemes nahi bana sakta.
// - Agar AI available nahi (ya error), to bina API key wala keyword fallback chalta hai.
// Dono case me app kaam karta rehta hai.

export const maxDuration = 30

const OutputSchema = z.object({
  intro: z.string().describe("1-2 line ka short friendly summary of user ki zaroorat, Hinglish me."),
  suggestions: z
    .array(
      z.object({
        schemeId: z.string().describe("EXACT id from the provided scheme list only."),
        reason: z.string().describe("1 line, Hinglish, why yeh scheme relevant hai."),
      }),
    )
    .max(3),
})

function buildResponse(intro: string, raw: AssistantSuggestion[], mode: "ai" | "offline") {
  // Sirf wahi schemes rakho jo hamari dataset me sach me hain (hallucination guard).
  const suggestions = raw
    .map((s) => {
      const scheme = getSchemeById(s.schemeId)
      if (!scheme) return null
      return {
        id: scheme.id,
        name: scheme.name,
        shortDescription: scheme.shortDescription,
        officialUrl: scheme.officialUrl,
        reason: s.reason,
      }
    })
    .filter(Boolean)
    .slice(0, 3)

  return Response.json({ intro, suggestions, mode })
}

export async function POST(req: Request) {
  let message = ""
  try {
    const body = await req.json()
    message = typeof body?.message === "string" ? body.message.trim() : ""
  } catch {
    message = ""
  }

  if (!message) {
    return Response.json({ error: "Kripya apni zaroorat likhein." }, { status: 400 })
  }

  const offlineIntro = "Aapke message ke aadhaar par yeh schemes relevant lag rahi hain:"

  try {
    const { output } = await generateText({
      model: "google/gemini-2.5-flash",
      output: Output.object({ schema: OutputSchema }),
      system: [
        "Tum 'Yojana Sathi' ho, ek helpful assistant jo Indian government schemes suggest karta hai.",
        "Sirf neeche di gayi SCHEME LIST me se hi schemes suggest karo. Koi naya scheme, benefit, ya eligibility mat banao.",
        "schemeId hamesha list me se EXACT id ho. Zyada se zyada 3 schemes.",
        "Simple Hinglish me jawab do. Kabhi final eligibility guarantee mat karo.",
        "",
        "SCHEME LIST:",
        schemeContext(),
      ].join("\n"),
      prompt: `User ki zaroorat: "${message}"`,
    })

    if (!output || output.suggestions.length === 0) {
      return buildResponse(offlineIntro, keywordMatch(message), "ai")
    }
    return buildResponse(output.intro || offlineIntro, output.suggestions, "ai")
  } catch (err) {
    console.log("[v0] AI assistant fallback to keyword match:", (err as Error)?.message)
    return buildResponse(offlineIntro, keywordMatch(message), "offline")
  }
}
