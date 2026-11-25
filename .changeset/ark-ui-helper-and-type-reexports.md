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

Re-export Ark UI runtime helpers and missing component types across all framework and styling packages so consumers do not need direct `@ark-ui/*` imports for standard component usage:

- Add a `./collection` subpath (`createListCollection`, `useListCollection`, `createGridCollection`, `createTreeCollection`, `createFileTreeCollection`, `useListSelection`, `useAsyncList`, and related types) and expand `./locale` (`useFilter`, `useCollator`, `useDateFormatter`, and types) in every public package.
- Re-export component-scoped helpers directly from `select`, `combobox`, `command-palette`, `listbox` (`createListCollection`, `useListCollection`, `useFilter`, plus `createGridCollection` in `listbox`), `date-picker` (`parseDate`, `DateValue`), `highlight` (`useHighlight`), `splitter` (`getSplitterLayout`), and `toggle` (`useToggle`).
- Re-export missing Ark UI `*ChangeDetails`, `*Event`, `Use*Props`/`Return`/`Context`, and part `*Props`/`*Emits` types across all Ark-backed components while keeping CSS Modules and Tailwind adapters in full export parity.