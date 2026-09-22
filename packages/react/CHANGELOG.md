# moduix

## 2.8.0

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

- c7359a1: Extract the duplicated Tailwind root class string into a shared constant, map `theme()` colors to CSS variables, and gate the row hover highlight behind pointer-capable media.

### Navigation Menu

- c7359a1: Align the viewport enter/exit keyframes with the shared popup motion so reduced-motion and preset tuning follow foundation tokens, and document the `ViewportPositioner` `align` prop.

### NumberInput

- c7359a1: Remove dead `data-focus` styles on triggers and input, bare `data-invalid` styles on triggers, and the no-op `border-x-current` utility.

### Pagination

- c7359a1: Treat explicit `false` children as empty triggers so they keep the fixed icon-trigger footprint, align the text-trigger padding fallback with the item default, and drop redundant line-height utilities from Tailwind variants.

### PasswordInput

- c7359a1: Route Solid `defaultValue` through a single force-prop mechanism and gate hover styles behind pointer-capable media while keyboard focus highlighting stays intact.
  Also exposes `PasswordInput`, `usePasswordInput`, and `usePasswordInputContext` as named exports from the React adapter and removes redundant line-height utilities from Tailwind variants.

### Popover

- c7359a1: Align the header clear-icon reserve with the CSS Modules descendant rule, theme the arrow size through the spacing token, and export `PopoverRootProps` and `PopoverRootProviderProps` types from the React adapters.

### ProgressCircular

- c7359a1: Move the Tailwind indeterminate ring animation to the shared `moduix-progress-circular-indeterminate` keyframes so reduced-motion and preset tuning follow foundation tokens, and use `wrap-anywhere` for label text wrapping.

### ProgressLinear

- c7359a1: Remove the duplicated vertical grid-template-columns declaration.

### RadioGroup

- c7359a1: Remove dead indicator transition declarations and tie the slide timing to the foundation duration token through Ark's `--transition-duration`, so reduced-motion and preset tuning apply to the indicator.

### RatingGroup

- c7359a1: Restore the keyboard focus ring with `:focus-visible`, add reduced-motion guards to Tailwind indicators, and stop consumer `data-size` props from being overridden by the root.

### SegmentGroup

- c7359a1: Default the shared `useSegmentGroup` hook to horizontal orientation so `RootProvider` compositions match the `Root` default, and align the Tailwind focus-ring offset with the CSS Modules track.

### Select

- c7359a1: Drive trigger end padding from the placeholder-shown state instead of a clear-trigger `has()` selector so the padding stays predictable with custom triggers, and render the clear trigger before the indicator in advanced customization examples.

### Separator

- c7359a1: Privatize the internal per-size thickness plumbing and reset Tailwind root margins; per-size theming stays on the public `--moduix-separator-thickness-*` variables.

### Sidebar

- c7359a1: Remove the dead `sidebar-input` and `sidebar-separator` slot hooks, guard owned data attributes in Tailwind variants, and add the missing navigation sub-button focus ring.

### Signature Pad

- c7359a1: Restore the 36px clear trigger default and its CSS Modules focus-ring offset in Tailwind variants, and forbid `asChild` on `Canvas` so the fixed part tree cannot silently lose children.

### SimpleGrid

- c7359a1: Drop the no-op `clsx` wrapper from the React root and document how `grid-template-columns` overrides work in each styling track.

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

### Tags Input

- c7359a1: Hide item delete triggers in read-only state so the presentation matches the documented contract, gate the delete-trigger hover behind pointer-capable media, and align Tailwind hover and focus details with CloseButton defaults.

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

## 2.7.1

### Patch Changes

### CommandPalette

- cbcda2a: Use the Ark UI Hotkeys export consistently across all adapters.

## 2.7.0

### Minor Changes

- 7af13b7: Fix reviewed component contracts, including stable styling hooks, Alert live-region semantics, Container width with `gutter="none"`, and Solid CommandPalette clear cancellation. Remove unsupported AngleSlider and Carousel API surface, and simplify Button styling internals.

### Patch Changes

- 7af13b7: Align component contracts across framework and styling adapters.
- 7af13b7: Preserve internal `data-slot` hooks and fix Tour overlay layering.

## 2.6.0

### Minor Changes

### Sidebar

- a333616: Add NavigationBadge for counts alongside navigation buttons.
- 9a1018a: Add explicit Menu viewport composition and preserve Solid bound button handlers.

### Avatar

- 32f7db7: Make fallback content explicit and remove generated initials and the built-in fallback icon.

### AngleSlider

- a118470: Require explicit composition of the native form control.

### Checkbox

- a118470: Require explicit composition of the native form control.

### ColorPicker

- a118470: Require explicit composition of the native form control.

### DateInput

- a118470: Require explicit composition of the native form control.

### FileUpload

- a118470: Require explicit composition of the native form control.

### PinInput

- a118470: Require explicit composition of the native form control.

### RadioGroup

- a118470: Require explicit composition of item form controls.

### RatingGroup

- a118470: Require explicit composition of the native form control.

### SegmentGroup

- a118470: Require explicit composition of item form controls.

### Select

- a118470: Require explicit composition of the native form control.

### SignaturePad

- a118470: Require explicit composition of the native form control.

### Slider

- a118470: Require explicit composition of the native form control.

### Switch

- a118470: Require explicit composition of the native form control.

### TagsInput

- a118470: Require explicit composition of the native form control.

### Alert

- 20bb7e9: Require `Alert.Content` to contain title, description, actions, and other message content.

### AspectRatio

- f022e4e: Limit default styling to the ratio container.
  Media sizing, fitting, clipping, and border radius are now consumer-owned, and `--moduix-aspect-ratio-radius` is removed.

### Badge

- f022e4e: Keep direct children unchanged and limit built-in interaction styling to links.
  Use `Badge.Label` explicitly for truncation; button hover and disabled presentation are now consumer-owned, and `--moduix-badge-opacity-disabled` is removed.

### Patch Changes

### Collapsible

- 6eeb199: Align trigger and content by removing default horizontal padding.

### CommandPalette

- 6eeb199: Simplify hotkey and clear-trigger behavior and reduce the default clear-button size.

### Card

- 333837a: Fix media image sizing inside `picture` and align forwarded ref types with Ark factory elements.

### HoverCard

- 6c2a9fc: Keep arrows integrated with the popup while allowing constrained content to scroll through `HoverCard.Body`.

### NavigationMenu

- 270eabe: Align content and indicator composition with Ark and remove the unsupported standalone arrow example.

### Pagination

- 1901dc5: Preserve localized navigation labels and safe `asChild` composition while removing item transitions.

### Popover

- 1429b3b: Keep RootProvider portalling aligned with its usePopover state.

### Select

- 520d42a: Align the indicator with Ark anatomy and simplify related popup styling.

### Tabs

- eeb2799: Align indicator motion customization with Ark UI.
- 1429b3b: Remove an unnecessary DateInput literal-segment style override.
- 59b868c: Remove the redundant `normalizeClassName` helper from React components.

### Breadcrumbs

- c3e3aae: Simplify styling hooks and preserve its accessibility semantics.

### Listbox

- 1429b3b: Simplify clear-trigger composition and remove unused default styles.

### Splitter

- eeb2799: Remove redundant layout styles already provided by Ark.

### AngleSlider

- 72695ea: Remove the unused `Dial.thumbClassName` prop.

## 2.5.1

### Patch Changes

### Sidebar

- c42f5c3: Improve composable collapsed navigation and align navigation controls and badges.

### DatePicker

- c42f5c3: respect reduced-motion preferences and use Ark input indexes for range styling.

## 2.5.0

### Minor Changes

### Sidebar

- f3a532e: Add a resizable, collapsible application navigation component.

### Table of Contents

- f3a532e: Add a navigation component for page headings.

### Patch Changes

### AngleSlider

- f3a532e: Keep the default track background unchanged on hover and press.

## 2.4.0

### Minor Changes

### Navigation Menu

- 35f0254: new component

### JSON Tree View

- 35f0254: new component

### Patch Changes

- 35f0254: Update deps version

## 2.3.0

### Minor Changes

- 131ab78: Added Chart component, based on Tanstack Charts

## 2.2.5

### Patch Changes

### Alert

- 7e441e3: Add status-specific color variables while preserving component-wide overrides.

### Sidebar

- 7e441e3: Move the divider trigger to the inset topbar intersection, align workspace Select indicators, and clarify Drawer composition.

### Highlight

- 7e441e3: Clarify component documentation and usage guidance.
  Protect the stable styling hooks on matched marks from consumer-prop overrides.

### Avatar

- 7e441e3: Add a default fallback icon, preserve Unicode initials, and make fallback theming reliable.

### Bleed

- 7e441e3: Align logical-axis guidance, CSS variable references, and root contract coverage.

### Breadcrumbs

- 7e441e3: Forward `Path` refs and prevent unsupported child composition.

### Carousel

- 7e441e3: Refine indicator interaction states, motion preferences, high-contrast styling, and RTL progress readability.

### Clipboard

- 7e441e3: Improve disabled and pressed-state styling, expand public-state coverage, and document context and disabled composition.

### Image

- 7e441e3: Preserve explicit fetch-priority overrides and complete release-readiness coverage.

### Checkbox

- 7e441e3: Improve read-only semantics, interactive-state theming, and group label customization.

### Listbox

- 7e441e3: Improve keyboard-selection coverage and clarify form integration in documentation.

### DateInput

- 7e441e3: Clarify automatic range inputs and protect Ark accessibility semantics.

### Kbd

- 7e441e3: Refine keyboard-key styling and documentation.
  Expose labelled shortcut groups to assistive technology.

### Popover

- 7e441e3: Preserve modal portal behavior and refine resilient popup styling.

### CloseButton

- 7e441e3: Preserve semantic `asChild` hosts when disabled.

### CommandPalette

- 7e441e3: Strengthen dialog accessibility and default selection behavior coverage.

### InputGroup

- 7e441e3: Refine grouped-input styling and protect component-owned styling hooks.

### Container

- 7e441e3: Complete preset coverage and document uncapped-width composition.

### Dialog

- 7e441e3: Respect reduced-motion preferences and expand coverage for portal, focus, controlled, and provider flows.

### Empty

- 7e441e3: Improve accessibility guidance and per-icon theming.

### FileUpload

- 7e441e3: Fall back safely when an image filename lacks an image MIME type.

### Field

- 7e441e3: Complete native part regression coverage and multiline field guidance.

### Field

- 7e441e3: Improve error-text theming and long-text resilience.

### Fieldset

- 7e441e3: Improve error-text theming and long-text resilience.
- 7e441e3: Fix QR code sizing and Ark factory rendering across components.

### Marquee

- 7e441e3: Clarify animation styling and accessible playback guidance.

### ScrollArea

- 7e441e3: Improve scroll-area behavior, styling, and documentation.

### PinInput

- 7e441e3: Clarify automatic form submission and keyboard behavior.

### NumberInput

- 7e441e3: Clarify native form submission and external form ownership.

### Heading

- 7e441e3: Preserve component styling hooks when data attributes collide.

### List

- 7e441e3: Clarify list component usage guidance.

### HoverCard

- 7e441e3: Respect reduced-motion preferences and correct styling hooks for non-rendering root APIs.

### ImageCropper

- 7e441e3: Strengthen keyboard and fixed-area release readiness.

### ProgressLinear

- 7e441e3: Add indeterminate theming and clarify custom value-text composition.

### Menu

- 7e441e3: Respect reduced motion, align documented CSS hooks, and cover portal behavior.

### NativeSelect

- 7e441e3: Align indicator spacing and document native form composition.

### Collapsible

- 7e441e3: Respect reduced-motion preferences and harden custom-trigger and partial-collapse accessibility.

### Input

- 7e441e3: Improve input styling and behavior documentation.

### PasswordInput

- 7e441e3: Polish disabled-state styling and correct CSS token documentation.

### Accordion

- 7e441e3: Improve RTL alignment, reduced-motion behavior, and usage guidance.

### AngleSlider

- 7e441e3: Add external form ownership, reset synchronization, and refined interaction states.

### Button

- 7e441e3: Prevent disabled composed hosts from running child click handlers.
- 7e441e3: Improve component behavior, styling, documentation, and registry output.

### Select

- 7e441e3: Respect reduced-motion preferences and strengthen release coverage for keyboard selection,
  accessible clearing, portal placement, forwarded refs, states, and long content.

### Steps

- 7e441e3: Improve focus styling, responsive layouts, linear-validation coverage, and documentation examples.

### Badge

- 7e441e3: Expose the label part and harden composition, styling hooks, and interactive states.

### Card

- 7e441e3: Add variant-specific theming hooks and a consistent focus ring for interactive roots.

### Editable

- 7e441e3: Strengthen form and Field integration regression coverage.

### QrCode

- 7e441e3: Improve release-ready examples, accessibility guidance, and disabled download behavior.
- 7e441e3: Improve layout resilience and interaction styling across the component library.
  Fix horizontal List spacing, distinguish Splitter keyboard focus from pointer dragging, preserve explicit `asChild` resize triggers, and tighten CSS transitions and token fallbacks.

### RatingGroup

- 7e441e3: Refine styling, focus-ring CSS variable defaults, and usage guidance.

### Slider

- 7e441e3: Improve vertical marks, invalid and read-only states.

### ColorPicker

- 7e441e3: Respect reduced-motion preferences and strengthen form composition support.
- 7e441e3: Correct Combobox styling documentation and strengthen its accessible interaction coverage.

### DatePicker

- 7e441e3: Inherit field state and preserve convenience input indexes.

### List

- 7e441e3: Correct the font-family styling contract and strengthen release coverage.

### Skeleton

- 7e441e3: Clarify accessible loading and theming guidance.

### Spinner

- 7e441e3: Clarify `decorative` `asChild` accessibility behavior and strengthen composition coverage.

### Switch

- 7e441e3: Improve accessibility, reduced-motion support, and invalid-state theming.

### Toggle

- 7e441e3: Add keyboard interaction and content-resilience coverage.

### Typeset

- 7e441e3: Document named scroll regions and strengthen release coverage.

### TreeView

- 7e441e3: Correct Node helper typings and improve disabled-node interaction feedback.

### ProgressCircular

- 7e441e3: Improve accessible value-text composition and indeterminate motion styling.

### ScrollArea

- 7e441e3: align the documented focus-ring offset default with the shared inset token and strengthen composition coverage.

### PasswordInput

- 7e441e3: Refine password-input styling and usage guidance.

### SegmentGroup

- 7e441e3: Improve segmented-control behavior, styling, and documentation.

### Select

- 7e441e3: Document and validate Field state inheritance for automatic native form controls.

### SignaturePad

- 7e441e3: prevent read-only signatures from being cleared and forward Canvas control props and refs.

  Align stories, tests, localized documentation, styling references, and registry output with the release-ready contract.

### Separator

- 7e441e3: Keep semantic orientation aligned and complete release coverage.

### Slider

- 7e441e3: Add independent CSS variables for invalid-state visuals and active markers.

### Lightbox

- 7e441e3: Improve lightbox layout and interaction behavior.
  Respect reduced-motion preferences while preserving the close lifecycle.

### AspectRatio

- 7e441e3: Preserve stable root hooks, isolate ratio internals, and normalize media frames.

### FloatingPanel

- 7e441e3: Strengthen lifecycle, controlled-state, provider, and resize composition coverage.

### ImageCropper

- 7e441e3: Improve cropper styling and interaction behavior.

### ScrollArea

- 7e441e3: Preserve content and scrollbar contrast in forced-colors mode and expand RTL guidance.

### SegmentGroup

- 7e441e3: Prevent compounded disabled opacity and strengthen native interaction reliability.

### SignaturePad

- 7e441e3: Fix disabled styling and height customization.

### SplitButton

- 7e441e3: Add accessible group semantics and strengthen interaction guidance.

### Stack

- 7e441e3: Finalize responsive directions, semantic composition, and styling overrides.

### TagsInput

- 7e441e3: Stabilize automatic form submission and reset behavior across root compositions.

### Swap

- 7e441e3: Polish preset animation scoping, add rotate and flip theme controls, and preserve custom animation styling hooks.

### Pagination

- 7e441e3: Stabilize numeric item sizing and improve range navigation coverage and documentation.

### Table

- 7e441e3: Keep interactive row context visible for keyboard actions.

### Tabs

- 7e441e3: Keep vertical root-provider variants aligned with the default filled treatment.

### Tag

- 7e441e3: Add independent color theming hooks for every built-in variant.

### Text

- 7e441e3: Allow the public line-clamp CSS variable to override the component fallback.

### Textarea

- 7e441e3: Clarify native form ownership and protect controlled and reset behavior.

### Drawer

- 7e441e3: Respect reduced-motion preferences and expand island, lifecycle, and close-control coverage.

### Menu

- 7e441e3: Improve menu behavior, styling, and documentation.

### SimpleGrid

- 7e441e3: reject invalid numeric `minChildWidth` values.

### Timer

- 7e441e3: Forward area props and refs through the Segments convenience component.

### Alert and Toast

- 7e441e3: Align status theming on card-based info defaults and improve long-content resilience.

### ToggleGroup

- 7e441e3: Apply group and item styling overrides consistently across variants.

### Tooltip

- 7e441e3: Respect reduced-motion preferences and strengthen interaction coverage.

### Tour

- 7e441e3: Fix tooltip overlay layering and respect reduced-motion preferences.

### RadioGroup

- 7e441e3: Fix group text-color theming and strengthen keyboard and state regression coverage.

## 2.2.4

### Patch Changes

### Sidebar

- d7077b1: Improve sidebar behavior, styling, and documentation.

### Highlight

- d7077b1: Clarify component documentation and usage guidance.

### Image

- d7077b1: Refine image rendering behavior and documentation.

### Listbox

- d7077b1: Refine listbox styling and documentation.

### Kbd

- d7077b1: Refine keyboard-key styling and documentation.

### Popover

- d7077b1: Refine popover styling and usage guidance.

### InputGroup

- d7077b1: Refine grouped-input styling and composition.

### Marquee

- d7077b1: Refine marquee animation styling and usage guidance.

### ScrollArea

- d7077b1: Improve scroll-area behavior, styling, and documentation.

### PinInput

- d7077b1: Improve PIN input behavior and documentation.

### NumberInput

- d7077b1: Clarify number-input usage guidance.

### List

- d7077b1: Clarify list component usage guidance.

### ProgressLinear

- d7077b1: Improve linear progress styling and documentation.

### NativeSelect

- d7077b1: Refine native-select styling and documentation.

### Input

- d7077b1: Improve input styling and behavior documentation.

### Button

- d7077b1: Improve button styling and usage guidance.
- d7077b1: Improve component behavior, styling, documentation, and registry output.

### Select

- d7077b1: Improve select behavior, styling, and documentation.

### Steps

- d7077b1: Improve focus styling, responsive layouts, and documentation examples.

### QrCode

- d7077b1: Refine QR code styling and usage guidance.

### RatingGroup

- d7077b1: Refine rating-group styling and usage guidance.

### Slider

- d7077b1: Improve vertical marks, invalid and read-only states.

### ProgressCircular

- d7077b1: Improve circular progress styling and documentation.

### PasswordInput

- d7077b1: Refine password-input styling and usage guidance.

### SegmentGroup

- d7077b1: Improve segmented-control behavior, styling, and documentation.

### Separator

- d7077b1: Refine separator behavior, styling, and documentation.

### Lightbox

- d7077b1: Improve lightbox layout and interaction behavior.

### ImageCropper

- d7077b1: Improve cropper styling and interaction behavior.

### SignaturePad

- d7077b1: Fix disabled styling and height customization.

### SplitButton

- d7077b1: Improve documentation previews and interaction coverage.

### Stack

- d7077b1: Add reverse directions and improve semantic composition.

### Pagination

- d7077b1: Improve pagination styling and documentation.

### Drawer

- d7077b1: Improve mobile drag motion and refresh the documentation examples.

### Menu

- d7077b1: Improve menu behavior, styling, and documentation.

### RadioGroup

- d7077b1: Improve radio-group styling and documentation.

## 2.2.3

### Patch Changes

### Menu

- 1b4ae6e: Fix arrow visibility and its connection to the popup border.
- 1b4ae6e: Fix Next.js App Router compatibility for registry components that use local client APIs.

## 2.2.2

### Patch Changes

- 228a71c: Refactor code organization for shadcn cli

## 2.2.1

### Patch Changes

### Drawer

- 3bccb69: Keep the backdrop visible while dragging between snap points.

### Drawer

- 3bccb69: Add the `island` content variant for detached, edge-inset drawers.
- 3bccb69: Namespace the public CSS token contract under `--moduix-*` and add a non-runtime Ark UI variable reference stylesheet for IDE tooling.

## 2.2.0

### Minor Changes

- 5c88b71: Namespace the public CSS token contract under `--moduix-*` and cascade layers under `moduix.*`.

## 2.1.0

### Minor Changes

- 3c2cf9a: Polish component sizing, popup density, focus treatments, and theming tokens across the React library.
  Standardize primary controls around the medium size scale and popup items around the small size scale while preserving component-level override variables.

### Patch Changes

- 3c2cf9a: Add the Typeset component and curated CSS theme presets.
- 3c2cf9a: Unify input action hover behavior and refine Select trigger composition.

## 2.0.0

### Major Changes

- 3a2f3b2: Freeze the 2.0 CSS variable contract and make Command Palette computed variables private.

  Remove the unused `--command-palette-content-gap` variable and migrate effective-value overrides to
  the documented public Command Palette inputs.

### Patch Changes

### Alert

- 3a2f3b2: make `Alert.Content` optional for the default composition path, render `Alert.Title` as `p` by default, and reduce default padding.

### Card

- 3a2f3b2: add `Card.Media`, shared spacing hooks, and streamline the docs.
  Clarifies the `Card.Root asChild` versus `Card.Link` decision path and adds an explicit advanced customization path.
- 3a2f3b2: Improve Button loading ergonomics and simplify SplitButton trigger composition.
  Adds a narrow `loading` prop to `Button`, tunes default button interaction styling, and removes the extra `asChild` escape hatch from the SplitButton trigger.
  Also keeps native `disabled` off `Button asChild` hosts, adds inline icon styling hooks, and syncs the Button docs with the shipped contract.

### Clipboard

- 3a2f3b2: add `Clipboard.useClipboard` for the `RootProvider` composition.

### CommandPalette

- 3a2f3b2: add common panel and search shortcuts with compact input styling.

### Alert

- 3a2f3b2: add `Alert.Actions` for grouped action rows and align examples around the shorter root usage.

### Sidebar

- 3a2f3b2: Improve navigation composition defaults and migration guidance.
- 3a2f3b2: Add fixed `DateInput.Segments` and `PasswordInput.Field` helpers with explicit advanced composition paths.

### Dialog

- 3a2f3b2: Export dialog state hooks through `@moduix/react`.

### Drawer

- 3a2f3b2: Re-export `useDrawer` for RootProvider state control.

### Breadcrumbs

- 3a2f3b2: add a `Path` shorthand and improve collapsed trail affordance.
  Switch the default separator to a chevron and teach the simpler path-first usage in docs.

### Editable

- 3a2f3b2: Add standard controls and export editable state access through `@moduix/react`.

### Badge

- 3a2f3b2: add a `link` variant and improve default interactive styling for `asChild` links and buttons.

### Avatar

- 3a2f3b2: re-export common state hooks and align docs around the default and advanced composition paths.
  Also documents custom image rendering through moduix `useAvatarContext`.

### NativeSelect

- 3a2f3b2: Restore native select affordance, add layout styling props, and document accessible usage.
  Document composed `Select` usage alongside the native control.

### Fieldset

- 3a2f3b2: Re-export `useFieldset` for RootProvider state control.

### FileUpload

- 3a2f3b2: Add compact file-list composition and moduix-owned context exports.

### FloatingPanel

- 3a2f3b2: Default Escape dismissal, expose state helpers, configurable resize handles, and a restore control.

### Accordion

- 3a2f3b2: re-export `useAccordion`, align `RootProvider` docs/examples, and document `ItemBody` styling hooks.

### Carousel

- 3a2f3b2: Add `Carousel.Indicators` and simplify the recommended composition path.
  Also fixes advanced example page navigation and aligns the docs examples with the shipped API.

### AspectRatio

- 3a2f3b2: make root sizing and CSS ratio overrides easier.
  The root now stores `ratio` in an internal CSS variable, which makes responsive `aspect-ratio` overrides easier while preserving the existing API.

### Tooltip

- 3a2f3b2: add `Tooltip.Body` for the default composition path and align docs around the shorter root usage.
  Export advanced state hooks from moduix and document explicit customization.

### HoverCard

- 3a2f3b2: re-export state helpers and clarify nested Dialog focus behavior.

### ImageCropper

- 3a2f3b2: add `CropArea` and expose cropper state APIs through moduix.
  Align the recommended and advanced composition paths in docs and examples.
- 3a2f3b2: Render native form controls automatically for Ark-backed form components.
  Removes public `HiddenInput`, `HiddenSelect`, and `ItemHiddenInput` parts. `Select`, `DateInput`, and `SignaturePad` expose semantic root props for their special form behavior.
  Document virtualized `Select` form submission and custom `SignaturePad` value serialization.

### Lightbox

- 3a2f3b2: Export state hooks through `@moduix/react`.

### Listbox

- 3a2f3b2: Export state and context hooks through `@moduix/react`.

### Marquee

- 3a2f3b2: Export `useMarquee` for programmatic control.

### Menu

- 3a2f3b2: Export state helpers and improve advanced composition guidance.

### NumberInput

- 3a2f3b2: Add the `Field` shortcut and expose Ark state hooks and context through moduix.
  Fix disabled control opacity.

### Pagination

- 3a2f3b2: Add standard page-item rendering and namespace state hooks.

### PinInput

- 3a2f3b2: Add an `Inputs` helper for standard verification-code fields.

### Popover

- 3a2f3b2: Improve nested-overlay rendering and close-icon header spacing.
- 3a2f3b2: Unify public state hooks and context surfaces, preserve Ark trigger anatomy through Button composition, and remove the duplicate close id from the canonical Dialog.

### QrCode

- 3a2f3b2: Re-export `useQrCode` and keep the QR frame within its container.

### ColorPicker

- 3a2f3b2: simplify common area, slider, swatch, and trigger composition.
  Adds default visual children for repeated picker parts and a `Sliders` convenience part for hue and alpha controls.
  Re-exports state hooks from moduix and updates docs/examples around the shorter recipes.

### ProgressCircular

- 3a2f3b2: Add a fixed `Ring` helper for the default circular track and range composition.

### RadioGroup

- 3a2f3b2: Add `Option` convenience items and re-export `useRadioGroup`.

### RatingGroup

- 3a2f3b2: Add generated items with default form integration.
- 3a2f3b2: Restore complete shadcn registry dependency closures.

### ScrollArea

- 3a2f3b2: Add persistent scrollbar visibility and moduix state access.
  Smooths scrollbar hover growth and adds `ScrollArea.useScrollArea()` for RootProvider composition.

### SegmentGroup

- 3a2f3b2: Add the `Items` helper and expose `useSegmentGroup`.

### SignaturePad

- 3a2f3b2: Add the `Canvas` helper and export `useSignaturePadContext`.

### DatePicker

- 3a2f3b2: add `Field`, `RangeField`, and `DayTable` sugar and align docs around the shorter default composition.
  Document the advanced low-level composition path separately and update examples to keep the basic path first.
  Fix week-number offsets and expose date-picker context hooks through the moduix API.

### Combobox

- 3a2f3b2: Add `Option` row helper and improve migration guidance.
  Supports replacing or hiding the option indicator while keeping low-level item composition available.
  Restricts `Option` to simple rows and documents the advanced custom-item composition path.

### Splitter

- 3a2f3b2: Add a default resize indicator and refine hover and drag feedback.
  Expose advanced splitter state helpers from the moduix package.

### Stack

- 3a2f3b2: Simplify layout composition by removing the `separator` prop; compose `Separator` directly as a child.

### Steps

- 3a2f3b2: Re-export `useSteps` for RootProvider state control.

### AngleSlider

- 3a2f3b2: add `AngleSlider.Dial`, re-export `useAngleSlider()`, and document invalid state.

### Switch

- 3a2f3b2: Re-export state helpers and prevent disabled hover styling.

### Table

- 3a2f3b2: Fix empty-row state styling and RTL numeric alignment.

### Tag

- 3a2f3b2: Make removable-tag examples interactive and improve close-trigger labels.

### Accordion

- 3a2f3b2: add `Accordion.ItemBody` for default content spacing and make the root fill available width by default.

### Text

- 3a2f3b2: Correct ref typing for semantic roots and improve documentation examples.

### Select

- 3a2f3b2: Add a standard Field helper with a customizable indicator and improve documentation examples.

### Slider

- 3a2f3b2: add `Slider.Thumbs` and re-export advanced state helpers.
  Shows the thumb focus ring for keyboard interaction and while dragging.

### Tabs

- 3a2f3b2: Fix indicator positioning and export `useTabs` through `@moduix/react`.

### TagsInput

- 3a2f3b2: Add `Items` for standard editable tag composition.

### Timer

- 3a2f3b2: Add `Segments` convenience composition and moduix-owned timer state exports.

### Collapsible

- 3a2f3b2: Add a Body part for measured content layout.
  Use the new inner wrapper in examples and docs, and sync the documented width and indicator rotation defaults with the shipped styles.
  Export `useCollapsible` for the standard `RootProvider` composition.

### Toast

- 3a2f3b2: Add default Toaster rendering for standard toast content.

### Toggle

- 3a2f3b2: Distinguish default and outline styles and expose context state access.

### Tour

- 3a2f3b2: Add `ActionList` and align close-icon styling with Dialog.

### TreeView

- 3a2f3b2: Export state hooks and simplify checkbox indicator customization.

### Clipboard

- 3a2f3b2: add `Clipboard.CopyText`, remove the default max-width cap, and improve migration-friendly examples.

### Checkbox

- 3a2f3b2: Simplify the default control composition and align docs with the shorter checkbox setup.
  Re-export checkbox state hooks from moduix and reorder docs examples around the recommended flow.

## 1.1.1

### Patch Changes

- 12be976: Update Splitter resize trigger default hover and drag styling.

## 1.1.0

### Minor Changes

- Migrate the React library from `moduix` to `@moduix/react`, move its component foundation from
  Base UI to Ark UI, and align it more closely with the Ark UI / Chakra UI component model.

  This release also adds a broad set of new components and refreshes the documentation to reflect
  the new foundation, APIs, and recommended usage patterns.

## 1.0.5

### Patch Changes

- 6f75f82: New styles for indicators in select-like popups

## 1.0.4

### Patch Changes

- 4d0850a: update deps

## 1.0.3

### Patch Changes

- b5e2fcc: New animation tokens for components with interactive popups
  New small component Tag

## 1.0.2

### Patch Changes

- 0b79dae: update deps

## 1.0.1

### Patch Changes

- 0959302: Alert and Toast updates for colors, new tokens for success/warning

## 1.0.0

### Major Changes

- d5e0852: Add shadcn registry along npm install, all components ready to first release, api and styles consistent across all present components

### Patch Changes

- d5e0852: Add shadcn registry (poc), update Accordion defaults

## 0.11.3

### Patch Changes

- a2e7db1: Deploy fixes and styles regression for several components

## 0.11.2

### Patch Changes

- c6ee677: Remove cjs exports, now library only esm

## 0.11.1

### Patch Changes

- 3bc5ee5: Switch vite-library mode to tsdown

## 0.11.0

### Minor Changes

- 3197e84: New components: AspectRatio, Table, CopyButton, Empty, PasswordInput, SplitButton, Stepper.
  Small api updates for each component

## 0.10.0

### Minor Changes

- faa61f6: Api updates for remaining components, breadcrumbs fixes, lightbox fixes

## 0.9.1

### Patch Changes

- a239b37: [Drawer] new Island variant

## 0.9.0

### Minor Changes

- fad6c0a: New components: Badge, Alert, CommandPalette, Kbd, InputGroup, Card

## 0.8.5

### Patch Changes

- fb939b0: Fix animation styles in Autocomplete

## 0.8.4

### Patch Changes

- 3ef298a: [Lightbox] simplify css for different bundlers

## 0.8.3

### Patch Changes

- 3558c3e: Fix Bleed full styles

## 0.8.2

### Patch Changes

- 828cc89: Refactor ScrollArea horizontal api

## 0.8.1

### Patch Changes

- 667c7e7: Expand more css variables for styling

## 0.8.0

### Minor Changes

- e80cba3: [breadcrumbs] New component

## 0.7.1

### Patch Changes

- 2904d6f: New component Pagination
- cf75b46: New component Lightbox

## 0.7.0

### Minor Changes

- 473136d: API synced and simplified across all components

### Patch Changes

- 473136d: infra changes

## 0.6.5

### Patch Changes

- 4fd31bb: Refactor for z-indexes

## 0.6.4

### Patch Changes

- b1d9ab4: Add repository to package.json

## 0.6.3

### Patch Changes

- fbcb9e6: Updates for ci releases

## 0.6.2

### Patch Changes

- 29760f0: Expand API exports, docs updates

## 0.6.1

### Minor Changes

- Ready for first public release
- Simplification API for all components
