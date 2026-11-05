# Teacher field guide — Attendance, made clear

A self-contained, interactive website based on **Teacher Attendance Rules Orientation 2026 — Revised Version**, reviewed November 5, 2026.

## Open it

Double-click **index.html** in this folder. No installation, account, API key, paid service, or build step is needed. Keep the files and the `assets` folder together.

For a local web preview, if Python is installed, run this command in this folder:

```sh
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a repository in your GitHub account.
2. Upload **the contents of this folder** to the repository root. `index.html` must be at the root, beside `styles.css`, `app.js`, `rules.js`, and `content.js`. Also upload the complete `assets` folder. Do not upload just the ZIP.
3. Commit the uploaded files to your main branch.
4. Open **Settings → Pages** in the repository.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose your main branch, select **/ (root)**, and click **Save**.
7. Wait for GitHub to finish deploying. Open the website URL shown in Pages settings.

Relative file paths support both an account site and a project URL such as `https://USERNAME.github.io/REPOSITORY/`. There is no React/Vite build or Actions workflow to configure. In-page navigation uses anchors, so refreshing a chapter does not require server routing.

GitHub Pages websites are normally public, including sites published from private repositories. This package includes the orientation's internal attendance rules and its PowerPoint; select sharing that is appropriate for that information before publishing. This package does not provide access control. See [creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [configuring the publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## What teachers can do

- Browse **PFI**, **ATI**, and **Monthly Ranking** chapters.
- Search all rules and jump straight to a matching topic.
- Open a topic, or expand all topics in a chapter.
- Find a filing deadline within the source's November 2026 windows.
- Enter Gross PFI to view the corresponding class and three code-group rates.
- Switch between the original ATI progression examples.
- Mark chapters as read, with anonymous progress saved on the same device.
- Check the five correction steps, print the full guide, or download the PowerPoint.
- Turn off animation; device reduced-motion preferences are also respected.

## Content boundaries

The guide uses only the reviewed wiki content and its presentation conversion. It does not connect to company records, submit corrections, calculate a teacher's final entitlement, or confirm that a manager has seen an acknowledgment.

The deadline finder applies the source's **2026** rules. It does not extrapolate these windows to another month or year. Event dates are day zero; five calendar days and the earlier cap are applied in UTC calendar arithmetic, while results are displayed with the source's **11:59 PM Philippine time** deadline.

The PFI tool shows reference amounts **before immunity**. The ATI tool displays the document's existing examples; it does not estimate a personal payout. Undefined source acronyms, including SPL and VAWC, are retained unchanged.

Source: [Teacher Attendance Rules Orientation 2026 — Revised Version](https://zp9fxvayn6g.jp.larksuite.com/wiki/JM6UwoJcAi2l34kglNYj5jYDpRb). Source section references are shown inside each expanded topic. The included PowerPoint contains source notes.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, navigation, tool forms, correction checklist |
| `styles.css` | Responsive layout, design tokens, 3D depth, motion, print styling |
| `app.js` | Chapter navigation, search, tool interactions, reading progress |
| `content.js` | Complete reviewed rule content and source references |
| `rules.js` | Pure deadline, Gross PFI class, and ATI example functions |
| `assets/mark.svg` | Local icon |
| `assets/teacher-attendance-orientation.pptx` | Downloadable source-based presentation |
| `tests/rules.test.cjs` | Automated policy boundary tests |
| `DESIGN.md` | Reusable visual and interaction patterns |
| `QA.md` | Verification record and practical limits |
| `.nojekyll` | Serves the folder as static files on GitHub Pages |

## Updating the rules

1. Verify the new source first. Do not replace dates just because the month changed.
2. Update `content.js` and the source references.
3. If a numeric rule changes, update `rules.js` and its boundary tests together.
4. Update the visible edition labels, deadline help, and applicable date limits in `index.html`.
5. Replace the PowerPoint if its content changes.
6. Run the tests, inspect desktop and mobile layouts, then commit the update.

With Node.js installed, run the policy tests from this folder:

```sh
node --test tests/rules.test.cjs
```

## Device storage

Only a list of read chapters and the motion setting are stored, under `teacher-field-guide-2026-v1`. No teacher name, employee number, attendance record, or tool input is sent or stored. Reading progress stays on that browser/device. If storage is unavailable, progress still works for the current visit. **Reset progress** clears the reading marks. The correction checklist resets on reload.

No analytics, remote fonts, external scripts, or runtime network services are used.
