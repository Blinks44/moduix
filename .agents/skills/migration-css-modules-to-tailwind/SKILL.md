---
name: migration-css-modules-to-tailwind
description: Port a shipped moduix component from CSS Modules to Tailwind across every shipped framework adapter, verify distribution, and review or simplify affected implementations against current shadcn.
---

# CSS Modules to Tailwind Migration

Port one shipped component from each framework's CSS Modules adapter into its Tailwind counterpart
as one parity task. React and Solid are the current shipped adapter pairs; include future adapters
only after their source and Tailwind packages exist. The outcome has two parts:

1. a correct, framework-native Tailwind port with tests, stories, exports, builds, and registries;
2. a post-port review that identifies justified differences and avoidable styling or composition
   complexity across all affected packages, and implements shared simplifications only when authorized.

Use this skill with `component-workflow`, `conventions-css`, the applicable framework convention
skill, and `rstest-best-practices` as routed by `AGENTS.md`. Use `research-upstream-libraries` for
current Ark and shadcn sources. Do not load `migration-component-to-solid` or
`migration-component-to-vue` merely because their target framework has a Tailwind package; use a
framework migration skill only when that framework adapter itself is missing or being repaired.

## Sources and boundaries

The matching CSS Modules implementation for each shipped runtime is the behavior and visual source
for its Tailwind port. The shared public contract and Ark behavior define cross-framework parity;
each existing adapter defines its native mechanics. Read every affected implementation, style,
test, story, package export, registry item, and component-local markdown before editing.

Parity means the same public component behavior, anatomy, accessibility, states, and visual defaults.
It does not mean copying the CSS Modules customization mechanism: detailed component variables may
remain CSS Modules-only while Tailwind consumers use utilities and `className`/`class`.

Parity and ownership can expose a conflict: an existing CSS Modules default may style arbitrary
consumer children even though those children should own their presentation. Do not silently make
the Tailwind packages behave differently. For a parity-only migration, preserve the established
behavior with the narrowest temporary selector and record the ownership problem in the
`Simplification review`. When the task authorizes shared simplification, remove that behavior from
all affected packages and move the presentation into stories and examples that own the content.

Use existing Tailwind components as mechanical references:

- Accordion for file placement, Ark runtime states, tests, exports, and distribution;
- Alert and Badge for `cva` recipes selected by public props.

Copy mechanics, not their component-specific classes or dependencies. Do not import a CSS Modules
component or reset into a Tailwind package. Do not change build, Rslib, Rstest, Storybook, or
`@source` configuration for an ordinary component port.

Do not change CSS Modules implementations merely to make the port easier. The later
simplification review may recommend a cross-variant change, but implement it only when the user's
request already authorizes that broader work or after the user accepts the recommendation. A real
shared bug discovered during the port must be reported instead of silently copied. Fix it only when
the request includes that work; then use `component-workflow` to synchronize affected variants.

If a required component dependency has no Tailwind port, establish and report the dependency order.
Do not hide the missing dependency behind a CSS Modules import or local adapter.

## 1. Inventory the contract and style ownership

Record the existing contract:

- public names, callable roots, namespaced parts, props, defaults, callbacks, refs, contexts, and
  providers;
- DOM anatomy, semantic hosts, ARIA, keyboard, focus, forms, lifecycle, and `asChild` behavior;
- Ark `data-scope`/`data-part`, public `data-slot` hooks, states, orientation, presence, responsive
  behavior, and runtime measurement variables;
- visual defaults, CSS selectors, tokens, component variables, animations, reduced motion, and
  every story scenario;
- helpers, icons, component dependencies, exports, and registry dependencies.

Make a declaration-level translation ledger for the stylesheet. Classify every meaningful
declaration as one of:

1. component-owned behavior or presentation to translate into a utility;
2. required Ark/runtime behavior or internal coordination to preserve explicitly;
3. already guaranteed by Tailwind Preflight, the semantic host, or inheritance, and therefore omit;
4. consumer-owned presentation that should not become a Tailwind default;
5. questionable shared behavior to preserve temporarily for parity and report for cross-variant
   simplification.

This ledger may stay in working notes, but unresolved declarations are not optional. Do not treat a
CSS declaration as meaningful merely because it exists in the source stylesheet.

Classify who owns every styled element:

1. Wrapper-owned markup receives utilities directly on that element.
2. Ark-owned elements receive utilities on the corresponding Ark part.
3. A focused descendant selector is allowed only for a real child contract such as normalized SVG
   icons, or for runtime state observable only from an ancestor.
4. Arbitrary consumer-owned descendants own their own utilities unless the public API exposes a
   styled part for them.

CSS Modules often repeat a class selector as a `data-scope`/`data-part` fallback. Preserve the data
hook, but do not recreate that global stylesheet as a chain of
`[&_[data-slot=...]]:<utility>` classes on a Tailwind root. With `asChild`, merge root defaults onto
the replacement host; consumer-supplied inner markup remains consumer-owned and consumer-styled.

Record any contradiction between visual parity and ownership instead of resolving it accidentally.
Do not introduce a public part, wrapper, context, child transformation, or implicit label merely to
make styling convenient.

## 2. Implement native Tailwind variants

Create matching component directories and thin framework-appropriate `index.ts` files in every
affected Tailwind package. React and Solid use re-export-only barrels; Vue may use a thin assembly
barrel for namespaced SFC parts.

- Implement React from the React contract with native React, `className`, and the real ref contract.
- Implement Solid from the Solid contract with native reactivity, `splitProps`/`mergeProps` where
  appropriate, `class`, and verified Ark Solid APIs. Do not transliterate React hooks or ref
  mechanics.
- Implement Vue from the Vue CSS Modules contract as native `.vue` SFCs with
  `<script setup lang="ts">`, `class`, slots, fallthrough attrs, and verified Ark Vue APIs. Do not
  introduce TSX or translate React and Solid runtime mechanics into Vue.
- Preserve API, default anatomy, semantics, accessibility, behavior, Ark state attributes, public
  data hooks, runtime variables, and visual defaults.
- Keep callable and namespaced component shapes aligned with their CSS Modules counterparts.
- Remove all CSS Module imports. Keep every utility statically discoverable; never assemble utility
  names from fragments.

Choose styling by ownership and state source:

- Fixed default: put named utilities directly on the owning part.
- Public part accepting a consumer class: use `cn(defaults, consumerClass)` with the consumer class
  last.
- Public prop selecting mutually exclusive visual classes: use a component-local `cva` recipe and
  pass the prop directly; keep the data attribute only as a hook.
- Ark or DOM runtime state: use the documented `data-*`, ARIA, pseudo-class, group, or peer variant.

If repeated render branches make part styling awkward, revisit the owned anatomy. Do not hide fixed
classes in unrelated constants or move them to ancestor descendant selectors merely to avoid local
duplication.

Do not style a render-time prop through `data-[prop=value]`; its higher selector specificity can
prevent a plain consumer utility from overriding the selected default. Verify that `cn` and
`tailwind-merge` remove the actual conflicting default, not merely an unrelated base utility.

## 3. Translate CSS as Tailwind

Account for layout, logical properties, typography, sizing, colors, borders, overflow, interactive
and Ark states, nested supported parts, responsive behavior, animation, presence, and reduced
motion.

Before translating reset-looking declarations, inspect the actual semantic host and Tailwind
Preflight. Omit defaults already guaranteed by them, including redundant margin, border,
`box-sizing`, font, color, line-height, and media display rules. Do not assume a reset is redundant:
remove or omit it only after verifying the relevant computed styles in every affected Tailwind playground.
Keep a declaration when it protects a supported `asChild` host that Preflight does not normalize.

Prefer existing semantic utilities such as `gap-3`, `size-5`, `rounded-full`, `text-sm`, `bg-muted`,
and `border-border`. Verify that a claimed foundation utility actually exists. When only a shared
runtime token or keyframe exists, either use a focused unambiguous arbitrary property or add a named
foundation utility when multiple Tailwind runtimes genuinely need that semantic primitive.

When adding a named foundation theme value, update every affected Tailwind package's local class merge
configuration if `tailwind-merge` cannot infer its suffixes. Namespace custom suffixes so they do not
alter unrelated standard utilities; for example, prefer semantic `space-lg` over a generic `lg`
spacing token that could also change `max-w-lg`.

Classify every CSS variable:

1. Preserve Ark/runtime measurement and positioning variables required for behavior.
2. Keep an internal coordination variable only when multiple owned parts genuinely share a dynamic
   value.
3. Replace a CSS Modules customization variable that only wraps a fixed color, spacing, size,
   radius, border, typography, opacity, duration, easing, transition, or animation default with the
   corresponding utility.

Do not copy `--moduix-<component>-*` fallback chains into Tailwind for styling parity. Tailwind
consumers customize through utilities and `className`/`class`. Retain a component-prefixed variable
only for required runtime behavior, genuine internal coordination, or explicitly requested
cross-track CSS-variable compatibility. Justify every retained variable and report a compatibility
exception as a non-native Tailwind API.

### Fixed-style variable gate

Do not introduce a component-local variable merely to carry a fixed prop variant such as spacing,
typography, radius, color, or size from a root to its slots. That is CSS Modules translation, not
internal coordination. Put the selected utilities on the owning part; when a root state must affect
a slot, prefer a named `group-data-*`/`peer-data-*` variant. Use a local variable only when its
value is genuinely runtime-dynamic and multiple owned parts must consume it.

Before tests, search every affected Tailwind component directory with
`rg -n '\[--[^]]+\]|var\(--' packages/*-tailwind/src/components/<component>`. The result must be empty
or every match must be named in the handoff as an Ark/runtime variable, with its producer, consumer,
and reason a utility cannot express it. A fixed-style variable is not an exception.

Use arbitrary values only for a genuine one-off value, calculation, logical property without a
utility, documented selector, or required runtime variable. Avoid ambiguous shorthand. For example,
`border-[var(--width)]` may compile as `border-color`; prefer `border-2`, or use the explicit
`[border-width:var(--runtime-width)]` when the variable is required. Inspect generated CSS for every
variable-backed or otherwise ambiguous arbitrary utility.

Before continuing, search every affected Tailwind component directory for component-specific variables and
justify every remaining match. Also confirm that inherited behavior such as `currentColor` has not
been wrapped in a needless component variable.

## 4. Tests and stories

Port each runtime's own CSS Modules tests into its Tailwind package. Preserve behavioral assertions
for anatomy, semantics, ARIA, keyboard and focus, callbacks, refs, forms, context, presence, state,
and public hooks. Adapt framework syntax only.

Add Tailwind-specific coverage that:

- proves a conflicting consumer utility replaces the selected default;
- asserts the small set of utilities that makes each component-owned empty visual part visible,
  rather than checking only that the DOM node exists.

Do not snapshot complete class strings. JSDOM class assertions complement but do not replace browser
computed-style checks.

Add scenario-equivalent, framework-native stories to every affected Tailwind playground. Preserve exported
story names, controls, states, edge cases, and demo layout. Translate demo CSS into small static
Tailwind strings. Consumer-owned `asChild` content must carry its own visual utilities; do not add a
descendant bundle to the component root to keep demo markup unstyled.

Translate CSS by emitted property semantics. In particular, verify shorthands and layered values
such as `background` versus Tailwind's `background-color` and `background-image` utilities. Confirm
that empty decorative elements remain visible, sized, colored, and rounded in the browser.

Do not silently omit a story that requires an unavailable Tailwind dependency. Port the prerequisite
first or report the component migration as incomplete.

## 5. Exports and registries

For every affected Tailwind package:

- add the component subpath export in alphabetical order;
- add a package-owned registry item with framework-native files and dependencies;
- depend on that runtime's Tailwind `foundation` and `cn` items, plus icons and component items only
  when directly used;
- add `class-variance-authority` to package runtime and registry dependencies when the component uses
  `cva`;
- keep every registry item free of dependencies from other framework adapters.

The existing source globs already build component files and shadcn-copied source is scanned in the
consumer project. Do not add per-component Rslib entries or `@source` rules.

Run `pnpm run build:registry` after registry source changes; never edit `website/docs/public/r`
manually. For a parity-only port, update public documentation only when existing availability or
install guidance became incorrect. If an authorized shared simplification changes ownership,
anatomy, behavior, visual defaults, or customization, synchronize component-local contracts,
runnable examples, CSS-variable references, and every maintained locale. Create a changeset only
when explicitly requested.

## 6. Verify the port

1. Run focused component tests in every affected Tailwind package.
2. Build every affected Tailwind package and confirm implementation and declaration output for the subpath.
3. Build every affected Tailwind playground and compare matching scenarios in a browser.
4. Inspect computed styles for default component-owned visual parts and the `asChild` replacement
   host: dimensions, visible paint, radius, and animation where applicable.
5. Inspect generated CSS for arbitrary utilities whose emitted property is not self-evident.
6. Generate and validate registries, then inspect every affected generated component item.
7. Run `pnpm run fmt:fix`, `pnpm run lint:check`, and `pnpm run tsc:check` from the repository root.

A passing unit test, a class token in the DOM, or a text-only Storybook snapshot does not prove visual
parity. A packed-consumer smoke test is additionally required only when shared exports, build
configuration, foundation delivery, `cn`, or registry infrastructure changed.

When an authorized simplification changes the CSS Modules implementations or shared public
contract, repeat the relevant tests, package builds, playground scenarios, and browser checks for all
affected variants, not only the Tailwind counterparts. Search for and remove dead foundation variables,
documentation references, test assumptions, and generated registry content before completing.

## 7. Review whether all affected variants should be simpler

Only after the Tailwind port is correct, re-open every affected moduix implementation and find the current
official shadcn documentation and registry source for the same component. Record source URLs and
access date. If no counterpart exists, say so and still perform the internal cross-variant review.
Use a nearby shadcn component only when its responsibility and anatomy are genuinely comparable, and
label that comparison approximate. Do not rely on memory or local snapshots.

Use shadcn as a complexity and ergonomics reference, not as the behavior source of truth. Compare:

- public and component-owned parts, wrappers, providers, contexts, and ownership boundaries;
- styling/composition props and variants;
- component-owned style-rule or utility volume and the longest style clusters;
- arbitrary values, component variables, descendant selectors, pseudo-elements, and runtime state
  selectors;
- accessibility, Ark behavior, states, orientations, responsive behavior, and visual capabilities
  that shadcn may not support.

Treat API simplicity as consumer ceremony, not only as an export or line count. Explicitly check the
callable root and `Root` alias, required wrappers in the smallest useful example, parts that always
travel together, presentation-only parts, overlapping aliases, styling props, and whether a common
composition requires more nesting than its behavior or accessibility needs.

Explicitly audit the failure modes that a declaration count alone misses:

- browser resets or inherited values repeated despite Preflight;
- arbitrary descendants styled from a root instead of by an exposed owned part;
- children wrapped, rewritten, or assigned an implicit part only to support styling;
- wrappers, providers, contexts, or runtime branches that exist only for presentation;
- interaction inferred broadly from tag names or roles instead of a documented component/Ark state;
- hover, disabled, cursor, truncation, or media-fit policy imposed on consumer-owned content;
- component variables that only alias fixed utilities or `currentColor`;
- styling rules, tokens, parts, tests, or documentation left dead after simplification.

Include compact evidence: part and wrapper counts plus approximate rule/utility counts when the
difference is material. Do not count framework syntax or required Ark plumbing as styling
complexity.

If moduix is several times more complex, account for the difference requirement by requirement.
Extra complexity is justified only by an intentional capability, accessibility or Ark requirement,
visual contract, runtime measurement, or supported state. Historical CSS structure, copied fallback
variables, redundant wrappers, speculative flexibility, and selectors compensating for unclear
ownership are candidates for removal.

Fix ordinary Tailwind translation mistakes during the port. Do not silently change shared anatomy,
behavior, or CSS Modules implementations merely because shadcn is smaller. A simplification that
affects the existing contract is a cross-variant product change: report it and wait for the user's
decision unless the original request authorizes that broader refactor.

When broader simplification is authorized, implement the smallest coherent cross-variant change in
the same task. Keep intentional accessibility and Ark behavior, remove presentation-only plumbing,
move consumer-owned styling into examples, and synchronize tests, stories, contracts,
documentation, foundation tokens, and registries according to the actual impact. Re-run the
cross-variant checks before deciding whether more simplification is warranted.

### Mandatory simplification handoff gate

Before writing the final response, answer all of these explicitly:

1. How many public parts and component-owned wrapper elements exist before and after the port or
   simplification?
2. What is the minimum consumer markup for a representative basic use case, and can any required
   wrapper or part be removed without weakening behavior, accessibility, styling ownership, or
   supported customization?
3. Which parts, aliases, props, selectors, or runtime branches exist only for presentation or
   historical structure?
4. Which simplifications were applied, and what concrete complexity did each remove?
5. What is the smallest remaining justified simplification proposal, including whether it is
   breaking and which packages and distribution surfaces it affects?

A migration handoff containing only changed files and validation results is incomplete. If the
audit finds no worthwhile change, answer every gate item briefly and state `No simplification
recommended`; do not invent a reduction merely to satisfy the gate.

Finish every migration handoff with a `Simplification review` containing:

- the shadcn source, or a statement that no counterpart exists;
- justified moduix differences;
- ordinary Tailwind translation mistakes fixed during the port;
- each unnecessary or questionable shared complication and where it appears;
- shared simplifications already applied when authorized, with before/after evidence;
- the smallest remaining proposed simplification;
- affected package variants and any API, anatomy, behavior, visual, test, story, documentation, or
  registry impact;
- `No simplification recommended` when all material differences are justified.

## Completion

The migration is complete only when every shipped Tailwind implementation preserves the existing
contract through native utilities; focused tests, package builds, playgrounds, browser
visual checks, exports, and registries pass; unexplained component styling variables and ambiguous
arbitrary utilities are absent; redundant Preflight defaults and unresolved ownership conflicts are
absent or explicitly reported; any authorized shared simplification is verified across all affected
variants and documentation; and the final report includes the evidence-backed cross-variant
`Simplification review`.