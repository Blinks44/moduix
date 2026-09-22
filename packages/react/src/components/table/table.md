# Table

Upstream docs:

- Ark UI: no dedicated Table primitive. Use https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref (accessed 2026-08-13).
- Chakra UI: https://chakra-ui.com/docs/components/table (accessed 2026-08-13).
- shadcn/ui: https://ui.shadcn.com/docs/components/table (accessed 2026-08-13).

## Purpose

Use `Table` for semantic, read-only or lightly interactive tabular data with moduix styling and a
flat public API.

## Upstream model to preserve

Ark UI has no table state machine or primitive parts. The component follows Ark's owned-component
model instead: each part is rendered through `@ark-ui/react/factory`, supports `asChild`, and
forwards refs to the rendered native element. Each part exposes `data-scope="table"` plus a stable
`data-part`. Chakra's current Table recipe informs the
part names and visual props: `Root`, `ScrollArea`, `Caption`, `ColumnGroup`, `Column`, `Header`,
`Body`, `Footer`, `Row`, `ColumnHeader`, and `Cell`.

## Current behavior contract

- `Table` is the root component, renders a native `<table>` by default, and accepts `interactive`,
  `showColumnBorder`, `size`, `stickyHeader`, `striped`, and `variant`.
- `TableScrollArea` is the optional bordered horizontal-scroll shell.
- `TableColumnGroup` and `TableColumn` preserve native `colgroup` / `col` semantics.
- `TableCaption`, `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableColumnHeader`, and
  `TableCell` render their matching native table elements by default.
- `TableEmpty` is the only local sugar part. It renders a full empty row with a required `colSpan`.
  Its `asChild` escape hatch replaces the generated cell only; use one semantic `td` and compose
  `TableRow` plus `TableCell` directly when the row itself needs customization.
- The component does not own sorting, filtering, selection, pagination, virtualization, or row
  action state.

## Anatomy and exported parts

```text
TableScrollArea (optional)
└─ Table
   ├─ TableColumnGroup (optional)
   │  └─ TableColumn
   ├─ TableCaption (optional)
   ├─ TableHeader
   │  └─ TableRow
   │     └─ TableColumnHeader
   ├─ TableBody
   │  ├─ TableRow
   │  │  └─ TableCell
   │  └─ TableEmpty (optional)
   └─ TableFooter (optional)
```

| Part                | Element    | `data-part`     | `data-slot`           |
| ------------------- | ---------- | --------------- | --------------------- |
| `Table`             | `table`    | `root`          | `table-root`          |
| `TableScrollArea`   | `div`      | `scroll-area`   | `table-scroll-area`   |
| `TableColumnGroup`  | `colgroup` | `column-group`  | `table-column-group`  |
| `TableColumn`       | `col`      | `column`        | `table-column`        |
| `TableCaption`      | `caption`  | `caption`       | `table-caption`       |
| `TableHeader`       | `thead`    | `header`        | `table-header`        |
| `TableBody`         | `tbody`    | `body`          | `table-body`          |
| `TableFooter`       | `tfoot`    | `footer`        | `table-footer`        |
| `TableRow`          | `tr`       | `row`           | `table-row`           |
| `TableColumnHeader` | `th`       | `column-header` | `table-column-header` |
| `TableCell`         | `td`       | `cell`          | `table-cell`          |
| `TableEmpty`        | `td`       | `empty`         | `table-empty`         |

## Composition

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableColumnHeader,
  TableHeader,
  TableRow,
  TableScrollArea,
} from '@moduix/react/table';

export function InvoiceTable() {
  return (
    <TableScrollArea>
      <Table striped interactive>
        <TableCaption side="top">Recent invoices</TableCaption>
        <TableHeader>
          <TableRow>
            <TableColumnHeader>Invoice</TableColumnHeader>
            <TableColumnHeader>Status</TableColumnHeader>
            <TableColumnHeader numeric>Amount</TableColumnHeader>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell numeric>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableScrollArea>
  );
}
```

## Upstream feature coverage

- Ark composition: every exported DOM part supports `asChild` through `ark.*`; consumers must pass a
  single semantic child when replacing a table element.
- Ark styling: parts expose `data-scope`, `data-part`, and stable moduix `data-slot` hooks.
- Chakra usage/anatomy: covered by the flat part tree and native table semantics.
- Chakra sizes/variants: covered by `size="sm" | "md" | "lg"` and `variant="line" | "outline"`.
- Chakra striped, interactive, sticky header, column border, scroll area, column group, and sticky
  column examples are supported.
- Chakra pagination, selection, action bar, and TanStack Table examples remain composition patterns
  outside the primitive; `Table` supplies the semantic parts for those flows but owns no state.
- Chakra native mode is not needed because moduix parts are already native semantic elements.

## Accessibility and state

The browser owns table accessibility through native elements. Use `scope`, `headers`, `aria-sort`,
captions, and row/column labels as normal HTML attributes on the relevant part. `Table` adds no
keyboard navigation or roving focus. There is no `HiddenInput`, Field/Fieldset context,
RootProvider, context hook, or controlled state because Ark exposes no table machine.

Root state hooks:

- `data-size="sm" | "md" | "lg"`
- `data-variant="line" | "outline"`
- `data-striped`
- `data-interactive`
- `data-sticky-header`
- `data-show-column-border`

Cell state hooks:

- `data-numeric` on `TableColumnHeader` and `TableCell`
- `data-sticky="start" | "end"` on sticky column header/data cells
- `data-empty` on the row created by `TableEmpty`

When `interactive` is set, body rows expose the same background feedback on `:hover` and
`:focus-within`, preserving row context while keyboard users operate a contained control.

## Defaults and styling

Public CSS variables are registered in `packages/foundation/src/styles/variables-moduix.css`. Important variables:

- `--moduix-table-border-color`, `--moduix-table-border-width`
- `--moduix-table-cell-padding-x`, `--moduix-table-cell-padding-y`
- `--moduix-table-column-border-color`, `--moduix-table-column-border-width`
- `--moduix-table-column-header-color`, `--moduix-table-column-header-font-weight`
- `--moduix-table-scroll-area-bg`, `--moduix-table-scroll-area-border-color`,
  `--moduix-table-scroll-area-border-width`, `--moduix-table-scroll-area-radius`,
  `--moduix-table-scroll-area-shadow`
- `--moduix-table-row-bg-focus`, `--moduix-table-row-bg-hover`,
  `--moduix-table-row-bg-striped`, `--moduix-table-row-transition`
- `--moduix-table-sticky-header-bg`, `--moduix-table-sticky-column-bg`, and sticky z-index variables

`interactive` controls hover highlighting. `striped` controls zebra rows. `variant="outline"` adds
a border around the table root; `TableScrollArea` owns the common outer surface.

## Intentional sugar and differences from upstream

- `TableEmpty` is moduix sugar for the common empty-state row. Chakra does not define this part.
- `numeric` is the local name for inline-end-aligned tabular numerals on headers and cells.
- `htmlWidth` on `TableColumn` maps to the native `width` attribute to match Chakra's guidance.
- Moduix keeps the component native and does not wrap TanStack Table or own row selection/action
  state.

## Agent notes

- Keep the flat exports such as `TableCell` and `TableHeader`; the public API is direct and
  namespace-free.
- Do not add sorting, filtering, selection, or pagination state to this primitive. Build those as
  higher-level compositions on top of `Table`.
- Keep `TableEmpty` narrow. It should remain a convenience row, not a full empty-state component.
- Keep table prop/type aliases private unless a real consumer need appears; the public surface is the
  flat component parts and their runtime behavior.

## Local changelog

- 2026-08-13: Added keyboard-equivalent row feedback for nested actions through `:focus-within`,
  with a focused-row CSS variable; documented the narrow `TableEmpty asChild` contract and added
  focused coverage for it.
- 2026-07-11: Added the `data-empty` row hook so empty states exclude hover and striped styling, and made numeric alignment direction-aware.
- 2026-09-22: Replaced the compound namespace with direct flat exports for the root and every
  table part while preserving the component behavior and styling affordances.
- 2026-06-27: Audited the owned Ark factory migration, simplified striped/interactive row styling,
  removed docs-only playground code, and aligned public docs with the no-dedicated-Ark-primitive API
  reference wording.
- 2026-06-21: Migrated `Table` to an Ark-style owned component using `@ark-ui/react/factory`,
  namespace parts, `asChild`, `data-scope` / `data-part`, Chakra-informed part names, new visual
  props, updated styling hooks, and renamed scroll-area / column-header tokens.