# Listbox

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/listbox

## Purpose

`Listbox` exposes a visible selectable collection without a popup.

## Public contract

The flat API includes `Listbox`, `ListboxRootProvider`, `ListboxLabel`, `ListboxContent`, `ListboxItem`, `ListboxItemText`, `ListboxItemIndicator`, `ListboxItemGroup`, `ListboxItemGroupLabel`, `ListboxEmpty`, `ListboxValueText`, `ListboxInput`, `ListboxFilter`, `ListboxClearTrigger`, `ListboxItemTextContent`, `ListboxItemTextIcon`, `ListboxItemTextLabel`, `ListboxContext`, `ListboxItemContext`, `useListbox`, `useListboxContext`, and `useListboxItemContext`.

## Preservation notes

- The root requires an Ark collection. Keep items collection-backed and preserve string-array values, selection modes, and detail callbacks.
- Ark owns active descendant focus, keyboard navigation, typeahead, and native selection state.
- Preserve Solid collection rendering and reactive accessors.

## Styling and accessibility

Connect `ListboxLabel` to its content. Filter and clear parts add presentation only; keep the root's `data-slot` hooks and consumer `class` overrides.