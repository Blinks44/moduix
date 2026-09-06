---
name: migration-css-modules-to-tailwind
description: Port a shipped moduix component into both React and Solid Tailwind packages, including utilities, tests, stories, exports, npm output, and shadcn registries.
---

# CSS Modules to Tailwind Migration

Port one shipped CSS Modules component into `packages/react-tailwind` and
`packages/solid-tailwind` as a single parity task. Use this skill with `component-workflow`,
`conventions-css`, `conventions-react`, `migration-react-to-solid`, and `rstest-best-practices` according to
`AGENTS.md`; this skill owns the Tailwind-specific sequence and completion boundary.

## Reference and scope

Use Accordion as the working reference for file placement and distribution:

- `packages/react-tailwind/src/components/accordion`
- `packages/solid-tailwind/src/components/accordion`
- `packages/react-tailwind/tests/accordion.test.tsx`
- `packages/solid-tailwind/tests/accordion.test.tsx`
- both Tailwind playground Accordion stories
- both Tailwind package exports and registry items

Copy its mechanics, not its component-specific classes or dependencies. The existing Tailwind,
Rslib, Rstest, foundation, `cn`, Storybook, and `@source` configuration is package-wide; an ordinary
component port must not create or modify another build system.

The matching React and Solid CSS Modules implementations are the behavior and visual sources of
truth. The React implementation defines the established public product contract; the Solid
implementation defines native Solid mechanics. Do not change either CSS Modules package merely to
make the Tailwind port easier unless the task exposes a real shared bug.

Parity means the same public component API, anatomy, behavior, states, accessibility, and visual
defaults. It does not mean copying the CSS Modules customization mechanism into Tailwind. CSS
Modules may expose detailed `--moduix-<component>-*` variables, while Tailwind consumers customize
the copied or imported component through utilities and `className`/`class`.

Before writing code, check the component in both CSS Modules packages and inventory:

- parts, exports, props, defaults, callbacks, refs, contexts, providers, DOM and accessibility;
- its CSS Module selectors, tokens, public variables, states, responsive rules, animation, and
  reduced-motion behavior; classify variables as visual inputs rather than automatically carrying
  them into the Tailwind API;
- the React and Solid tests and their assertion parity;
- both CSS Modules playground stories and every exported scenario;
- internal icons, helpers, component dependencies, package exports, and registry dependencies.

If a required component dependency has no Tailwind port, establish the dependency order before
continuing. Do not import a CSS Modules component into a public Tailwind implementation and do not
hide a missing prerequisite behind a local adapter.

## Implement both runtime variants

Create the same component directory and re-export-only `index.ts` in both Tailwind packages.

- Build the React variant from the React CSS Modules contract using native React and `className`.
- Build the Solid variant from the Solid CSS Modules contract using native Solid, reactive props,
  `class`, and the verified Ark Solid API. Do not transliterate React hooks or ref mechanics.
- Preserve callable roots, namespaced parts, hooks, contexts, default children, `data-slot`, Ark
  `data-scope`/`data-part`, state attributes, runtime variables, and semantic hosts.
- Remove CSS Module imports. Component defaults belong in statically discoverable Tailwind class
  strings; never construct utility names from fragments.
- Put each part's static default utilities directly in that part's JSX `cn(...)` call. Do not hoist
  them into intermediate `*Class`, `*ClassName`, or similar constants. If Root and RootProvider share
  defaults, keep the complete static string on each component so copied shadcn source remains local
  and readable.
- Merge defaults with the package-local `cn` helper and pass the consumer `className` or `class`
  last so `tailwind-merge` can resolve conflicts in the consumer's favor.
- Reuse the foundation's Tailwind semantic theme utilities, shared keyframes, and framework-local
  icons. Add a shared foundation primitive only when both Tailwind runtimes genuinely need it.

## Translate styles semantically

Account for every meaningful CSS Module rule instead of converting only the resting appearance:

- layout, sizing, logical properties, typography, colors, borders, and overflow;
- hover, active, focus-visible, disabled, invalid, selected, open/closed, orientation, and other Ark
  states;
- nested parts, SVG sizing, responsive behavior, animations, hidden/presence handling, and reduced
  motion;
- Ark measurement and positioning variables required by the primitive.

Write Tailwind as Tailwind: prefer familiar utilities such as `gap-3`, `p-3`, `text-sm`,
`bg-muted`, `border-border`, and state variants. Foundation maps moduix semantic colors and shared
animations into named Tailwind utilities; use those names instead of embedding token variables in
arbitrary values. Use an arbitrary value only for a real one-off CSS value, calculation, selector,
or required Ark runtime variable.

Do not reproduce ordinary CSS Module customization variables for spacing, sizing, typography,
borders, opacity, or transitions. A rare component variable is justified only when it represents a
meaningful runtime or component-level concept that utilities cannot express clearly. Internal CSS
variables may coordinate complex selectors, but they are implementation details, not a mirrored
public token layer.

Keep the React and Solid Tailwind class semantics equivalent. Let the shared oxfmt configuration
sort class strings; do not add a second class-ordering tool. Tailwind Preflight is the reset, so
Tailwind variants must never import, publish, or registry-install the CSS Modules reset.

## Review anatomy and utility complexity after the port

After the initial port is visually and behaviorally equivalent, review each Tailwind part's anatomy
and static utility string before declaring the migration complete. The purpose is to identify an
awkward translation of the CSS Modules structure, not to minimize class count or imitate shadcn by
default.

Treat a long utility string as justified when it directly represents supported layout modes, Ark
states, accessibility or reduced-motion behavior, required runtime variables, or a genuinely
layered visual (for example, a dial built with pseudo-elements). Treat it as suspicious when it
uses conditional layout or deep structure-dependent selectors to compensate for an unclear public
anatomy; repeats conflicting layout declarations; targets unrelated parts from a parent; or carries
ordinary reset and token plumbing that Tailwind utilities or Preflight already express.

For every suspicious case, report it to the user after the port with:

- the component part and the relevant utility sequence;
- the CSS Modules rule and Tailwind behavior it is trying to preserve;
- why the complexity appears structural rather than intrinsic;
- the smallest viable simplification and its effect on public anatomy, visuals, and the four-package
  parity contract.

Use a comparable current shadcn component only as a reference for ergonomics; account for differences
in supported orientations, states, and visual scope. Do not silently simplify the component or
change its anatomy during the migration review. Wait for the user's decision before making an
architecture-level simplification. If no suspicious case remains, state that the review was performed
and why the longest utilities are warranted.

## Port behavioral tests

Create `tests/<component>.test.tsx` in both Tailwind packages from the matching runtime's CSS
Modules test, not from the other framework's test.

- Preserve behavior assertions for anatomy, semantics, ARIA, keyboard and focus behavior, state,
  callback details, refs, forms, providers, context, presence, and public data hooks.
- Adapt only framework syntax and testing-library setup; do not weaken assertions to obtain parity.
- In both Tailwind tests, add a focused assertion that a conflicting consumer utility replaces the
  corresponding default utility through `cn`/`tailwind-merge`.
- Assert meaningful hooks and conflict resolution rather than snapshotting a full formatted class
  string.

## Synchronize playground stories

Add the component to both Tailwind playgrounds. Keep the same Storybook title, exported story
names, scenario data, controls, layout, edge cases, and visual states as the corresponding React and
Solid CSS Modules stories.

Translate demo-only CSS Module classes into small, static Tailwind class strings in the story; do
not move demo layout into the library component. Keep React and Solid story code framework-native
and do not introduce shared cross-framework story helpers. If a scenario needs a missing Tailwind
component, port that prerequisite first or report the named scenario as deferred rather than
silently dropping it.

## Publish through npm and shadcn

For each Tailwind package:

- add the component subpath to `package.json` exports, preserving the package's React or Solid
  conditions and alphabetical ordering;
- add the package-owned `registry.json` item with framework-native source files and dependencies;
- depend on that runtime's Tailwind `foundation` and `cn` registry items, add `icons` only when the
  component uses them, and declare every direct component registry dependency;
- keep React registry items free of Solid dependencies and Solid items free of React dependencies.

The source glob already includes new components, and npm consumers already scan
`dist/components`; do not add a per-component Rslib entry or Tailwind `@source`. shadcn-copied source
is scanned inside the consumer project and also needs no package `@source`.

Run `pnpm run build:registry` after registry source changes and never edit
`website/docs/public/r` manually. If existing public documentation makes a component-specific
availability claim, update that claim and its install commands with the documentation skills; do
not expand an ordinary port into a full documentation rewrite. Create a changeset only when the
user explicitly requests one.

## Verification and completion

For an ordinary component port, verify in this order:

1. Run the focused React Tailwind and Solid Tailwind component tests.
2. Build both Tailwind packages and confirm the new JS/JSX declarations and component subpaths are
   emitted.
3. Build both Tailwind Storybooks and compare the same scenarios visually at representative states
   and viewports.
4. Generate and validate all registries, then inspect the two generated component items.
5. Run `pnpm run fmt:fix`, `pnpm run lint:check`, and `pnpm run tsc:check` from the repository root.

A fresh packed-consumer smoke test is required only when shared package exports, build configuration,
foundation delivery, `cn`, or registry infrastructure changes; do not recreate that test for every
ordinary component.

The port is complete only when both Tailwind packages preserve the CSS Modules components' public
API, behavior, anatomy, accessibility, states, and visual defaults through a native utility-based
styling implementation; both test suites preserve the runtime-specific behavior assertions plus
the consumer-override assertion; both playgrounds expose the same story scenarios; npm exports
build; and both shadcn registry items contain only valid framework-native dependencies. Report any
missing prerequisite or unavoidable Ark runtime difference instead of presenting partial work as
complete.