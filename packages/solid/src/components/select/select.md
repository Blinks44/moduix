# Select

## Upstream reference

- Ark UI: https://ark-ui.com/docs/components/select

## Purpose

`Select` chooses one or more values from a non-searchable popup collection.

## Public contract

The flat API includes `Select`, `SelectRootProvider`, `SelectControl`, `SelectTrigger`, `SelectIndicator`, `SelectPositioner`, `SelectContent`, `SelectList`, `SelectItem`, `SelectItemText`, `SelectItemIndicator`, `SelectItemGroup`, `SelectItemGroupLabel`, `SelectValueText`, `SelectLabel`, `SelectHiddenSelect`, `SelectField`, `SelectOption`, `SelectClearTrigger`, `SelectContext`, `SelectItemContext`, `useSelect`, `useSelectContext`, and `useSelectItemContext`.

## Preservation notes

Clear-trigger classes stay reactive in both default and callback `asChild` compositions.

- Keep collection-backed items, controlled and uncontrolled value state, Ark detail callbacks, and root-provider composition.
- The popup is portalled by default; preserve inline rendering and custom portal target options.
- `lazyMount` and `unmountOnExit` default to `true`.
- Part props and callback detail types are re-exported from Ark; `SelectRootProps`, `SelectRootProviderProps`, `SelectFieldProps`, and `SelectOptionProps` are moduix types.
- See the React `select.md` for the styling contract; the CSS Module is shared byte for byte.
- Keep `SelectField` and `SelectOption` as narrow helpers and retain explicit lower-level parts.

## Styling and accessibility

Ark owns listbox keyboard and focus behavior. `SelectHiddenSelect` provides native form submission, autofill, validation, and reset. Keep labels, state attributes, and `data-slot` hooks.