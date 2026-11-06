# Verification record

## PFI sheet calculator — November 6, 2026

The newly linked PFI DEDUCTION sheet was exported through its signed-in Lark download menu and read in full (one sheet, populated through row 79). Every one of its 524 numeric frequency cells was compared independently with the calculator's result and matched. All 12 codes and four PFI levels are covered. The source's missing minute range, undefined mixed-code counting / reset periods, gross examples without ranges, and blank later frequencies are explicitly bounded in the UI.

All 85 unit tests pass, including the unchanged original 44 policy tests and 27 new calculator tests. Chrome and Edge both pass direct calculator routing, missing inputs, all-or-nothing result validation, charged / uncharged frequency boundaries, invalid and fractional frequencies, stale-result removal after changes, reset, keyboard selection / submission, 320 / 375 / 768 / 1440px overflow checks, 48px controls, reduced motion, original class finder, chapter links, and zero runtime errors. Inputs clear on reload.

The reviewed guide, mission content, original policy functions, and supplied orientation PDF are preserved. Local checks do not by themselves prove publication; live deployment is verified separately.

Verified locally on November 5, 2026, using installed Windows Chrome and Edge in automated browser sessions.

## Policy behavior — 44 passing tests

The tests exercise the rules themselves, not copies of the user-interface code:

- PFI's September 26–October 25 and October 26–November 5 special filing windows.
- Five calendar days with the attendance date as day zero.
- November 21 ATI cap and November 30 PFI / Ranking caps.
- Attendance dates after the ATI cap, invalid dates, and dates outside the source windows.
- Gross PFI thresholds at ₱4,000, ₱8,000, and ₱13,000, including the values just below each threshold.
- The three code-group rates for every Gross PFI class.
- Blank, negative, non-numeric, and infinite Gross PFI input.
- The exact qualified, not-qualified, and incomplete-data ATI examples.

Run `node --test tests/rules.test.cjs` from this folder to repeat these tests.

## Browser behavior — 26 passing interaction checks

- All 29 chapter topics exist, with the complete source card text, notes, and leave lists.
- Keyboard chapter tabs: arrow keys, Home, End, and wrapping.
- Expand / collapse topics.
- Global search, matching topic navigation, focus placement, clear, and no-match recovery.
- Search input is treated as text, not executable markup.
- Personal reading progress survives reload and can be reset.
- Deadline results, caps, special windows, blank input, and outside-source dates.
- PFI class results and invalid amount input.
- All source ATI example choices.
- All five correction checklist steps.
- Motion preference persistence and system reduced-motion behavior.
- Mobile menu open, close, Escape, and focus restoration.
- Working PowerPoint download.
- Print includes all three chapters and every expanded topic, then restores disclosure state.
- No horizontal page overflow at 320, 375, 390, 768, 1024, and 1440 pixels.
- Essential interactions work when browser storage is blocked.
- No browser JavaScript errors, HTTP asset failures, or external runtime requests were detected in these checks.

## Hosting and second-browser checks

Chrome and Edge both passed:

- A repository-style `/teacher-guide/` URL, using relative assets.
- Direct links to a selected chapter.
- Text coverage for every title, subtitle, card, list item, and key note in the 29 chapter topics.
- PowerPoint asset retrieval.
- The actual pointer-driven 3D transform and its motion-off behavior.
- Direct opening of `index.html` as a local file, with no server or installation.

Seven foreground/background token pairs exceeded 4.5:1 contrast: body 7.37, headings 13.61, secondary 5.41, metadata 4.96, primary button 6.26, blue callout label 5.37, and dark recap text 9.09.

Desktop, chapter, phone, and tool screenshots were inspected. The 320px headline overflow and a slightly weak metadata color were corrected before packaging.

## Practical limits

This is a locally verified package. A live GitHub Pages deployment has not been performed. Safari, Firefox, physical phones, and screen-reader sessions were not part of this verification. Keyboard and color checks are not a complete accessibility certification. The site is a source-based orientation and reference, not a connection to attendance or payroll systems.


## Teacher Quest release — November 5, 2026

- 53 automated tests pass: all original 44 policy tests unchanged, plus 4 source-content and 5 progress tests.
- 12 missions cover all 33 reviewed source sections. Exactly 24 questions: 20 choice, 2 matching, 2 ordering. Correct answers and explanations reviewed against content.js.
- Full Chrome journey completed every card and all 24 questions using the actual controls. Tested mistake/retry, explicit Continue, position resume, replay, reset, source links, summary gating, PNG download, optional-name non-persistence, blocked and invalid storage, and reduced motion.
- 16 Chrome game checks and 7 additional Edge checks pass. Edge checks include keyboard hints, matching and ordering mistakes/retries, feedback focus/live announcements, duplicate submit, overview source target, and preservation of readable progress when writes fail.
- All 26 existing guide browser checks pass; the overview source is now additionally available. Original chapter links, search, calculations, checklists, motion settings and PowerPoint remain working.
- Chrome and Edge project-subpath and local-file checks pass. Game layouts checked at 320, 375, 768 and 1440px; existing guide checked through 1024px too. No horizontal overflow detected.
- PNG visually inspected at 1200×1600. Print summary rendered and visually inspected as one A4 PDF page. It includes the checklist, Philippine completion date, source edition, website URL and local/unverified progress note.
- No game runtime errors in the complete journey. Existing guide checks found no failed assets or external runtime dependencies.
- Focus order, native buttons, heading focus, live regions and reduced motion were checked. A human screen-reader acceptance session was not performed.

Progress is personal to the browser/device and does not verify official attendance compliance. Optional names stay in memory only. No server, accounts or manager dashboard was added.


## Extra resources update — November 5, 2026

- User selected supplementary references while retaining the reviewed rules.
- Five original screenshots retained byte-for-byte, with readable tables, all seven OT entries and all eleven FAQ answers. Historical rates and undefined or conflicting terminology are marked.
- All 56 automated tests pass (44 original policy tests, 9 mission/content tests, 3 resource search/context tests).
- 18 resource browser checks pass across installed Chrome and Edge: five references/eleven FAQs, keyboard disclosure, source cautions, search and no-match recovery, global search, image decode/download links, links to reviewed rules, unchanged calculator result/question count, mission/resource navigation, 320/375/768/850/1440px overflow and no runtime errors.
- Original images are additional references only; no screenshot value enters the calculations or question answer keys. Existing learning progress uses the same versioned record.


## Premium worlds release — November 5, 2026

Current checks supersede earlier visual observations above.

- 58 automated tests pass, including all 44 original policy tests with unchanged expectations. New score/reset tests cover unique correct answers, reset state and preservation of the old object.
- The full Chrome UI journey passes 16 checks, visiting all 185 lesson cards, completing all 24 questions and 12 missions, downloading the personal PNG, and checking retries, resume, replay, source links, print summary, reduced motion, blocked/invalid storage and reset.
- 20 additional checks pass across installed Chrome and Edge. These cover five stages and twelve missions; world/stage filters; focused guide/tools/resources views; source navigation; original PFI calculator; resource and global search; byte-identical PDF download; PowerPoint retrieval; real Figma motion and pointer tilt; hover/focus pauses; manual and live system motion preferences; reset Cancel/Escape/Confirm; saved preferences; and zero runtime errors.
- Home, mission map, guide, tools, resources, direct missions and progress have no horizontal document overflow at 320, 375, 768, 850, 1280 and 1440 pixels.
- The PDF has 37 pages. Extraction verifies all 294 reviewed text fields and all 218 supplementary text fields. All pages were rendered in a contact sheet; cover, contents, rule and symbol pages were inspected at larger sizes. Symbols use an embedded symbol font. Original screenshots are included.
- Desktop and phone screenshots were visually inspected. The new design uses local native 3D shapes and no external runtime dependencies.

This verification record covers the local release candidate. Live deployment status is checked separately after publication. Physical devices, Safari, Firefox and a human screen-reader session were not tested.

- Four final hosting checks pass: Chrome and Edge at the GitHub project path `/teacher-attendance-guide/`, direct chapter links, complete source text, assets, tilt/motion controls, zero asset/runtime errors, and direct local-file opening. Seven tested color pairs exceed 4.5:1 (body 6.01, headings 13.88, secondary 5.95, metadata 4.90, primary button 6.86, note label 5.71, recap 9.09).


## Revised main orientation download

The supplied PDF is 32 pages, 720×405 points (16:9), unencrypted and contains no JavaScript. The main PDF asset is copied byte-for-byte from the user attachment. All orientation download controls use this file and a descriptive PDF filename; the previous generated-guide and PPTX labels are replaced. Existing missions, calculators and supplementary references are unchanged.


## Live PFI method update — November 6, 2026

- All 92 unit tests pass, including the unchanged original 44 policy tests and seven new portal-source tests.
- All seven original portal tables match the captured visible source cell-for-cell. All 13 approved full-day leave types are included. The complete portal was read before implementation.
- Chrome and Edge pass six-topic navigation, code lookup, single-code/mixed-code immunity lookup, portal/global search, no-match recovery, keyboard activation, heading focus, direct links, same-hash cross-source links, reduced motion and zero runtime/asset errors.
- Every topic has no horizontal overflow at 320, 375, 768 and 1440 pixels. Controls meet 48px minimum height. Desktop and phone layouts were visually inspected.
- Full-guide print opens every portal table, prints every original table cell (verified from the exported PDF text), and restores the selected topic and disclosures. A rendered U1/U2 page was visually inspected. The existing main orientation download remains unchanged.
- Existing sheet-calculator Chrome and Edge checks pass after integration. No portal data was substituted into the sheet's source rules, reviewed mission answers or original policy tests.

These are local release checks. GitHub workflow and live assets are verified separately after publication. Physical devices, Safari, Firefox and a human screen-reader session were not tested.
