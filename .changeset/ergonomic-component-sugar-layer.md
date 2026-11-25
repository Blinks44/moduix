---
'@moduix/react': minor
'@moduix/react-tailwind': minor
'@moduix/solid': minor
'@moduix/solid-tailwind': minor
'@moduix/vue': minor
'@moduix/vue-tailwind': minor
'@moduix/svelte': minor
'@moduix/svelte-tailwind': minor
---

Add ergonomic sugar APIs across overlays, buttons, toasts, and form controls in all framework and styling adapters while preserving full access to the underlying flat Ark-backed parts:

- Add `DialogPanel` and `DrawerPanel` composite overlays (`Backdrop + Positioner + Content`) matching `CommandPalettePanel`.
- Update `<Button loading>` to render an inline `<Spinner decorative size="sm" />` automatically, with optional `loadingText` and `loadingIndicator` customization.
- Introduce `TooltipPanel` as the canonical composite tooltip overlay (`Positioner + Content`) to avoid the `*Body` naming collision with inner body slots, keeping `TooltipBody` as a `@deprecated` alias.
- Add a default `toast` helper (`toast(...)`, `toast.success/error/info/warning/loading/promise/dismiss/...`) backed by a shared default store so `<ToastToaster />` works without manually calling `createToaster()`.
- Add shorthand `label`, `hiddenInput`, and `hiddenInputProps` support to `Checkbox` and `Switch` with a built-in `HiddenInput` in shorthand mode.
- Align `SelectField` (`clearable`, `triggerProps`, `valueTextProps`, `clearTriggerProps`) and add `SelectDropdown`, `DatePickerCalendar`, `DatePickerPanel`, `ComboboxField`, `ComboboxDropdown`, `useFilteredCollection`, and a `filter` prop on `Combobox` and `CommandPaletteCombobox` (with automatic filter reset when the command palette closes).