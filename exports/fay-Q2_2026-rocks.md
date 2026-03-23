# Fay Edwards — Q2 2026 Rocks

## Double unit test coverage for new single-branch features from 35% to 70%
**ID:** DEV_Q2_2026_UTF
**Status:** On Track

**Outcome:** Unit test coverage for new single-branch features (IV/One Branch, DF, RTM, iVector Modules e.g. Offsite Payments) reaches 70%, measured by existing script. Measurement starts fresh on April 1st, including in-progress Q1 jobs but not completed ones, to avoid over-polluting the baseline.

### Milestones
- [ ] Process in place to flag tickets anticipated as missing unit tests (e.g. documentation wording changes) — all unflagged tickets will be expected to have tests — 7 Apr 2026
- [ ] Coverage at 40% — 14 Apr 2026 *(2-week milestone)*
- [ ] Coverage at 50% — 30 Apr 2026
- [ ] Coverage at 60% — 31 May 2026
- [ ] Coverage at 70% — 30 Jun 2026

**Risks**
- Too many features may be wholly unsuitable for unit tests, skewing the mix
- Coverage is currently only defined as unit tests being created, and therefore does not guarantee that those tests are adding substantial value (suggest looking into unit test value measurements in Q3/Q4).

---

## PoC AI agent builds a working iVector module on Universal API
**ID:** DEV_Q2_2026_UAI
**Status:** On Track

**Outcome:** A PoC AI agent builds a working iVector module on Universal API, demonstrated as a visible rendered page.

### Milestones
- [ ] Agent can confidently answer questions about the Universal API, always referring to the latest version — 14 Apr 2026 *(2-week milestone)*
- [ ] Agent has created reusable code for connecting to the Universal API — 30 Apr 2026
- [ ] Agent can create a new React solution from scratch that connects to the Universal API and has the ability to create the controls it needs — 31 May 2026
- [ ] Demonstrable page example of a React module built on top of Universal API by the agent — 30 Jun 2026

**Risks**
- Universal API is still in development — changes could destabilise the PoC
- iVector UI refresh theming may not be ready in time for the React controls

---
