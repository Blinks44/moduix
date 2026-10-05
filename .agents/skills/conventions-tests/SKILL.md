---
name: conventions-tests
description: Write, review, and simplify moduix tests while preserving public contracts and regressions. Use for component, helper, SSR, and browser tests across shipped adapters.
---

# Test Conventions

Use with `engineering-principles` and `rstest-best-practices`. For framework-specific test fixtures,
follow the matching native convention skill. `component-workflow` owns adapter parity.

## What to Test

- Start with the component contract, existing tests, and known regressions. Map each existing check
  to its replacement before deleting or moving a test.
- Prioritize observable behavior: interaction, controlled state, callback details, accessible names,
  focus, form submission/reset, disabled/read-only state, portals, refs, and native composition.
- Test moduix's additions and integration boundaries, not every upstream Ark implementation detail.
  Keep upstream-related checks that protect a documented contract or a real regression.
- Check public styling hooks and consumer overrides where they are contracts. Avoid snapshots of
  full markup, generated IDs, CSS hashes, or long class strings.
- Do not remove a meaningful scenario merely to reduce line count or make a test pass.

## Choose the Environment

- Target Node for pure helpers, filesystem checks, and actual server rendering; target Browser Mode
  for component behavior, layout, focus, and hydration. Browser tests use `*.browser.test.ts(x)`.
  Rendering server HTML inside a browser does not prove the component is safe without browser globals.
- During the staged migration, keep unmigrated tests in the existing DOM project. Review scenarios
  before moving them; do not retain duplicate DOM/browser coverage or weaken SSR checks to remove
  happy-dom sooner.
- Reuse Rslib transforms through the official adapter. Do not build a separate compiler pipeline.
- Use each framework's installed Testing Library for rendering, prop updates, and cleanup in both
  styling adapters. Register cleanup explicitly through Rstest. Do not add a second renderer,
  a cross-framework test DSL, or a local rendering abstraction.
- Import shipped foundation CSS in browser setup; component CSS comes through normal source imports.
  Keep the DOM and browser projects' file sets disjoint. Move tests rather than duplicate them.
- Tailwind browser projects use the official Rsbuild Tailwind plugin and a CSS entry scanning their
  own components/tests. Check computed CSS where layout, cascade or utility overrides matter;
  class presence alone does not prove the rendered result. Pure compiler checks stay in Node.
- For Vue SSR/hydration, reuse a small compiled SFC fixture. Node SSR must run without browser globals;
  browser hydration must preserve hosts/IDs and still support interaction. HTML rendered inside the
  browser is not a server-to-browser E2E pipeline. Always unmount/remove manually mounted hosts.
- In Vue Browser Mode render options, prefer slot functions returning text or `h()` VNodes.
  Vue Test Utils compiles string slots with `prefixIdentifiers`, which the browser compiler does
  not support. Use native slots instead of adding compiler aliases or a custom renderer.

## Keep Tests Direct

- Prefer role and accessible-name queries. Use native DOM queries for node identity, form data,
  containment, or public styling hooks.
- In Browser Mode, await `page` locator interactions and `expect.element` assertions.
  Use `expect.poll` for asynchronous callback/state values, not fixed sleeps.
- When timing is itself the contract (such as synchronous focus during pointerdown), dispatch
  the precise native event and assert immediately after dispatch. Retrying assertions can hide
  deferred behavior; synthetic dispatch does not verify trusted gestures or CSS `:active`.
- Wait for meaningful readiness before the next action: popup focus before keyboard input,
  initialized sizing before resize/collapse. Do not use forced clicks or artificial focus to bypass
  modal inertness or animation; hidden/background host contracts can be inspected with native DOM.
- For exact hover callback sequences, account for the pointer left by earlier tests: new elements
  under it can emit pointerover. Park it on a neutral element before mounting triggers if needed;
  do not hide those events by clearing callbacks or weakening expected payloads.
- Keep Testing Library focused on rendering. Prefer Browser Mode locators over its queries,
  user-event, and jest-dom matchers; use native DOM inspection for identity and FormData contracts.
- In DOM tests, use Testing Library's user interactions and retrying queries/assertions when needed.
  Reserve `fireEvent` for a specific event contract that user interactions cannot express.
- Keep fixtures local and small. Extract repeated component composition, not a configurable test DSL.
  Parameterize genuinely identical cases; keep different interaction sequences explicit.
- Combine duplicate setup/assertions into one coherent scenario when no independent behavior is
  lost. Remove checks of upstream internals only after confirming they protect neither a moduix
  public contract nor a known regression. Do not pursue a target test count.
- Mock external boundaries only when necessary. Prefer real browser APIs over global geometry,
  focus, scrolling, or observer mocks. Restore unavoidable mocks after their scoped use.
- Give layout fixtures explicit dimensions/overflow so the intended interaction is possible.
  Assert actual measurements and scroll targets, not zero-valued artifacts of a simulated DOM.

## Configuration and CI

- Follow `rstest-best-practices` for project configuration and centralized Playwright installation.
  Keep browser setup limited to cleanup and CSS; do not register DOM matchers there.
- CI installs the lockfile-pinned dependencies and Chromium with Linux dependencies before running
  all adapter suites in non-watch mode. Do not allow an empty package suite to pass silently.
- Test cache inputs include imported shared foundation sources as well as the package files;
  shared CSS/token changes must invalidate browser/CSS results without a prerequisite library build.
- Preserve isolation and default timeouts unless a measured problem justifies changing them.
  Do not add retries, suppress build warnings/errors, or skip regressions merely to obtain a green run.
- Browser migration can expose bugs hidden by emulated event timing. Reproduce suspected upstream
  failures with the bare primitive before changing wrappers. Only with explicit user approval,
  isolate the failing contract in a runnable skipped test, document the cause and re-enable condition,
  and keep independent behavior active; do not replace the failing assertion with a weaker one.

## Finish

- Run the affected environment and the existing counterpart suites. Retain framework-specific
  contracts rather than forcing identical assertions on different native APIs.
- Remove obsolete helpers, mocks, imports, fixtures, and duplicate tests introduced by the migration.
  Remove a dependency only when no remaining tests or tools use it.
- Follow root validation. Report changed coverage and any unresolved failures; fewer lines are not
  evidence that coverage, reliability, or execution speed improved.