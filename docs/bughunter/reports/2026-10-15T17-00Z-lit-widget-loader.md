# Lit host widget initialization audit

- **Run:** 2026-10-15 17:00 UTC
- **Repository/base:** `qrati-connect-lit-example`, `main` at `079fb4537866d4302257c551d6fcc831f1ba2d8e`
- **Workflow:** browser mount → Lit host `connectedCallback()` → load widget stylesheet and dynamically import CDN web-component bundle → render `<qrati-connect>` with organization, theme, and hash router.
- **Outcome:** no confirmed defect; report-only. No product behavior was changed.

## Bounded dependency cone

Included `src/qrati-app.ts` lifecycle, module URL and organization config in `src/config.ts`, rendered custom element attributes, host stylesheet integration, and README integration claims. The package is loaded from an external CDN URL and is not bundled into this repository, so its implementation and deployed availability are outside this audit. Also excluded the independent cookie-consent workflow and application internals of the remote widget.

CodeGraph was initialized in this checkout and used first to trace `QratiApp.connectedCallback`, its config references, and the widget load boundary. The generated `.codegraph/` directory is untracked and is excluded from the PR.

## Findings

- **Critical/high/moderate/low: none confirmed.** `connectedCallback()` invokes Lit's superclass before host setup (`src/qrati-app.ts:22-27`); stylesheet insertion checks for an existing URL before appending (`:28-34`); the configured bundle is dynamically imported (`:35`). The import promise is not handled: a CDN/network/module-load rejection is therefore unobserved by this component and there is no user-visible load-failure state. This is a concrete resilience and test gap, but the repository does not define a desired retry/error UX, so I did not invent behavior or change product code.
- The README says the bundle and styles load once on mount (`README.md:13-20`), while the side effect is in `connectedCallback()`. Lit documents that custom elements can disconnect and reconnect; repeated connection can repeat the import call. The module loader normally resolves already-loaded modules from its module map, and the stylesheet lookup avoids duplicate links, so this is not established as a user-visible bug. No regression was demonstrated.
- `connectedCallback()` also runs `initCookieConsent()` (`src/qrati-app.ts:26`); consent behavior is explicitly outside this single-workflow audit and was covered in the preceding Svelte audit, so not re-audited here.

## Test quality and verification

- No test scripts or test dependencies are declared in `package.json`; no automated test suite exists. No new tests were warranted without an agreed failure/retry contract.
- Unit: not run; none present. Integration: not run; none present. E2E: not run; none present. Coverage: not measured.
- Build/type-check could not run: `pnpm --version` returned `pnpm: command not found` (exit 127). Dependencies are not available through the required package manager.
- Performance: not measured. No live CDN availability or deployed runtime was asserted.
- Static review covered re-connection, duplicate stylesheet insertion, and dynamic import rejection handling. Report-only changes add no runtime behavior.

## Recommendations

1. Define the intended user-visible behavior if the remote component bundle fails (for example, fallback messaging and whether retry is supported) before implementing recovery logic.
2. Add lifecycle-level tests for initial connection and reconnection, including import/style deduplication, once a test harness and stable loader seam are selected.
3. Add a failure-path test alongside any future error/retry behavior; avoid treating mocked `import()` as proof of CDN integration.

Lit documents that custom elements may reconnect and describes the responsibilities of `connectedCallback()` and `disconnectedCallback()`.[1] MDN documents dynamic `import()` as runtime module loading; this audit uses that to frame the unhandled asynchronous load boundary.[2]

## Commands and results

- `gh auth status`: authenticated as `qratilabsagent`.
- `git status --short --branch`, `git rev-parse HEAD`, `gh pr list --state open`: clean `main` base at the SHA above; no pre-existing open PR in this repository.
- `codegraph init`: indexed 8 files, 40 nodes, 54 edges.
- Focused source/README/config/package inspection: completed.
- `pnpm --version`: blocked by missing executable; build/test execution not possible.
- PR: report-only feature branch; see final job receipt for current head and CI state.

## Sources

[1] https://lit.dev/docs/components/lifecycle — Lit lifecycle documentation
[2] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import — MDN dynamic import documentation
