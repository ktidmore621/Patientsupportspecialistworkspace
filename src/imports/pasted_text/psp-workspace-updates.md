Please make the following fixes and improvements to the PSP Workspace application. Apply all changes across every screen and component where relevant.

Fix 1 — Status pill label consistency
Everywhere a status pill appears, ensure the labels use proper spacing and match this exact vocabulary:

Active — blue pill
Temp — amber/orange pill
In Review — purple pill (NOT In_review — remove the underscore everywhere it appears)
Enrolled — green pill
Stalled — red pill

Apply this consistently across the queue view, cases list view, case record, and any other location where status is displayed.
Also standardize all action buttons in the priority cards to be the same width and height. Currently Confirm & Notify, Review Appeal, and Approve & Send are inconsistent sizes. Set all three to the same fixed width (around 160px) with identical padding and font size so they feel like a consistent system, not ad hoc buttons.

Fix 2 — Document Upload: add AI matching step after upload
After a document is uploaded, do not immediately show "Confirm & Create Case." Instead add an intermediate step that mirrors the call center patient linking experience:

Show a "Matching document to patient..." loading state with a subtle spinner
Then display match candidates exactly like the call center quick search — show patient name, case ID, and phone number for each candidate
If a high-confidence match is found, pre-select it and show "Linked to: [Patient Name]" with an "Unlink" option — same visual treatment as the call center linked state
If no match is found, show a search field so Sarah can manually find and link the case
Only after linking show the "Confirm & Create Case" button

The visual language should feel identical to the call center patient linking — same linked patient banner, same unlink option, same confidence indicators.

Fix 3 — Manual Entry: real-time duplicate detection
As Sarah types in the First Name, Last Name, and Date of Birth fields, run a background match check. When a possible match is found show a subtle inline banner below the Date of Birth field that reads:
"Possible match found — [Patient Name] · [Case ID] · [Phone]" with a "Review match" link and a "Continue as new" option
The banner should appear after the user has typed at least 3 characters in both name fields and a complete date of birth. Style it with a soft amber background and amber border — same amber semantic color used for warnings throughout the app. It should feel like a helpful suggestion, not a blocking error.

Fix 4 — Cases list view: add NBA chips and blocker tooltips
In the full Cases list view (the "Cases" page accessible from the left nav):
Replace the plain text in the Next Action column with colored NBA chips matching the queue view:

Outreach — amber chip
Confirm — green chip
Review — purple chip
Follow up — amber chip
Enroll — green chip

For the Blockers column, the number badges (1, 2) are good. Add a tooltip on hover that lists the specific blockers. For example hovering over "2" for Thomas Anderson should show "HIPAA authorization not received · Income verification required for PAP eligibility." The tooltip should appear above the badge with a clean minimal style.

Fix 5 — Eligibility Determination queue section: add blocker column
The Eligibility Determination section at the bottom of the queue view currently shows Patient, Status, Next Action, Days Open, and Program. Add a Blockers column between Next Action and Days Open — matching the Cases section above it.
Use realistic blockers for each In Review case:

Jennifer Martinez (PAP, Day 3) — Blocker: "Income docs pending"
Robert Williams (Copay, Day 5) — Blocker: "Benefit verification in progress"
Lisa Thompson (Bridge, Day 2) — No blocker

Use the same colored dot + text format as the Cases section. Orange dot for active blockers, green dot for none.

Fix 6 — Days open color coding: apply consistently everywhere
Days open should use the same color logic in every view:

1–7 days — neutral/default text color
8–10 days — amber/orange color
11+ days — red color

Apply this to the Cases list view (currently showing plain numbers), the queue view, the right panel case details, and anywhere else days open is displayed. The coloring should be automatic based on the number — not manually set per case.

Fix 7 — Data and vocabulary audit: ensure all case data is realistic and internally consistent
Review every case, status, blocker, next action, and program combination across all screens and fix anything that is logically inconsistent. Apply these rules:
Cases and their correct states:

Maria Rodriguez (PSP-2024-1847) — Active, Copay, Day 8. PA was approved 2 days ago. Next action: Confirm prior authorization approval. No blocker. This makes sense — she is waiting on Sarah to confirm and notify the pharmacy.
Thomas Anderson (PSP-2024-1891) — Temp, PAP, Day 3. Missing HIPAA authorization and income verification. Next action: Send combined outreach. Blocker: HIPAA not received, income docs needed. Correct.
Jennifer Kim (PSP-2024-1823) — Active, Copay, Day 12. PA submitted, pending payer response. Next action: Follow up on PA status. Blocker: Prior authorization pending — Day 9 of review. Correct.
Robert Williams (PSP-2024-1902) — Active, Bridge supply, Day 15. PA denied, appeal path identified by AI. Next action: Review appeal path. Blocker: PA denied — appeal path available. Bridge supply makes sense here as he is receiving temporary supply while appeal is in progress.
Angela Martinez (PSP-2024-1876) — Active, Copay, Day 5. Eligibility confirmed. Next action: Confirm specialty pharmacy enrollment. No blocker. Correct.
Michael Chen (PSP-2024-1845) — Active, PAP, Day 10. AI has completed benefit verification and issued a recommendation. Next action: Review AI eligibility recommendation. No blocker. Correct.

For In Review cases (Eligibility Determination tray):

Jennifer Martinez (PSP-2024-1920) — In Review, PAP, Day 3. Benefit verification initiated, income docs not yet received. Next action: Review income verification. Blocker: Income docs pending.
Robert Williams (PSP-2024-1918) — In Review, Copay, Day 5. Benefit verification running. Next action: Verify insurance coverage. Blocker: Benefit verification in progress.
Lisa Thompson (PSP-2024-1915) — In Review, Bridge, Day 2. Newly active, system processing. Next action: Review bridge eligibility. No blocker.

Remove any case data where the stated next action or blocker contradicts the case status. An enrolled case should never show "income verification required." A temp case should never show "confirm PA approval." A case with no PA requirement should never show a PA blocker.
Apply these corrections globally — in the queue view, the cases list, the right panel case details, and anywhere case data appears.