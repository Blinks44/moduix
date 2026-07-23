# moduix

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
  Adds a narrow `loading` prop to `Button`, tunes default button interaction styling, and removes the extra `asChild` escape hatch from `SplitButton.Trigger`.
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