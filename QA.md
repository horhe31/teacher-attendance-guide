# Verification record

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
