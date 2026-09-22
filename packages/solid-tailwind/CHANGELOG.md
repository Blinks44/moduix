# @moduix/solid-tailwind

## 2.0.0

### Major Changes

- c7359a1: Align the Solid and Tailwind adapter majors on the 2.x line now that the component set, contracts, tests, and styling tracks are in full parity with the React adapters.
  This alignment release carries no breaking API changes; the component fixes it ships are listed in this release.

### Minor Changes

### AngleSlider

- c7359a1: Redesign the dial as a circular track that fills from the top with a masked conic-gradient arc, a circle thumb matching the linear Slider, and the value text centered in the dial.
  `AngleSlider.Dial` now renders the centered `ValueText` between `Control` children and `Thumb`; the pointer press suppresses the keyboard focus ring during and after the drag while keyboard focus keeps its ring.
  The public `--moduix-angle-slider-*` variable set was retuned; the needle thumb, inner disc, center dot, and track/control border variables were removed.

### Patch Changes

### Carousel

- c7359a1: Use the ring color token for control hover and pressed border instead of a border/foreground mix.
- c7359a1: Keep component-owned `data-*` attributes applied after forwarded props in all components.

  Consumer-supplied `data-*` props no longer override `data-scope`, `data-part`, `data-slot`, `data-tone`, `data-indicator-position`, `data-size`, `data-variant`, and other state hooks that styles and tests rely on.

### Highlight

- c7359a1: Replace arbitrary box-decoration utilities with `box-decoration-clone` in Tailwind variants and drop the no-op font reset from CSS Modules variants.

### JsonTreeView

- c7359a1: Group the duplicated branch-control and item utility pairs in Tailwind variants and document that indentation guides ship unstyled.

### JsonTreeView

- c7359a1: Extract the duplicated Tailwind root class string into a shared constant, map `theme()` colors to CSS variables, and gate the row hover highlight behind pointer-capable media.

### Navigation Menu

- c7359a1: Expose `useNavigationMenu` from the NavigationMenu component entry point in Solid adapters, matching the React adapters.

### NumberInput

- c7359a1: Remove dead `data-focus` styles on triggers and input, bare `data-invalid` styles on triggers, and the no-op `border-x-current` utility.

### Pagination

- c7359a1: Treat explicit `false` children as empty triggers so they keep the fixed icon-trigger footprint, align the text-trigger padding fallback with the item default, and drop redundant line-height utilities from Tailwind variants.

### PasswordInput

- c7359a1: Route Solid `defaultValue` through a single force-prop mechanism and gate hover styles behind pointer-capable media while keyboard focus highlighting stays intact.
  Also exposes `PasswordInput`, `usePasswordInput`, and `usePasswordInputContext` as named exports from the React adapter and removes redundant line-height utilities from Tailwind variants.

### PinInput

- c7359a1: Remove redundant line-height utilities from Label and Input so presets can retune them.

### Popover

- c7359a1: Point the Tailwind arrow size at the real spacing token so the default arrow renders at full size again.

### Popover

- c7359a1: Align the header clear-icon reserve with the CSS Modules descendant rule, theme the arrow size through the spacing token, and export `PopoverRootProps` and `PopoverRootProviderProps` types from the React adapters.

### ProgressCircular

- c7359a1: Move the Tailwind indeterminate ring animation to the shared `moduix-progress-circular-indeterminate` keyframes so reduced-motion and preset tuning follow foundation tokens, and use `wrap-anywhere` for label text wrapping.

### QR Code

- c7359a1: Remove the redundant line-height utility from the download trigger.

### RadioGroup

- c7359a1: Remove dead indicator transition declarations and tie the slide timing to the foundation duration token through Ark's `--transition-duration`, so reduced-motion and preset tuning apply to the indicator.

### RatingGroup

- c7359a1: Restore the keyboard focus ring with `:focus-visible`, add reduced-motion guards to Tailwind indicators, and stop consumer `data-size` props from being overridden by the root.

### ScrollArea

- c7359a1: Keep the fade mask disabled in forced-colors mode by gating it behind `not-forced-colors`, and use the spacing token for the mask fade size.

### ScrollArea

- c7359a1: Match the Tailwind scrollbar growth timing with the CSS Modules track.

### SegmentGroup

- c7359a1: Default the shared `useSegmentGroup` hook to horizontal orientation so `RootProvider` compositions match the `Root` default, and align the Tailwind focus-ring offset with the CSS Modules track.

### Select

- c7359a1: Position the chevron indicator from the base Indicator class in Tailwind variants so advanced customizations match the CSS Modules layout, and route the popup z-index through the popup layer token.

### Select

- c7359a1: Drive trigger end padding from the placeholder-shown state instead of a clear-trigger `has()` selector so the padding stays predictable with custom triggers, and render the clear trigger before the indicator in advanced customization examples.

### Separator

- c7359a1: Privatize the internal per-size thickness plumbing and reset Tailwind root margins; per-size theming stays on the public `--moduix-separator-thickness-*` variables.

### Sidebar

- c7359a1: Remove the dead `sidebar-input` and `sidebar-separator` slot hooks, guard owned data attributes in Tailwind variants, and add the missing navigation sub-button focus ring.

### Signature Pad

- c7359a1: Restore the 36px clear trigger default and its CSS Modules focus-ring offset in Tailwind variants, and forbid `asChild` on `Canvas` so the fixed part tree cannot silently lose children.

### Slider

- c7359a1: Keep the owned read-only hook ahead of consumer props in Solid adapters.

### Split Button

- c7359a1: Fix the trigger padding specificity against size variants, forward Solid trigger refs through the trigger composition, add the overlay portal registry dependency, and share the menu popup classes with `Menu`.

### Steps

- c7359a1: Add the missing Next trigger hover to Tailwind variants and remove dead disabled-state defenses from prev/next triggers.

### Swap

- c7359a1: Keep the owned animation hook ahead of consumer props in every adapter and drop class declarations pinned by Ark inline styles.

### Switch

- c7359a1: Keep checked invalid borders visible in Tailwind variants, guard the owned size hook against consumer overrides, and align the width fallback geometry.

### Table

- c7359a1: Guard owned data hooks from consumer overrides in Tailwind variants, left-align Tailwind column headers, scope striped rows to the body, and add reduced-motion and hover guards.

### Tabs

- c7359a1: Tie the Tailwind indicator motion to foundation duration tokens so reduced-motion and preset tuning apply, keep the owned variant hook authoritative in every adapter, and drop the redundant vertical guard from the CSS Modules line selectors.

### Tag

- c7359a1: Match the Tailwind close-trigger hover alpha with the CSS Modules track.

### Tags Input

- c7359a1: Hide item delete triggers in read-only state so the presentation matches the documented contract, gate the delete-trigger hover behind pointer-capable media, and align Tailwind hover and focus details with CloseButton defaults.

### Text

- c7359a1: Make line clamp win over truncate deterministically in Tailwind variants instead of relying on generated CSS order.

### Timer

- c7359a1: Export `TimerSegmentsProps` from the React adapter so `@moduix/react/timer` types match the other adapters, and add reduced-motion guards to Tailwind action triggers.

### Toast

- c7359a1: Bake the closed-state easing into Tailwind transition shorthands, add reduced-motion parity, gate the action trigger hover behind pointer-capable media, and remove the never-functional close transition and z-index hooks along with stale documented defaults.

### Table of Contents

- c7359a1: Keep `useToc` reactive to late props in Solid adapters, apply full root props in the React `RootProvider`, expose the nav color variable, align the link focus ring and reduced-motion behavior between tracks, and document the `autoScroll` default.

### Toggle Group

- c7359a1: Compose items from the exported toggle variants instead of a duplicated recipe, re-export the composition types from the React adapter, and align the unselected item color with the documented color bridge contract.

### Toggle

- c7359a1: Render icon sizes square by moving the base minimum height into the size variants and restore the missing focus ring in the solid-tailwind variant.

### Tooltip

- c7359a1: Correct the documented shadow default, drop dead arrow declarations and the positioner max-height, theme the arrow size through the spacing token, add a popup z-index fallback to the Tailwind positioner, and export root props types from the React adapters.

### Tour

- c7359a1: Correct the documented content transition default to the popup motion tokens, align the spotlight layer index with backdrop and content, and export root props types from the React adapters.

### Tree View

- c7359a1: Render the checkbox indicator inside its documented `data-slot` wrapper in React adapters, share the Tailwind row recipe between branch control and item, and gate row hover behind pointer-capable media in CSS Modules.

### Typeset

- c7359a1: Tokenize the mark highlight and link focus ring, and document that `Typeset.Scroll` is designed to live inside a `Typeset` or `Typeset.Root` boundary.

## 1.1.1

### Patch Changes

### CommandPalette

- cbcda2a: Use the Ark UI Hotkeys export consistently across all adapters.

## 1.1.0

### Minor Changes

- 7af13b7: Fix reviewed component contracts, including stable styling hooks, Alert live-region semantics, Container width with `gutter="none"`, and Solid CommandPalette clear cancellation. Remove unsupported AngleSlider and Carousel API surface, and simplify Button styling internals.

### Patch Changes

- 7af13b7: Align component contracts across framework and styling adapters.
- 7af13b7: Preserve internal `data-slot` hooks and fix Tour overlay layering.

## 1.0.0

### Major Changes

- f022e4e: Publish the complete Tailwind CSS v4 component package with the same component subpaths as the CSS Modules distribution.
  Includes framework-native package exports, shared styles, presets, and shadcn-compatible registry items.

### Minor Changes

### Sidebar

- a333616: Add NavigationBadge for counts alongside navigation buttons.
- 9a1018a: Add explicit Menu viewport composition and preserve Solid bound button handlers.

### Alert

- 20bb7e9: Require `Alert.Content` to contain title, description, actions, and other message content.

### Patch Changes

### AspectRatio

- f022e4e: Limit default styling to the ratio container.
  Media sizing, fitting, clipping, and border radius are now consumer-owned, and `--moduix-aspect-ratio-radius` is removed.

### Badge

- f022e4e: Keep direct children unchanged and limit built-in interaction styling to links.
  Use `Badge.Label` explicitly for truncation; button hover and disabled presentation are now consumer-owned, and `--moduix-badge-opacity-disabled` is removed.
