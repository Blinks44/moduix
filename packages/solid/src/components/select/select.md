# Select

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/select

## Purpose

`Select` chooses one or more values from a non-searchable popup collection.

## Public contract

The flat API includes `Select`, `SelectRootProvider`, `SelectControl`, `SelectTrigger`, `SelectIndicator`, `SelectPositioner`, `SelectContent`, `SelectList`, `SelectItem`, `SelectItemText`, `SelectItemIndicator`, `SelectItemGroup`, `SelectItemGroupLabel`, `SelectValueText`, `SelectLabel`, `SelectHiddenSelect`, `SelectField`, `SelectClearTrigger`, `SelectContext`, `SelectItemContext`, `useSelect`, `useSelectContext`, and `useSelectItemContext`.

## Preservation notes

- Keep collection-backed items, controlled and uncontrolled value state, Ark detail callbacks, and root-provider composition.
- The popup is portalled by default; preserve inline rendering and custom portal target options.
- Keep `SelectField` as a narrow helper and retain explicit lower-level parts.

## Styling and accessibility

Ark owns listbox keyboard and focus behavior. `SelectHiddenSelect` provides native form submission, autofill, validation, and reset. Keep labels, state attributes, and `data-slot` hooks.