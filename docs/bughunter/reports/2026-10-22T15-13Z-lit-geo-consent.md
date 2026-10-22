# Lit cookie geo-consent failure handling

- **Run:** `20261022T151139Z-cacf75eb28e848afa9d39a919bf6d3b8`
- **Workflow:** geo-consent lookup → session cache → cookie-consent mode → analytics consent state.
- **Base:** `qrati-connect-lit-example` `main` at `a231b64` (`a231b64` full SHA prefix from preflight).
- **Finding:** [moderate] Geo-consent HTTP failures could select opt-out and permit analytics without affirmative consent.
- **Issue:** https://github.com/qrati-labs/qrati-connect-lit-example/issues/3
- **Disposition:** narrow fix; reject non-OK and malformed responses as requiring consent; only cache validated boolean results (`src/lib/cookieConsent.ts`). No production action.

## Evidence and root cause
`checkConsentRequired()` fetched the geo endpoint and immediately parsed JSON without checking `response.ok` or ensuring `required` was boolean. A non-2xx response carrying `{ "required": false }` followed the normal path, cached `false`, then `initCookieConsent()` selected `mode: 'opt-out'` (`src/lib/cookieConsent.ts:32-68`). That violates the fail-closed behavior the catch block already applies to network/parse errors. Impact: analytics consent can be treated as granted-by-default after a geo service error.

The fix checks `response.ok`, validates payload object and boolean field, and returns `true` on either failure without caching. No other call sites exist in this repository. Report is limited to this example; endpoint implementation and live deployment were not inspected.

## Tests and verification
- Regression test: **not authored**. The repository has no test dependencies or test script; adding an unexecutable test would not provide verified coverage. Follow-up should add a deterministic test harness for non-OK `{required:false}` and malformed payload, with opt-in mode and no invalid cache write asserted.
- Tests/build/lint/type-check/install: not run, per BugHunter boundary.
- `git diff --check`: passed (exit 0).
- No CI run evidence available at report authoring.

## Timing (measured wall-clock)

| Phase | Segment start (UTC) | Segment end (UTC) | Elapsed |
|---|---|---|---|
| `preflight` | 2026-10-22T15:11:39Z | 2026-10-22T15:12:07Z | 00:00:29 (0.5 min) |
| `audit` | 2026-10-22T15:12:17Z | 2026-10-22T15:13:27Z | 00:01:10 (1.2 min) |
| **Total run** | 2026-10-22T15:11:39Z | 2026-10-22T15:13:27Z | **00:01:49 (1.8 min)** |
| Unclassified interval between marked phases | — | — | 00:00:10 (0.2 min) |

## Limitations
No browser/runtime test, actual geo endpoint response, deployed state, or CI outcome was verified. The PR must include `Fixes #3`; issue closes only on merge.
