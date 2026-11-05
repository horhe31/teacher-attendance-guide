# Teacher field guide design patterns

## Intent

Teachers in the Philippines need to recognize the right rule, compare attendance evidence, and prepare corrections. The site should feel like a calm, clearly indexed handbook. It preserves source detail through progressive disclosure rather than deleting exceptions.

## Domain and signature

Domain concepts: clock-in records, dated schedules, Attendance INFO, approved leave, cutoff windows, incentive progression, attendance points, and correction evidence.

Color world: paper white, notebook gray, dark pen ink, timetable blue, and pale-blue index tabs. A single functional blue accent links actions, selected chapters, and key notes.

Signature: one attendance record, three portal outcomes. Layered portal cards introduce the concept; numbered chapter tabs, code-group rate rows, a date-result card, ATI bars, and the correction sequence repeat it in practical forms.

Defaults replaced: a generic dashboard becomes a learning path; oversized decorative 3D becomes subtle reference-card perspective; long policy walls become independently expandable source topics.

## Tokens and layout

- Light mode, always. Paper canvas `oklch(98% .006 265)`; raised paper `oklch(99% .003 265)`.
- Ink `#172a45`, reading text `#42536c`, secondary text `#58677e`, metadata `#5e6d83`.
- Timetable blue `#3652d8`, action hover `#263fae`, note tint `#e9edff`.
- Layered shadow depth only. Cards use low-opacity ink shadows; stronger shadows are reserved for the hero stack.
- Spacing base 8px; primary scale 8 / 16 / 24 / 32 / 40 / 48 / 64 / 96. Use 4px only for optical adjustments.
- Arial headlines, Segoe UI body; operating-system fallback fonts. No remote loading.
- Fluid headline scale. Minimum phone headline 2.85rem. Body 16px; generous 1.6 line height.
- Content width 1224px. Desktop side margins 48px; phone margins 20px.
- Cards 24px radius; large tool panels 32px; controls 10–12px; touch targets at least 44px.

## Interaction patterns

- Chapter and tool tabs implement arrow keys, Home, and End with roving focus.
- Topic disclosures use native `details` / `summary` semantics and keyboard support.
- Search covers all chapters and actions; no-match results explain how to recover.
- Forms have explicit labels and live results. Invalid and outside-source dates are different states.
- Reading progress is a personal bookmark, never a compliance acknowledgment.
- Motion uses transforms and opacity; optional pointer tilt is limited to the hero card stack. Reduced-motion settings disable animated movement. Essential information remains visible without animation.
- Print reveals every chapter and topic, then restores the reading state afterward.

## Craft review

Hierarchy: headline → three chapter choices → active chapter → source topics. Tools are separated from policy text. Primary actions use blue; notes use pale blue. No stock imagery, clip art, unrelated metrics, sign-in wall, or quiz.

The narrow-phone headline was adjusted after a 320px browser test exposed intrinsic grid overflow. This corrects the type scale rather than hiding overflow.


## Teacher Quest

A paper learning passport and raised numbered mission checkpoints give a clear next action. All missions remain open. Green checks label completion; amber feedback says Let’s review. Gentle 150–250ms transitions and perspective effects respect the existing motion toggle and reduced-motion setting. Reading text is 19–20px; game controls have at least 48px targets. On phones the checkpoint map becomes a single vertical path.

Practice uses explicit Check answer and Continue buttons. Matching and ordering never need dragging. Focus moves to the new step heading; answer changes retain keyboard focus; feedback is announced. Summary export is gated by all 12 stamps and names never enter storage.


## Premium learning worlds — current visual system

This section supersedes the earlier notebook styling. Pale periwinkle `#f3f5ff`, navy `#192545`, reading text `#4f5e7a` and sapphire `#4c45cf` form the base. Lilac identifies PFI, teal identifies ATI and peach identifies Ranking. Bahnschrift headlines pair with Segoe UI reading text and Consolas metadata; all fonts are local.

The signature is a learning archipelago: native CSS coins, a trophy and ranking steps on raised islands. Each world is a real button with an accessible name and opens its mission group. The map has five numbered sections, descriptive headings and a recommended next mission. Body rules remain 19–20px. Reset and map filter targets are at least 48px.

The Figma motion study is https://www.figma.com/design/1HljA1afT2hPLtI8HMNJQz . Node 2:3 moves vertically 0 → −14 → 0 over three seconds with ease-in-out segments. Its authoritative CSS custom-property keyframes are implemented on an inner wrapper. Pointer tilt stays on the outer wrapper. Text remains stationary. Hover and keyboard focus pause the floating targets. Offscreen and hidden-tab states pause work; reduced motion and the saved motion toggle stop animation.

The full-guide PDF is a separate reference download. Completion summaries remain gated by 12 stamps. Neither the practice score nor the summary represents official compliance.
