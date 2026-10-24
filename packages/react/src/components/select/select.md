# Select

Upstream references (accessed 2026-10-21):

- Ark UI: https://ark-ui.com/docs/components/select
- Chakra UI: https://chakra-ui.com/docs/components/select
- shadcn/ui: https://ui.shadcn.com/docs/components/select

## Purpose

`Select` lets users choose one or more known values from a non-searchable popup list.

## Upstream model to preserve

- Uses `@ark-ui/react/select` directly: collection-first state (`collection` is required),
  string-array `value` and `defaultValue` even for single selection, callback detail objects,
  `RootProvider`, context, and hooks.
- Keeps popup structure explicit through Ark `Positioner` and `Content`; the root owns portalling.
- Ark owns presence: do not gate `Positioner` or `Content` with `select.open`.

## Current behavior contract

- `Select` and `SelectRootProvider` portal `SelectPositioner` by default. Set `portalled={false}` to
  render it inline, or pass `portalRef` to target a custom container.
- `lazyMount` and `unmountOnExit` default to `true` (Ark defaults to `false`): popup content is absent
  until the first open and is removed after its exit animation.
- `SelectField` renders `SelectControl` with `SelectTrigger` and `SelectValueText`, an optional
  `SelectClearTrigger` when `clearLabel` is set (the label becomes its accessible name), and
  `SelectIndicator`. `indicator` replaces the default chevron.
- `SelectOption` is the row helper for ordinary options: it renders `SelectItem`, wraps its
  children in `SelectItemText`, and adds `SelectItemIndicator`. `indicator={false}` hides the check,
  and a node replaces it. It reuses the item slots. Use `SelectItem` for custom rows.
- `SelectIndicator` and `SelectItemIndicator` render default icons when children are omitted.
  `SelectClearTrigger` composes Ark clearing with the shared `CloseButton` and defaults its
  accessible name to `a11yLabels.clearSelection` unless `aria-label` or `aria-labelledby` is passed;
  `asChild` replaces the button with one semantic child.
- Keep `SelectIndicator` and `SelectClearTrigger` directly under `SelectControl`, after
  `SelectTrigger`. The trigger button keeps phrasing content only.
- `SelectTrigger` drops its styles under `asChild`.
- `SelectHiddenSelect` is explicit: add it for native submission, autofill, validation, and reset.
- `SelectItemTextContent`, `SelectItemTextIcon`, and `SelectItemTextLabel` are styled spans for an
  icon-plus-label item layout, shared with Listbox and Menu.
- Part props and callback detail types are re-exported from Ark. `SelectRootProps` and
  `SelectRootProviderProps` add `portalled` and `portalRef`; `SelectFieldProps` and
  `SelectOptionProps` describe the helpers.

## Anatomy

```text
Select
├─ SelectLabel
├─ SelectControl / SelectField
│  ├─ SelectTrigger
│  │  └─ SelectValueText
│  ├─ SelectClearTrigger
│  └─ SelectIndicator
├─ SelectPositioner (portalled)
│  └─ SelectContent
│     ├─ SelectList (optional, scrolls on its own)
│     ├─ SelectOption
│     └─ SelectItemGroup
│        ├─ SelectItemGroupLabel
│        └─ SelectItem
│           ├─ SelectItemText
│           └─ SelectItemIndicator
└─ SelectHiddenSelect
```

Styled parts expose matching kebab-case `data-slot` hooks (`select-root`, `select-root-provider`,
`select-trigger`, and so on). `SelectField` uses `select-control`. `SelectContext`,
`SelectItemContext`, and `SelectHiddenSelect` are Ark parts without a slot.

## Styling

- CSS Modules keep five variables: `--moduix-select-width`, `--moduix-select-radius`,
  `--moduix-select-control-height`, `--moduix-select-action-size`, and
  `--moduix-select-content-max-height`. `NativeSelect` reads the same variables except
  `content-max-height`; keep them aligned.
- Colors, borders, focus rings, disabled opacity, and motion come from foundation tokens. Items, group
  labels, and list padding follow the shared `--moduix-popup-*` variables, and content motion uses the
  shared `moduix-popup-in` and `moduix-popup-out` keyframes with `--moduix-popup-motion-*`.
- The trigger reserves 46px at the end for the indicator and 68px while a visible clear trigger
  follows it; both follow `--moduix-select-action-size`.
- The trigger ring shows while open and on `:focus-visible`, not after pointer dismissal.
- Indicator hover sits inside `@media (hover: hover)` in both styling systems.

## Agent notes

- Keep `Positioner` and `Content` explicit; only portal transport belongs to the root.
- Docs examples use `SelectField` and `SelectOption`; "Advanced customization" keeps the full
  low-level composition.
- Do not add a parallel variant API or compatibility aliases.
- When registry-shipped select source changes, run `pnpm run build:registry`.