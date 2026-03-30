Here is the complete Figma Make prompt for the case record view plus the remaining fixes:

---

**Build a full case record page and fix remaining issues. Apply everything below.**

---

**Part 1 — Fix `In_review` status pill across all views**

Find every instance of `In_review` with an underscore anywhere in the application — the Cases list, the queue, the right panel, and any other location — and replace it with `In Review` with a space. The status pill should display `In Review` in purple. This must be consistent everywhere.

---

**Part 2 — Fix Maria Rodriguez consent checkboxes**

In the right panel case details for Maria Rodriguez (PSP-2024-1847), she is Active with a PA approved. Update her consent gate checkboxes to reflect the correct state:
- Insurance Verified — checked
- HIPAA Authorized — checked
- Enrollment Consent — checked

An Active case has cleared all consent gates. Unchecked boxes on an Active case is a data inconsistency.

---

**Part 3 — Build the full case record page**

When a user clicks a Case ID link (e.g. PSP-2024-1847) in the Cases list or clicks a patient row in the queue, navigate to a dedicated full-page case record at the route `/cases/[caseId]`. This is the most important screen in the product.

The page uses the same three-panel shell — left nav, main content, right panel. The right panel opens automatically showing the most relevant content for the current case state.

**Top bar:**
Breadcrumb navigation: `Cases › [Patient Name] · [Case ID]` with a back arrow on the left.

**Main content — above the fold (everything visible without scrolling):**

Zone 1 — Action layer (most prominent element, full width):
A banner styled with a colored left border and tinted background matching the urgency level. Contains:
- Small label: "NEXT BEST ACTION"
- Action statement in larger bold text — what Sarah needs to do right now
- One line of explanation — why this is the priority
- Impact line — "If delayed: [consequence]"
- Primary action button on the right side of the banner

For Maria Rodriguez (Active, Copay, Day 8, PA approved): style in green tint. Action: "Confirm prior authorization approval and notify specialty pharmacy." Why: "PA was approved 2 days ago — specialty pharmacy is waiting for confirmation to dispense." Impact: "If delayed: Patient cannot receive medication." Button: "Confirm & Notify"

Zone 2 — Case identity bar (below the action layer):
Patient name in large text, Case ID, status pill, program, days open, assigned specialist name. All on one horizontal row.

Zone 3 — Critical blockers (compact, below identity):
A row showing active blockers with colored indicators. For Maria Rodriguez show: green dot "Consent gates cleared" · green dot "PA approved — awaiting confirmation." If no blockers show a subtle "No active blockers" state in green.

Zone 4 — Key data summary (below blockers):
Four data points in a horizontal row — only what is relevant to Sarah's next decision:
- Insurance: Aetna PPO · Commercial
- Program: Copay assistance
- Prescriber: Dr. James Chen · NPI verified
- Consent: All gates cleared

**Main content — below the fold (scrollable sections):**

Three section cards side by side:

Intake card (green — complete):
- Source: HCP portal referral
- Received: March 22, 2026
- Required fields: All complete
- Status: Complete

Verification card (green — complete for Maria):
- Insurance: Aetna PPO · Member ID verified
- Coverage: Active through 12/31/2026
- HIPAA authorization: Received 03/22/2026
- Enrollment consent: Received 03/22/2026

Eligibility card (green — determined for Maria):
- Benefit type: Commercial copay assistance
- PA required: Yes — approved 03/28/2026
- FPL assessment: Not required for copay program
- Determination: Confirmed — awaiting pharmacy notification

Below the three cards:

Documents section:
- Prescription — Received (green)
- Insurance card — Received (green)
- HIPAA authorization — Received (green)
- Enrollment consent — Received (green)
- PA approval letter — Received (green)

Communication timeline (reverse chronological):
- Mar 28 16:00 — PA approved · Aetna response received
- Mar 27 14:32 — Record updated · Insurance verified
- Mar 27 14:24 — Call completed · 8 min · Sarah Mitchell
- Mar 26 09:15 — Email sent · HIPAA outreach
- Mar 25 16:42 — AI processing complete
- Mar 22 10:00 — Case created · Portal intake

**Right panel (open by default for Maria Rodriguez):**

Header: "Confirm & Notify"

Content:
A pre-built notification ready to approve. Show a blue/teal tinted draft message addressed to the specialty pharmacy confirming PA approval and authorizing dispensing for Maria Rodriguez. Include the PA reference number, approval date, and patient details pre-filled.

Primary button: "Confirm & notify pharmacy" (green)
Secondary button: "Edit before sending"

Below the draft:
AI call summary from Mar 27 call — bullet points showing what was confirmed on the call.

Recent events log matching the communication timeline.

---

**Part 4 — Wire up case record navigation**

Make the following clickable and navigate to the case record page:
- Every Case ID link (e.g. PSP-2024-1847) in the Cases list view
- Every patient name row in the queue view Cases section
- Every patient name row in the Eligibility Determination section

Each should navigate to `/cases/[caseId]` showing the correct patient data for that case. Build out the case record for at least Maria Rodriguez (PSP-2024-1847) as the primary demo case. The other cases can show a simplified version of the same layout with their correct data.

---

**Part 5 — Button width consistency on priority action cards**

In the queue view priority action cards, set all three action buttons (`Confirm & Notify`, `Review Appeal`, `Approve & Send`) to the same fixed width of 160px with identical padding, height, and font size. `Review Appeal` is currently outlined/white while the others are filled green — this inconsistency is intentional for urgency signaling (outlined = lower urgency than filled). Keep the color difference but fix the width so all three are the same size.

---