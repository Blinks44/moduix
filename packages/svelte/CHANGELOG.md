# @moduix/svelte

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
- 845d2ea: Polish default visual styling, tokens, and dark mode across all framework and styling adapters:

  - Enable automatic system dark mode (`color-scheme: light dark`) and built-in `.dark` / `.light` class support without extra CSS.
  - Add dark-mode-aware `light-dark()` shadows and semantic status palette tokens (`--moduix-success`, `--moduix-warning`, `--moduix-info`, and their `*-foreground` counterparts).
  - Add `success`, `warning`, and `info` variants to `Badge`, plus `info` status tinting on `Alert` and `Toast`.
  - Fix primary and destructive `Button` hover contrast in light and dark themes, unify focus-ring thickness and offsets, convert typography/spacing/sizing scales from `px` to `rem`, align desktop `Input` typography with `Button` (keeping `1rem` on coarse pointers), remove boxed `TabsContent` styling in `variant="line"`, switch `Tooltip` to a compact inverted surface, and tokenize `Toast` easing curves.
  - Support local inline `--moduix-radius` and `--moduix-spacing-*` recalculation for derived tokens.

### Patch Changes

- 1951e8a: Scope `Sidebar` CSS Module overrides for `Splitter`, `Input`, and `Separator` parts with `[data-slot='sidebar-*']` so styles remain independent of stylesheet import order.

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

- First release of `@moduix/svelte`, with the same component set as the React, Solid, and Vue packages.
- Ship Svelte 5 components backed by Ark UI `^5.25.1`, with CSS Modules, foundation styles, optional presets, and shadcn-compatible registry sources.
- Use flat component exports such as `Dialog`, `DialogTrigger`, `DialogContent`, `DialogRootProvider`, and `DialogContext`.
- The package ships `.svelte` source under the `svelte` export condition. The application's Svelte compiler builds it, so SvelteKit server rendering works without extra configuration. Requires Svelte 5.29 or later.