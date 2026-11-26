# @moduix/svelte-tailwind

## 3.4.1

### Patch Changes

- 5713356: Refine default control density, input borders, focus halo, and form control typography:

  - Tighten the default control sizing scale to a 32px (`2rem`) `md` baseline (`24 / 28 / 32 / 36 / 44px`), and shift the `dense` (`28px`) and `soft` (`36px`) presets proportionally.
  - Soften default `--moduix-input` borders and `--moduix-ring` focus indicators (`2px` halo width) while keeping high-contrast 3:1 borders in the `contrast` preset.
  - Align `Combobox`, `Select`, `NativeSelect`, `Textarea`, `NumberInput`, `PasswordInput`, `DatePicker`, `DateInput`, `Editable`, `InputGroup`, `Listbox`, and `Clipboard` to `14px` desktop typography (with `16px` touch fallback on coarse pointers) and consistent `12px` inline padding.
  - Make `DatePicker` more compact (`18rem` default root and popup width, tighter header-to-grid gap) and remove cell color transitions for instant selection feedback when closing the calendar.

## 3.4.0

### Minor Changes

- 7316228: Re-export Ark UI runtime helpers and missing component types across all framework and styling packages so consumers do not need direct `@ark-ui/*` imports for standard component usage:

  - Add a `./collection` subpath (`createListCollection`, `useListCollection`, `createGridCollection`, `createTreeCollection`, `createFileTreeCollection`, `useListSelection`, `useAsyncList`, and related types) and expand `./locale` (`useFilter`, `useCollator`, `useDateFormatter`, and types) in every public package.
  - Re-export component-scoped helpers directly from `select`, `combobox`, `command-palette`, `listbox` (`createListCollection`, `useListCollection`, `useFilter`, plus `createGridCollection` in `listbox`), `date-picker` (`parseDate`, `DateValue`), `highlight` (`useHighlight`), `splitter` (`getSplitterLayout`), and `toggle` (`useToggle`).
  - Re-export missing Ark UI `*ChangeDetails`, `*Event`, `Use*Props`/`Return`/`Context`, and part `*Props`/`*Emits` types across all Ark-backed components while keeping CSS Modules and Tailwind adapters in full export parity.

- a55d547: Add ergonomic sugar APIs across overlays, buttons, toasts, and form controls in all framework and styling adapters while preserving full access to the underlying flat Ark-backed parts:

  - Add `DialogPanel` and `DrawerPanel` composite overlays (`Backdrop + Positioner + Content`) matching `CommandPalettePanel`.
  - Update `<Button loading>` to render an inline `<Spinner decorative size="sm" />` automatically, with optional `loadingText` and `loadingIndicator` customization.
  - Introduce `TooltipPanel` as the canonical composite tooltip overlay (`Positioner + Content`) to avoid the `*Body` naming collision with inner body slots, keeping `TooltipBody` as a `@deprecated` alias.
  - Add a default `toast` helper (`toast(...)`, `toast.success/error/info/warning/loading/promise/dismiss/...`) backed by a shared default store so `<ToastToaster />` works without manually calling `createToaster()`.
  - Add shorthand `label`, `hiddenInput`, and `hiddenInputProps` support to `Checkbox` and `Switch` with a built-in `HiddenInput` in shorthand mode.
  - Align `SelectField` (`clearable`, `triggerProps`, `valueTextProps`, `clearTriggerProps`) and add `SelectDropdown`, `DatePickerCalendar`, `DatePickerPanel`, `ComboboxField`, `ComboboxDropdown`, `useFilteredCollection`, and a `filter` prop on `Combobox` and `CommandPaletteCombobox` (with automatic filter reset when the command palette closes).

- 526cd87: Enumerate explicit component subpath exports for IDE auto-import, move `unpic` packages to optional peer dependencies, replace internal Lucide UI icons with inline SVGs to drop `lucide-*` runtime dependencies, and ship CSS Modules `style.css` without Tailwind `@theme inline` blocks.
- 0d7cb02: Add `ModuixProvider`, `LabelsProvider`, and `useA11yLabels` for localizing built-in accessibility labels across all components, add configurable `minSize`/`maxSize`/`collapsedSize`/`collapsible` bounds, `data-slot` hooks on `SidebarInput`/`SidebarSeparator`, and an opt-in responsive `mobileBreakpoint` `Drawer` fallback to `Sidebar`, and ship adapter refinements (lazy Chart renderer initialization, reactive Solid `asChild` branches and direct `OverlayPortal` props, hoisted Vue `VNodeOutlet`, and `useForwardExpose()` on core Vue inputs and buttons).
- 31f6ac9: Overhaul the Tailwind v4 packages and blocks so they are idiomatic, host-safe, and aligned with CSS Modules:

  - Preserve host Tailwind v4 spacing and typography scales by removing `--spacing-*`, `--text-xs..3xl`, `--font-weight-*`, and `--default-border-width` overrides from `tailwind-theme.css`, and simplify `cn` (`extendTailwindMerge`) to drop custom `text-md` and `font-regular` overrides.
  - Replace `text-md` with `text-base`, `font-regular` with `font-normal`, and remove redundant `[@media(hover:hover)]:` wrappers across all components.
  - Refactor `Card`, `Dialog`, `Input`, `Select`, `Tabs`, and `Toast` using `cva`, grouped utility arrays, and `@utility` helpers (`moduix-card-interactive-elevation`, `moduix-dialog-nested`) for readability.
  - Fix styling parity with CSS Modules in `Select` (dynamic action spacing for presets and `SelectValueText > svg`), `Dialog` (`motion-reduce:transition-none` and preset spacing), `Toast` (preset-aware padding and max-width), and `CardLink` (`after:rounded-[inherit]`).
  - Rewrite all 15 Tailwind registry blocks across React, Solid, Vue, and Svelte with pure Tailwind v4 classes and zero `.module.css` dependencies.

- 845d2ea: Polish default visual styling, tokens, and dark mode across all framework and styling adapters:

  - Enable automatic system dark mode (`color-scheme: light dark`) and built-in `.dark` / `.light` class support without extra CSS.
  - Add dark-mode-aware `light-dark()` shadows and semantic status palette tokens (`--moduix-success`, `--moduix-warning`, `--moduix-info`, and their `*-foreground` counterparts).
  - Add `success`, `warning`, and `info` variants to `Badge`, plus `info` status tinting on `Alert` and `Toast`.
  - Fix primary and destructive `Button` hover contrast in light and dark themes, unify focus-ring thickness and offsets, convert typography/spacing/sizing scales from `px` to `rem`, align desktop `Input` typography with `Button` (keeping `1rem` on coarse pointers), remove boxed `TabsContent` styling in `variant="line"`, switch `Tooltip` to a compact inverted surface, and tokenize `Toast` easing curves.
  - Support local inline `--moduix-radius` and `--moduix-spacing-*` recalculation for derived tokens.

### Patch Changes

### SplitButton

- ec53e18: Align the divider on the exact seam with full height across filled variants, collapse borders only on outline variants to avoid hover overlap, and scope CSS Module selectors under `.root` so styles remain independent of stylesheet order.
- a26b479: Consolidate internal Svelte UI icons into a single `UiIcon.svelte` component, reducing the Svelte registry `icons` item from 37 files to 2 files.

## 3.3.2

### Patch Changes

### Badge

- 6ee4628: Stop clipping the label inside table cells. The root no longer sets `max-width: 100%`, which let auto-layout tables size a column narrower than its badges.

## 3.3.1

### Patch Changes

### Toast

- eccc10c: Tint the close and action button hover with the toast type color on success, warning, and error toasts instead of a neutral gray.

## 3.3.0

### Minor Changes

### Chart

- 86948dc: Add the `chartColors` palette and the `--moduix-chart-6` to `--moduix-chart-8` color tokens.
  Pass `chartColors` to a TanStack color `range` and reuse its entries for `ChartLegendItem`.

## 3.2.2

### Patch Changes

- 5b0db9e: Republish the Svelte packages through the automated release workflow to verify npm trusted publishing.

## 3.2.1

- First release of `@moduix/svelte-tailwind`, with the same component set as the React, Solid, and Vue packages.
- Ship Svelte 5 components backed by Ark UI `^5.25.1`, with Tailwind CSS v4 utilities, foundation styles, optional presets, and shadcn-compatible registry sources.
- Use flat component exports such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogRootProvider`, and `DialogContext`.
- The package ships `.svelte` source under the `svelte` export condition. The application's Svelte compiler builds it, so SvelteKit server rendering works without extra configuration. Requires Svelte 5.29 or later.