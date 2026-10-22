# BugHunter audit index

| UTC | Workflow | Repository / base SHA | Outcome / severity | Tests and coverage | Research sources | PR / blocker |
|---|---|---|---|---|---|---|
| 2026-10-15 17:00 | Lit host widget initialization (CDN script/style, custom-element lifecycle) | `qrati-connect-lit-example` / `079fb4537866d4302257c551d6fcc831f1ba2d8e` | Report-only; no confirmed defect | No test suite; unit/integration/E2E not run; coverage not measured; build blocked (`pnpm` absent) | Lit lifecycle docs; MDN dynamic import docs | https://github.com/qrati-labs/qrati-connect-lit-example/pull/2 (head `1466abd`) |
| 2026-10-22 15:13 | Lit geo-consent lookup and analytics mode | `qrati-connect-lit-example` / `a231b64` | Moderate: fail-open on HTTP error; fixed narrowly | Regression test not authored; tests/build/lint not run (BugHunter boundary); `git diff --check` passed | Same-repo source trace; issue evidence | [Report](reports/2026-10-22T15-13Z-lit-geo-consent.md); PR pending |
