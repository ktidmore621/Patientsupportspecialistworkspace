# PSP Enrollment Workspace — UI Design Brief
### Patient Support Program · Enrollment Optimization Tool
*For use with any UI design tool or designer — provides full product context without constraining visual execution*

---

## 1. WHAT THIS PRODUCT IS

A purpose-built workspace for **Patient Support Specialists (PSPs)** who manage the enrollment of patients into pharmaceutical support programs. These programs help patients access, afford, and stay on therapy — often life-critical medications.

This is not a CRM. It is not a ticketing system. It is a **workspace** — a tool designed around the work Sarah actually does, not around storing records.

The product exists to solve one problem: **inefficiencies in the enrollment process delay patient access to therapy.** Every design decision traces back to this. Sarah's efficiency is the mechanism. Patient access is the outcome.

---

## 2. THE PRIMARY USER — SARAH

Sarah is a Patient Support Specialist. She is the human connective tissue of a patient support program — coordinating between patients, healthcare providers (HCPs), payers, and internal teams.

**What Sarah needs to be able to do at any moment:**
- Know what needs her attention right now
- Know what is blocking a patient's case from advancing
- Take action without navigating away from her current context
- Trust that the system has done everything it can before asking for her judgment

**What Sarah's job actually looks like:**
- High volume — she manages many cases simultaneously
- High stakes — delays she causes have real impact on real patients
- High cognitive load — she tracks complex status across insurance, consent, documentation, and eligibility for every case
- Regulated environment — she needs confidence she is doing things correctly

**Sarah's five responsibilities:**
1. Intake & Verification — receiving and validating enrollment requests
2. Eligibility Determination — assessing which assistance programs a patient qualifies for
3. Document Management — collecting and tracking required documents
4. Communication — outreach to patients, HCPs, and payers
5. Case Management — tracking case status and resolving issues

**The tool is fully designed around responsibilities 1 and 2. Responsibilities 3, 4, and 5 are present as supporting surfaces but not primary design areas.**

---

## 3. THE STRATEGIC THESIS

> Sarah doesn't need more data. She needs to know what to do next, why it matters, and what's in the way. The system should think with her, not just store for her.

**Three things the product must deliver for every case:**
1. **Efficiency** — Sarah never wastes time navigating, searching, or reconstructing context
2. **Accuracy** — Sarah never has to guess, calculate manually, or rely on memory for something the system can verify
3. **Visibility** — Problems surface to Sarah. She does not go find them.

**The working philosophy:** Focus → Decide → Act. Every surface in the product is organized around this sequence.

---

## 4. THE WORKSPACE STRUCTURE

The product has a persistent three-panel layout that Sarah works within at all times.

### Left navigation panel
A collapsible navigation panel that is always present. It collapses to icons only when Sarah needs more horizontal space. It never disappears. Primary navigation lives here — her workspace overview, her case queue, new intake, search, and reporting.

### Main content area
The primary work surface. This changes based on what Sarah is doing — her queue view when she opens the app, a case record when she opens a case, a workflow view when she is working through a process. This is where Sarah does the work.

### Right context panel
A contextual panel that opens alongside the main content when Sarah needs depth. It provides high-context detail — the full case data, documents, audit history, AI summaries, outreach drafts. It can be closed when not needed. It never replaces the main content — it supplements it.

---

## 5. THE QUEUE VIEW — WHAT SARAH SEES FIRST

When Sarah opens the workspace, she sees a prioritized work surface — not a list of cases.

**The screen answers three questions in under 10 seconds:**
1. What needs my attention right now?
2. What is at risk if I don't act today?
3. Where do I start?

### Priority action cards
At the top of the queue, 2–3 cards surface the most urgent actions across all of Sarah's cases. Each card contains:
- The patient name and case identifier
- A single action statement — what Sarah needs to do
- A short explanation of why this is the priority right now
- The impact if she does not act
- A single action button that lets her act immediately

These are not notifications. They are curated, system-determined action items — the most important things Sarah should do first today.

### Summary metrics
Three numbers visible above the queue: cases needing action today, cases stalled or at risk, cases awaiting information from outreach. These give Sarah a sense of her day without requiring her to read every case.

### The case queue
A filtered list showing only cases that need action. Sarah can expand to see all cases. Each row in the queue shows:
- Patient name and case ID
- Current case status
- The next best action — expressed as a single word or short phrase (Outreach, Review, Confirm, Follow up)
- The active blocker — what is preventing this case from advancing
- Days the case has been open — with urgency signaling based on how long it has been
- The program type

Sarah can click any row to open the case record.

---

## 6. THE CASE RECORD — THE PRIMARY WORK SURFACE

When Sarah opens a case, she lands in the case record. This is the most important screen in the product. Everything above the fold must be immediately actionable — Sarah should know what to do and be able to start doing it without scrolling.

### Above the fold — four zones

**Zone 1 — Action layer (most prominent)**
The next best action for this specific case. Includes:
- The action itself — expressed as a clear instruction, not a status
- A short expansion explaining why this is the right action
- The impact if Sarah does not complete this action
- A single one-click action to begin

This is the first thing Sarah sees. It is not a notification. It is a directive.

**Zone 2 — Case identity**
Patient name, case ID, enrollment status, program, days open, assigned specialist. The minimal information Sarah needs to orient to the case.

**Zone 3 — Critical blockers**
Any active flags, missing gates, stalled tasks. Surfaced here so Sarah sees them immediately — not buried in a section below. If HIPAA authorization is missing, that appears here. If a prior authorization has been pending too long, it appears here.

**Zone 4 — Key data summary**
Only the data fields relevant to Sarah's next decision. Not all fields — the curated subset. Insurance type, consent status, prescriber, program. If Sarah needs the full data, the right panel has it.

### Below the fold — structured workflow sections

Organized by enrollment stage. Each section shows status, what is missing, and when it was last updated. Sarah does not see raw fields here — she sees structured, stage-oriented summaries.

**Sections in order:**
- Intake — patient demographics, enrollment source, submission data
- Verification — insurance verification, coverage breakdown, prior auth status
- Eligibility — program criteria, financial assessment, decision outcome
- Documents — all required documents with status and completeness indicators
- Communication timeline — all interactions in reverse chronological order (calls, emails, notes, outreach)
- Full data / audit / history — raw fields, change log, system events (compliance layer, not daily use)

---

## 7. THE RIGHT PANEL — HIGH CONTEXT LAYER

The right panel opens contextually. It is not always open. When it opens, it provides the depth that the main content deliberately withholds.

**What lives in the right panel:**
- Outreach drafts ready for Sarah to approve and send
- AI call summaries in draft state — awaiting Sarah's confirmation
- Full document viewer
- Complete case event log
- AI recommendation reasoning — why the system recommended a specific action
- Full data fields for any section

**The right panel never replaces the main content.** Sarah works in the main content. The right panel is the reference layer she consults when she needs more.

---

## 8. THE NEXT BEST ACTION SYSTEM

The Next Best Action (NBA) is the product's core intelligence surface. It appears in three places:

1. **Queue view** — as priority action cards at the top of the screen
2. **Case record** — as the action layer above the fold, specific to the open case
3. **Queue table** — as inline chips on each row (one word: Outreach, Confirm, Review, Follow up)

**Every NBA has four parts:**
- Action — what to do, in plain language
- Why — the reasoning behind this specific action right now
- Impact — what happens if Sarah does not act
- One-click action — Sarah can act directly from the NBA without navigating

**The NBA is not a notification.** It is a recommendation with reasoning. Sarah can always override it. But it should always be right enough that she rarely needs to.

---

## 9. THE AI LAYER

AI is present throughout the product. It operates on a human-in-the-loop model — AI handles the deterministic and pattern-based work, Sarah owns the judgment calls.

**AI capabilities at intake:**
- OCR and intelligent parsing of incoming faxes and documents — extracts structured data, auto-populates fields
- Duplicate detection — cross-references incoming records against existing patients, flags potential matches with confidence scores
- Ambiguous document matching — when a document could belong to multiple records, surfaces candidates for Sarah to resolve
- Completeness scoring — real-time assessment of how complete a referral is against required fields, with specific gaps called out
- NPI registry auto-fill — looks up prescriber details from NPI number automatically

**AI capabilities at eligibility:**
- Automated coverage check — initiates benefit verification when a case becomes active
- FPL calculation — calculates Federal Poverty Level from income and household size, maps to program criteria automatically
- Benefit recommendation — recommends the appropriate benefit determination with a confidence score and the reasoning behind it — Sarah confirms or overrides
- Appeal path detection — when a denial arrives, evaluates the denial reason against known appeal patterns and flags viable paths

**Pre-promotion AI re-check:**
Before a temp case is promoted to an Active Case, the system re-runs identity matching using the now-complete record (name, DOB, social). This is deterministic — binary outcome only. Either the patient is confirmed new and the case promotes, or an existing patient record is found and the case links to it.

**What AI never does:**
AI never makes the final eligibility determination, never sends outreach without Sarah's approval, and never closes or advances a case without a human confirmation at the key gates.

---

## 10. THE EVENT AND TASK SYSTEM

Every action in the system produces either an Event or a Task. This is the notification and workflow system.

| Type | Label | Meaning |
|---|---|---|
| Event | `Event · Case Created` | A new temp record was instantiated |
| Event | `Event · Record Update` | Data on an existing record changed |
| Event | `Event · Specialist Alert` | Something happened that the assigned specialist did not initiate — awareness only, no action required |
| Task | `Task · Specialist Review` | Sarah must make a judgment call before the flow continues |
| Task | `Task · Specialist Outreach` | Sarah must contact someone — outreach is pre-built and ready to approve |

**The alert initiator rule:** `Event · Specialist Alert` only fires when the action was initiated by the system or a different specialist — not by Sarah herself. If Sarah updated the record, she does not receive an alert about her own action.

---

## 11. THE INTAKE FLOW — WHAT THE SYSTEM DOES

### Item-fed channels (four channels, one entry point)
Four channels arrive as inbound items that AI processes automatically:
- Portal / EHR submissions — structured, highest data quality
- Fax — unstructured, OCR is critical, highest volume
- Email — semi-structured, attachment parsing required
- Vendor / payer / pharmacy feeds — structured API or batch data, no OCR required

All four enter the same AI processing pipeline. The system immediately runs OCR, parsing, NPI lookup, duplicate detection, and record matching. Sarah does not touch these until the system has done everything it can.

### Matching logic — three lanes
After AI processing, every inbound item routes to one of three lanes:

**Existing record (high confidence match):** System auto-attaches the item, updates the record, fires `Event · Record Update`, alerts Sarah with `Event · Specialist Alert` — awareness only, no action required.

**New record (no match):** A temp case is created (`Event · Case Created`). The system checks whether there is a contact method on file. If yes, it evaluates all three requirements simultaneously (required fields, HIPAA authorization, enrollment consent). If anything is missing, one combined outreach is generated covering all gaps — ready for Sarah to approve with one action, no hand-keying. When information is received, the system re-evaluates automatically. When all requirements are met, the AI re-check runs before promoting the case to Active.

**Unknown (ambiguous match):** A `Task · Specialist Review` is created. Sarah sees candidate matches with confidence scores and makes the determination. She re-enters the matching decision point — if she finds an existing record, it routes to the existing path. If she determines it is new, it routes to the new record path.

### The call center channel — a distinct pre-flow
The call center is the only channel where no item arrives — Sarah is the intake mechanism. It has its own pre-flow:

When a call connects, the call center integration fires immediately before Sarah acts. It attempts to match the caller using the inbound phone number (instant match), partial identifiers like HCP name or NPI (shortlist presented), or falls back to manual search (always available). Sarah can identify the caller and link to an existing case within the first 30 seconds.

If no case exists, an in-progress case opens. Sarah enters data in real time. At any point during the call she can trigger a mid-call match attempt — the system checks what she has entered against existing records and returns confidence-scored candidates without requiring her to save. She can either select a match immediately (opens the case on the left side of her workspace) or defer the decision to wrap-up.

**Persistent call context bar:** For the duration of any active call, a persistent bar is pinned to the workspace. It stays visible regardless of where Sarah navigates. It shows the caller identity, linked case ID (changeable mid-call), call timer, and activity log status. The system logs every action Sarah takes during the call silently against the linked case ID — she does not have to manually document while in motion.

**AI call transcription and summary:** The call is recorded via an integrated call recording platform (e.g. Calabrio) for compliance and training. AI transcription runs in real time, feeding an AI-generated call summary that is created in draft state when the call ends. The summary extracts key information, updates, outstanding items, and next action recommendations. Sarah reviews and confirms the summary — it becomes part of the permanent case record only after her confirmation.

**Patient sentiment flag:** If AI detects patient distress, confusion, or access barriers during the call, a flag surfaces to Sarah in real time so she can respond during the conversation. This is distinct from the specialist sentiment analysis (which is available to supervisors and leadership for quality assurance, not visible to Sarah).

**Wrap-up window:** When the call ends, Sarah enters a wrap-up window that consolidates the AI summary, any deferred match decisions, and pending case actions. After Sarah confirms, the case saves as a Temp Case and enters the standard AI processing pipeline — joining the same flow as all other channels.

---

## 12. THE ELIGIBILITY FLOW — WHAT HAPPENS AFTER INTAKE

Once a case is Active, eligibility determination begins. The system initiates a coverage investigation automatically. The flow branches based on insurance type and program criteria.

**The core eligibility question:** Which benefit bucket applies to this patient — commercial copay assistance, free drug (PAP), bridge supply, or none — and is there an alternative path if the first determination fails?

**Key data points evaluated:**
- Insurance plan type (commercial, Medicare, Medicaid, uninsured)
- Insurance active dates and coverage status
- Deductible and out-of-pocket maximum — met vs remaining
- Drug formulary status and tier
- Prior authorization requirement
- Federal Poverty Level (calculated from income and household size)
- State of residence (state-specific program rules apply)
- Specialty pharmacy network status

**AI benefit recommendation:** The system evaluates all of this data and recommends a benefit determination with a confidence score and the reasoning behind it. Sarah confirms or overrides. She is never asked to calculate FPL manually or look up formulary rules — the system does that.

**If denied:** The system evaluates the denial reason code against known appeal patterns and flags viable appeal paths. Sarah does not have to know every payer's appeal rules — the system surfaces the opportunity.

---

## 13. WHAT THE PRODUCT IS NOT

- Not a replacement for Sarah's judgment — it augments it
- Not a CRM — it does not organize around records, it organizes around work
- Not therapy-specific — it works universally across any PSP context
- Not bound by any existing platform's architecture or UI conventions
- Not designed for HCP-side or payer-side workflows — Sarah's experience only

---

## 14. THE TONE OF THE PRODUCT

The product should feel like a workspace that a highly competent specialist would choose to use — not one they are required to use. It is calm, structured, and serious. It respects Sarah's intelligence by not over-explaining. It respects her time by never making her click through things she do not need. It earns her trust by being right more often than not, and by being transparent when it is uncertain.

If the product feels like a CRM, it has failed. If it feels like a notification system, it has failed. If Sarah has to go looking for a problem the system should have surfaced, it has failed.

It succeeds when Sarah opens it in the morning and immediately knows exactly where to start.