// ---------------------------------------------------------------------------
// SCHEME DATA
// ---------------------------------------------------------------------------
// Yeh file me sabhi government schemes ka data hai (dataset).
// Har scheme ke andar "attributes" hain jinse hum user ke answers ko match karte hain.
//
// IMPORTANT: Yeh sarkari schemes real hain, lekin exact amount / eligibility
// samay ke saath badalti rehti hai. Isliye har scheme me `officialUrl` diya hai
// aur app me disclaimer bhi dikhaya jata hai ki final eligibility official
// website se verify karein.
// ---------------------------------------------------------------------------

export type BusinessType =
  | "street_vendor"
  | "home_based"
  | "tailoring_artisan"
  | "small_shop"
  | "repair_service"
  | "other"

export type IncomeRange = "below_10k" | "10k_20k" | "20k_30k" | "above_30k"

export type SupportType = "loan" | "machinery" | "training" | "market_access" | "subsidy"

export type DocumentLevel = "aadhaar_only" | "aadhaar_pan" | "other_id" | "none"

export interface Scheme {
  id: string
  name: string
  shortDescription: string
  targetUsers: string
  // Matching attributes
  businessTypes: BusinessType[]
  incomeRanges: IncomeRange[]
  supportTypes: SupportType[]
  // Minimum documents typically needed to begin the process
  minDocuments: DocumentLevel
  // Human readable info
  eligibility: string[]
  benefits: string[]
  documents: string[]
  howToApply: string[]
  officialUrl: string
  officialName: string
  // Shown wherever exact figures may change over time
  verifyNote: string
}

export const SCHEMES: Scheme[] = [
  {
    id: "pm-svanidhi",
    name: "PM SVANidhi Yojana",
    shortDescription:
      "Street vendors ke liye chhota collateral-free working capital loan, interest subsidy ke saath.",
    targetUsers: "Street vendors, thela / rehri / patri walon ke liye.",
    businessTypes: ["street_vendor", "small_shop"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k"],
    supportTypes: ["loan"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Aap street vendor hain (thela / rehri / patri / footpath par saman bechte hain).",
      "Urban Local Body (ULB) ka Certificate of Vending ya vending ki pehchaan honi chahiye.",
    ],
    benefits: [
      "Pehla working capital loan ₹10,000 tak, collateral (bina guarantee) ke.",
      "Time par chukane par agla loan ₹20,000 aur phir ₹50,000 tak.",
      "Loan par 7% interest subsidy.",
      "Digital lenden par cashback incentive.",
    ],
    documents: [
      "Aadhaar Card",
      "Certificate of Vending / Vending ID (ULB dwara)",
      "Bank account details",
    ],
    howToApply: [
      "Nazdiki bank, ULB ya Common Service Centre (CSC) par jaayein.",
      "Official portal par online bhi apply kar sakte hain.",
    ],
    officialUrl: "https://pmsvanidhi.mohua.gov.in",
    officialName: "PM SVANidhi (MoHUA)",
    verifyNote:
      "Loan amount, interest subsidy aur eligibility official portal se verify karein.",
  },
  {
    id: "pmmy-mudra",
    name: "Pradhan Mantri MUDRA Yojana (PMMY)",
    shortDescription:
      "Chhote non-corporate business ke liye collateral-free loan (Shishu, Kishor, Tarun).",
    targetUsers: "Chhote dukaandaar, manufacturers, service providers aur artisans.",
    businessTypes: ["street_vendor", "home_based", "tailoring_artisan", "small_shop", "repair_service", "other"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["loan"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Koi bhi Indian citizen jiske paas ek non-farm income-generating chhota business ho.",
      "Business manufacturing, trading ya services me ho.",
    ],
    benefits: [
      "Shishu: ₹50,000 tak ka loan.",
      "Kishor: ₹50,000 se ₹5 lakh tak.",
      "Tarun: ₹5 lakh se ₹10 lakh tak (aur upar tak enhanced categories).",
      "Collateral-free (bina guarantee) loan.",
    ],
    documents: [
      "Aadhaar Card",
      "Business proof / address proof",
      "Bank account details",
      "Passport size photo",
    ],
    howToApply: [
      "Kisi bhi bank, NBFC ya MFI me apply karein.",
      "Online Jan Samarth / udyamimitra portal ke through bhi apply kar sakte hain.",
    ],
    officialUrl: "https://www.mudra.org.in",
    officialName: "MUDRA (Govt. of India)",
    verifyNote: "Loan categories aur limits official website se verify karein.",
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Yojana",
    shortDescription:
      "Traditional artisans aur craftsmen (18 trades) ke liye ID, training, toolkit aur loan.",
    targetUsers: "Haath aur auzaar se kaam karne wale artisans (tailor, carpenter, cobbler, etc.).",
    businessTypes: ["tailoring_artisan", "repair_service", "home_based"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k"],
    supportTypes: ["training", "machinery", "loan"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Aap 18 notified trades me se kisi ek me hasth-shilp / artisan kaam karte hain.",
      "Family based traditional trade hona chahiye.",
    ],
    benefits: [
      "Vishwakarma recognition certificate aur ID card.",
      "Skill training ke saath stipend (training ke dinon me).",
      "Toolkit kharidne ke liye incentive.",
      "Collateral-free credit support kam interest par.",
    ],
    documents: [
      "Aadhaar Card",
      "Mobile number (Aadhaar se linked)",
      "Bank account details",
    ],
    howToApply: [
      "Common Service Centre (CSC) par jaakar registration karein.",
      "Official portal par bhi details available hain.",
    ],
    officialUrl: "https://pmvishwakarma.gov.in",
    officialName: "PM Vishwakarma (Govt. of India)",
    verifyNote:
      "18 eligible trades, stipend aur toolkit amount official portal se verify karein.",
  },
  {
    id: "pmegp",
    name: "Prime Minister's Employment Generation Programme (PMEGP)",
    shortDescription:
      "Naya micro-enterprise shuru karne ke liye loan par margin money (subsidy).",
    targetUsers: "Naya business/manufacturing/service unit shuru karne wale log.",
    businessTypes: ["home_based", "tailoring_artisan", "small_shop", "repair_service", "other"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["subsidy", "loan", "machinery"],
    minDocuments: "aadhaar_pan",
    eligibility: [
      "Umra 18 saal se upar.",
      "Naya (new) project hono chahiye - pehle se chal raha unit generally eligible nahi.",
      "Kuch project size ke liye minimum education requirement ho sakti hai.",
    ],
    benefits: [
      "Bank loan par government margin money subsidy (category aur area ke hisaab se alag %).",
      "Naya manufacturing ya service unit lagane me madad.",
      "Machinery aur setup cost cover karne me sahayata.",
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Project report",
      "Caste / special category certificate (agar applicable ho)",
      "Education certificate (agar zaroori ho)",
    ],
    howToApply: [
      "KVIC ke official PMEGP e-portal par online apply karein.",
      "KVIC / KVIB / DIC office se madad le sakte hain.",
    ],
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal",
    officialName: "PMEGP e-Portal (KVIC)",
    verifyNote:
      "Subsidy percentage, project cost limit aur eligibility official portal se verify karein.",
  },
  {
    id: "stand-up-india",
    name: "Stand-Up India Scheme",
    shortDescription:
      "SC/ST aur mahila entrepreneurs ke liye greenfield business par bank loan.",
    targetUsers: "SC/ST category aur women entrepreneurs jo naya business lagana chahte hain.",
    businessTypes: ["small_shop", "tailoring_artisan", "repair_service", "other"],
    incomeRanges: ["10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["loan"],
    minDocuments: "aadhaar_pan",
    eligibility: [
      "Borrower SC/ST ya woman hona chahiye, umra 18+.",
      "Greenfield (bilkul naya) project honi chahiye - manufacturing, services ya trading.",
    ],
    benefits: [
      "₹10 lakh se ₹1 crore tak bank loan.",
      "Naya enterprise lagane ke liye composite loan (term + working capital).",
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Caste certificate (SC/ST ke liye)",
      "Project report / business plan",
      "Bank account details",
    ],
    howToApply: [
      "Kisi bhi scheduled commercial bank branch me apply karein.",
      "Official Stand-Up Mitra portal par online register karein.",
    ],
    officialUrl: "https://www.standupmitra.in",
    officialName: "Stand-Up Mitra (SIDBI)",
    verifyNote: "Loan range aur eligibility conditions official portal se verify karein.",
  },
  {
    id: "day-nulm",
    name: "DAY-NULM (Self Employment Program)",
    shortDescription:
      "Urban gareeb parivaaron ke liye subsidized loan aur self-help group support.",
    targetUsers: "Urban (shehri) area ke gareeb log aur unke self-help groups.",
    businessTypes: ["street_vendor", "home_based", "tailoring_artisan", "small_shop", "repair_service"],
    incomeRanges: ["below_10k", "10k_20k"],
    supportTypes: ["loan", "training"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Urban poor category me aana chahiye.",
      "Individual ya group (SHG) ke roop me business kar sakte hain.",
    ],
    benefits: [
      "Individual aur group enterprise ke liye subsidized (kam interest) loan.",
      "Interest subvention ka fayda.",
      "Skill training aur self-help group support.",
    ],
    documents: [
      "Aadhaar Card",
      "Income / BPL proof (agar available ho)",
      "Bank account details",
    ],
    howToApply: [
      "Apne sheher ke Urban Local Body (Nagar Nigam / Municipality) me apply karein.",
      "City Livelihood Centre / ULB office se madad lein.",
    ],
    officialUrl: "https://nulm.gov.in",
    officialName: "DAY-NULM (MoHUA)",
    verifyNote: "Interest subvention aur eligibility official portal se verify karein.",
  },
  {
    id: "pmkvy",
    name: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    shortDescription: "Free skill training aur certification, taaki behtar kama sakein.",
    targetUsers: "Youth aur workers jo naya skill seekhna ya certificate lena chahte hain.",
    businessTypes: ["home_based", "tailoring_artisan", "repair_service", "other"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["training"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Indian citizen jo skill training lena chahta hai.",
      "Different job roles ke liye alag basic requirements ho sakti hain.",
    ],
    benefits: [
      "Free short-term skill training.",
      "Government-recognised certification.",
      "Kuch courses me placement / assessment support.",
    ],
    documents: ["Aadhaar Card", "Bank account details (kuch cases me)"],
    howToApply: [
      "Nazdiki PMKVY training centre me register karein.",
      "Skill India digital portal par courses dekh sakte hain.",
    ],
    officialUrl: "https://www.pmkvyofficial.org",
    officialName: "PMKVY (Skill India)",
    verifyNote: "Available courses aur centres official portal se verify karein.",
  },
  {
    id: "udyam-registration",
    name: "Udyam Registration (MSME)",
    shortDescription:
      "Free online MSME registration - kai scheme benefits ka darwaza kholta hai.",
    targetUsers: "Har chhota business jo official MSME pehchaan chahta hai.",
    businessTypes: ["home_based", "tailoring_artisan", "small_shop", "repair_service", "other"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["market_access", "subsidy"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Aapka micro / small / medium enterprise honi chahiye.",
      "Aadhaar zaroori hai (proprietor ka).",
    ],
    benefits: [
      "Official MSME pehchaan (Udyam Certificate) - bilkul free.",
      "Bank loans me priority aur asani.",
      "Kai government schemes aur subsidies ke liye eligible ban jaate hain.",
    ],
    documents: ["Aadhaar Card", "PAN / GST (agar applicable ho)", "Bank account details"],
    howToApply: ["Official Udyam Registration portal par khud free me register karein."],
    officialUrl: "https://udyamregistration.gov.in",
    officialName: "Udyam Registration (MSME)",
    verifyNote: "Registration process official portal par free hai - kisi agent ko paisa na dein.",
  },
  {
    id: "cgtmse",
    name: "Credit Guarantee Fund (CGTMSE)",
    shortDescription:
      "Micro & small enterprises ko bina collateral (bina guarantee) loan dilane me madad.",
    targetUsers: "Micro aur small enterprises jinke paas loan ke liye guarantee nahi hai.",
    businessTypes: ["home_based", "tailoring_artisan", "small_shop", "repair_service", "other"],
    incomeRanges: ["10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["loan"],
    minDocuments: "aadhaar_pan",
    eligibility: [
      "Micro / small enterprise (naya ya existing).",
      "Loan member bank/NBFC ke through CGTMSE coverage me aata ho.",
    ],
    benefits: [
      "Collateral-free / third-party guarantee ke bina loan.",
      "Bank ko credit guarantee cover milta hai, isse loan milna asaan.",
    ],
    documents: ["Aadhaar Card", "PAN Card", "Business documents", "Bank account details"],
    howToApply: [
      "Yeh scheme banks ke through kaam karti hai - apne bank se CGTMSE loan ke liye request karein.",
    ],
    officialUrl: "https://www.cgtmse.in",
    officialName: "CGTMSE",
    verifyNote: "Guarantee coverage limit aur conditions official website se verify karein.",
  },
  {
    id: "sfurti",
    name: "SFURTI (Traditional Industries)",
    shortDescription:
      "Traditional artisans ke clusters ko machinery, training aur market support.",
    targetUsers: "Traditional industry ke artisans jo group / cluster me kaam karte hain.",
    businessTypes: ["tailoring_artisan", "home_based"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k"],
    supportTypes: ["machinery", "training", "market_access"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Traditional industry (handicraft, khadi, coir, etc.) ke artisans.",
      "Generally cluster / group ke roop me benefit milta hai.",
    ],
    benefits: [
      "Common facility centre aur behtar machinery / tools.",
      "Skill upgradation aur design training.",
      "Marketing aur market linkage support.",
    ],
    documents: ["Aadhaar Card", "Artisan / cluster membership proof"],
    howToApply: [
      "Implementing agency ya KVIC / MSME office ke through cluster proposal banaya jata hai.",
    ],
    officialUrl: "https://sfurti.msme.gov.in",
    officialName: "SFURTI (Ministry of MSME)",
    verifyNote: "Cluster eligibility aur support details official portal se verify karein.",
  },
  {
    id: "pm-fme",
    name: "PM FME (Micro Food Processing)",
    shortDescription:
      "Chhote food processing units ke liye credit-linked subsidy aur training.",
    targetUsers: "Home-based / chhote food processing (achaar, papad, masala, bakery, etc.) walon ke liye.",
    businessTypes: ["home_based", "small_shop", "other"],
    incomeRanges: ["below_10k", "10k_20k", "20k_30k", "above_30k"],
    supportTypes: ["subsidy", "loan", "machinery", "training"],
    minDocuments: "aadhaar_pan",
    eligibility: [
      "Micro food processing enterprise (individual ya SHG / FPO).",
      "Unit food product banane / processing me lagi ho.",
    ],
    benefits: [
      "Credit-linked capital subsidy (project cost ka ek hissa).",
      "Machinery aur upgradation me madad.",
      "Training aur branding / marketing support.",
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Business / unit details",
      "Bank account details",
    ],
    howToApply: [
      "PM FME official portal par online apply karein.",
      "State nodal agency ya District Resource Person se madad lein.",
    ],
    officialUrl: "https://pmfme.mofpi.gov.in",
    officialName: "PM FME (MoFPI)",
    verifyNote: "Subsidy percentage aur limits official portal se verify karein.",
  },
  {
    id: "nrlm",
    name: "DAY-NRLM (Rural Livelihoods)",
    shortDescription:
      "Rural mahilaon ke self-help groups ko cheap loan aur livelihood support.",
    targetUsers: "Gaon (rural) ke gareeb parivaar, khaaskar mahila SHG members.",
    businessTypes: ["home_based", "tailoring_artisan", "repair_service", "other"],
    incomeRanges: ["below_10k", "10k_20k"],
    supportTypes: ["loan", "training", "market_access"],
    minDocuments: "aadhaar_only",
    eligibility: [
      "Rural poor households, mukhya roop se mahila SHG ke through.",
      "Gaon me self-help group ka member honi chahiye ya ban sakte hain.",
    ],
    benefits: [
      "SHG ko bahut kam interest par bank loan.",
      "Revolving fund aur community investment support.",
      "Skill training aur livelihood activities.",
    ],
    documents: ["Aadhaar Card", "SHG membership details", "Bank account details"],
    howToApply: [
      "Apne gaon ke SHG / Village Organisation ke through judein.",
      "Block / district State Rural Livelihood Mission office se madad lein.",
    ],
    officialUrl: "https://aajeevika.gov.in",
    officialName: "DAY-NRLM (Aajeevika)",
    verifyNote: "SHG process aur benefits official portal / block office se verify karein.",
  },
]

export function getSchemeById(id: string): Scheme | undefined {
  return SCHEMES.find((s) => s.id === id)
}
