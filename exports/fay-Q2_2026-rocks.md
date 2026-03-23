# Fay Edwards — Q2 2026 Rocks

## Double unit test coverage for new single-branch features from 35% to 70%
**ID:** DEV_Q2_2026_UTF
**Status:** On Track

**Outcome:** Unit test coverage for new single-branch features (IV/One Branch, DF, RTM, iVector Modules e.g. Offsite Payments) reaches 70%, measured by existing script. Measurement starts fresh on April 1st, including in-progress Q1 jobs but not completed ones, to avoid over-polluting the baseline. Execution involves ongoing refactoring to make code testable, co-ordinated across developers to avoid cross-overs, supported by new /refactor and /unit-test Claude Code skills to help developers add tests rapidly.

### Milestones
- [ ] Process in place to flag tickets anticipated as missing unit tests (e.g. documentation wording changes) — all unflagged tickets will be expected to have tests — 7 Apr 2026
- [ ] /refactor and /unit-test Claude Code skills built and available to the development team — 14 Apr 2026 *(2-week milestone)*
- [ ] Coverage at 50% — 30 Apr 2026
- [ ] Coverage at 60% — 31 May 2026
- [ ] Coverage at 70% — 30 Jun 2026

**Risks**
- Too many features may be wholly unsuitable for unit tests, skewing the mix
- Coverage is currently only defined as unit tests being created, and therefore does not guarantee that those tests are adding substantial value (suggest looking into unit test value measurements in Q3/Q4).

---
