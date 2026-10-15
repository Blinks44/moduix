# Component Review Checklist

Each item names what to check and how. Examples come from the Accordion and Dialog reviews
(2026-10-13, reports in `audits/`); they show the kind of issue to look for, not a list to copy.

## Parity across frameworks

Start from `scripts/parity.mjs <slug>` output.

- Same exported names in every adapter. Type exports follow one rule everywhere
  (Accordion: Vue re-exported 15 Ark types, React and Solid none; Dialog: all export
  `DialogRootProps`).
- Duplicated literals inside one adapter (Accordion: identical root class string in `Accordion` and
  `AccordionRootProvider` in react-tailwind).
- One source for user-facing strings. The script lists them (Dialog: `a11yLabels.closeDialog` in
  CSS Modules React and Solid, a local `DEFAULT_CLOSE_BUTTON_LABEL` in React and Solid Tailwind, an
  inline string in both Vue adapters).
- Test sets match in substance across adapters; note adapters with clearly fewer tests (Dialog:
  vue-tailwind 6 browser tests against 9–11 elsewhere).
- `<slug>.md` presence and depth per adapter (Dialog: React 219 lines, Solid 67, Vue none).

## CSS Modules versus Tailwind

The script only compares Tailwind with Tailwind. Compare each CSS Modules rule with its Tailwind
counterpart by meaning:

- Values that come from foundation tokens in CSS Modules but are hard-coded in Tailwind (Accordion:
  `opacity-50`, `outline-2`; Dialog: `200ms`, `backdrop-blur-[4px]`). They drift when a preset
  (dense, soft, contrast) changes the token.
- Animations: same keyframes and the same tokens? (Dialog: Tailwind content reused the menu
  keyframes `animate-moduix-menu-*` instead of the dialog ones with `--moduix-popup-motion-*`.)
- Reduced motion uses one strategy (Accordion and Dialog CSS Modules shorten to 1ms so Ark presence
  still sees `animationend`; Dialog Tailwind uses `motion-reduce:animate-none`).
- Reduced motion in Tailwind: `motion-reduce:animate-none` or `motion-reduce:[animation-duration:1ms]`
  lose to `data-[state=open]:animate-*` because the data-state selector is more specific (check
  with `scripts/tw-css.mjs`). Reduced motion actually works only when the animation duration comes
  from foundation tokens (`--moduix-duration-*` drop to 0.01ms under reduced motion). Hard-coded
  durations such as `animate-[moduix-fade-in_200ms_ease-in-out]` therefore ignore reduced motion
  (Dialog Tailwind backdrop before the fix).
- Hover: CSS Modules wrap hover in `@media (hover: hover)`. Tailwind arbitrary variants such as
  `[&:not([data-disabled]):hover]:` do **not** get that media query (the built-in `hover:` does), so
  hover sticks after a tap on touch devices. Use the library pattern
  `[@media(hover:hover)]:[&:not([data-disabled]):hover]:` (Accordion Tailwind trigger before the fix).
- Keyframes defined both in the CSS Module and in `foundation/animations.css`: two sources of truth.

## Wrapper code

- Each part is a thin wrapper: class merge, `data-slot`, defaults. Flag any state, effect, or
  context that re-implements Ark.
- `ref` forwarding and `asChild` work on every part (React keeps `forwardRef` while React 18 is a
  peer dependency). Parts that style a native element should drop their styles under `asChild`
  (Dialog `DialogTrigger` does this correctly).
- Defaults that differ from Ark (Dialog: `lazyMount` and `unmountOnExit` default to `true`; Ark
  uses `false`) are documented in `<slug>.md` and covered by a test.
- `data-slot` position relative to the props spread is consistent, and the choice (overridable or
  not) is deliberate.
- Default children (icons, labels) can be replaced and removed; `aria-labelledby` passed by the user
  is not overridden by a default `aria-label`.
- Vue: props declared with `/* @vue-ignore */` still forward booleans, `v-model`, and emits through
  `attrs`; slots match what Ark exposes.
- `'use client'` is present in React adapters where needed.

## Styles

- Count public CSS variables:
  `grep -o "\-\-moduix-<slug>-[a-z0-9-]*" <css> | sort -u | wc -l`, and group them by prefix
  (`awk -F'moduix-<slug>-' '{split($2,a,"-"); print a[1]}' | sort | uniq -c`) to see which part owns
  most of them. Compare with the table in `<slug>.md`. Look for variables that only forward to
  another component's variables (Dialog close icon → `--moduix-close-button-*`), fallback chains
  three or more levels deep, and variables named after the wrong part (Dialog `.body` margin uses
  `--moduix-dialog-content-margin`).
- Parts that share one rule and one set of variables although they mean different things (Dialog:
  `.description, .body` share color and font variables, so the body is muted by default).
- Magic numbers without a comment (Accordion: `opacity: 0.01` in keyframes).
- Styling for rare modes or for paths the docs never use (Accordion: full horizontal-orientation
  layout; Dialog: native trigger styled as a second Button with 11 variables while every docs
  example uses `asChild` + `Button`).
- Reduced motion, RTL (logical properties, `text-align: start`), focus-visible ring, disabled state,
  `hidden` / `hidden="until-found"` handling.
- Default visuals compared with Chakra and shadcn: does the default look like the component's role
  (Accordion: grey-filled triggers looked like buttons; a plus rotated 45° reads as "close").

## Stress cases

Reason through these from the CSS, or render them in the playground story when you can:

- Long content: does it scroll, and where? A `max-height` without `overflow` lets content spill
  past the border (Dialog: an example had to set `max-height: none` to work).
- Long title or label next to an absolutely positioned control (Dialog: title runs under the close
  icon because the header reserves no space for it).
- Narrow viewport (320px): rows of buttons wrap or stack (Dialog footer did not).
- Many items, empty state, disabled items, nested instances.

## Accessibility

- Compare with the WAI-ARIA APG pattern for this widget, not only with Ark. Note gaps Ark leaves to
  the consumer (Accordion: no heading wrapper around the trigger, which shadcn adds as `h3`).
- Keyboard, focus, and ARIA come from Ark; confirm the wrapper does not break them (for example by
  replacing an element or overriding `role`).
- Default accessible names exist where the wrapper renders icon-only controls.

## Tests

- Tests should cover what the wrapper adds: classes, `data-slot`, default children, refs, `asChild`,
  portals, changed defaults, provider and context wiring, SSR (Vue). Note tests that only re-test
  Ark behavior multiplied across adapters: low value, not harmful.
- Missing coverage for wrapper-specific behavior is a finding.

## Docs and contract

- `<slug>.md` matches the current code. Look for changelog entries that contradict the current API
  (Accordion: entries said context and hooks were removed) and entries out of date order. Recommend
  keeping the current contract and dropping history that git already records.
- Examples in `website/src/components/examples/<slug>/`: which parts and props they use, which
  defaults they override (an override in every example points at a bad default).
- Sugar versus full composition: when the component has sugar parts (`*Field`, `*DayTable`, a
  default header, any part that renders a fixed child tree), ordinary examples use the sugar, and
  exactly one example (usually "Advanced customization") builds the whole component from the
  low-level parts without any sugar, in React, Solid, and Vue snippets alike. When adding or
  extending sugar, do not shorten that example with it; if the example is missing or still uses
  some sugar, add or complete it (DatePicker: month and year views had been switched to the new
  table sugar, which left no manual month/year composition in the docs).
- Registry JSON lists the right `dependencies` and `registryDependencies` (for example foundation
  animations for Tailwind keyframes).

## Upstream comparison

For Chakra UI v3 and shadcn record: parts in a typical usage, built-in versus explicit parts,
default icon and its animation, semantic wrappers, variants, sizes, placement, scrolling mode,
motion presets, mount defaults, behavior on narrow screens, theming mechanism. State what moduix
should adopt, and what it should deliberately not adopt and why.

## Before removing anything

- Variable families documented on a shared docs page (for example "Animations" → local exceptions)
  are a library mechanism, not component bloat.
- The same pattern in sibling components (native trigger styles in Dialog, Drawer, Popover) means
  a removal in one component creates a new inconsistency; report it.