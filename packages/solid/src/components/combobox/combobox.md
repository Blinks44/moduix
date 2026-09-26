# Combobox

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/combobox

## Purpose

`Combobox` selects one or more values from a filterable collection.

## Public contract

The flat API includes `Combobox`, `ComboboxRootProvider`, `ComboboxPositioner`, `ComboboxContent`, `ComboboxControl`, `ComboboxInput`, `ComboboxLabel`, `ComboboxTrigger`, `ComboboxClearTrigger`, `ComboboxList`, `ComboboxItem`, `ComboboxItemText`, `ComboboxItemIndicator`, `ComboboxItemGroup`, `ComboboxItemGroupLabel`, `ComboboxEmpty`, `ComboboxStatus`, `ComboboxOption`, `ComboboxContext`, `ComboboxItemContext`, `useCombobox`, `useComboboxContext`, and `useComboboxItemContext`.

## Preservation notes

- The root requires an Ark collection. Preserve controlled `value`, `inputValue`, and `open`, details callbacks, filtering, multiple selection, and provider state.
- The popup is portalled by default; `portalled={false}` and `portalRef` customize placement. Preserve lazy mounting options.
- Keep Solid accessors and native `class` semantics when passing reactive collection and children values.

## Styling and accessibility

Ark owns combobox/listbox roles, keyboard movement, active descendant focus, and form state. Keep label relationships, `data-slot` hooks, and consumer styling through `class`.