# Table

Upstream docs:

- Ark UI: no dedicated Table primitive. Use https://ark-ui.com/docs/guides/composition, https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref.
- Chakra UI: https://chakra-ui.com/docs/components/table

## Purpose

Use `Table` for semantic, read-only or lightly interactive tabular data with moduix styling and an
Ark-style namespace API.

## Upstream model to preserve

Ark UI has no table state machine or primitive parts. The component follows Ark's owned-component
model instead: each part is rendered through `@ark-ui/react/factory`, supports `asChild`, and
forwards refs to the rendered native element. Each part exposes `data-scope="table"` plus a stable
`data-part`. Chakra's current Table recipe informs the
part names and visual props: `Root`, `ScrollArea`, `Caption`, `ColumnGroup`, `Column`, `Header`,
`Body`, `Footer`, `Row`, `ColumnHeader`, and `Cell`.

## Current behavior contract

- `Table` is the short root form and is equivalent to `Table.Root`.
- `Table` renders a native `<table>` by default and accepts `interactive`, `showColumnBorder`,
  `size`, `stickyHeader`, `striped`, and `variant`.
- `Table.ScrollArea` is the optional bordered horizontal-scroll shell.
- `Table.ColumnGroup` and `Table.Column` preserve native `colgroup` / `col` semantics.
- `Table.Caption`, `Header`, `Body`, `Footer`, `Row`, `ColumnHeader`, and `Cell` render their
  matching native table elements by default.
- `Table.Empty` is the only local sugar part. It renders a full empty row with a required `colSpan`.
- The component does not own sorting, filtering, selection, pagination, virtualization, or row
  action state.

## Anatomy and exported parts

```text
Table.ScrollArea (optional)
└─ Table / Table.Root
   ├─ Table.ColumnGroup (optional)
   │  └─ Table.Column
   ├─ Table.Caption (optional)
   ├─ Table.Header
   │  └─ Table.Row
   │     └─ Table.ColumnHeader
   ├─ Table.Body
   │  ├─ Table.Row
   │  │  └─ Table.Cell
   │  └─ Table.Empty (optional)
   └─ Table.Footer (optional)
```

| Part                   | Element    | `data-part`     | `data-slot`           |
| ---------------------- | ---------- | --------------- | --------------------- |
| `Table` / `Table.Root` | `table`    | `root`          | `table-root`          |
| `Table.ScrollArea`     | `div`      | `scroll-area`   | `table-scroll-area`   |
| `Table.ColumnGroup`    | `colgroup` | `column-group`  | `table-column-group`  |
| `Table.Column`         | `col`      | `column`        | `table-column`        |
| `Table.Caption`        | `caption`  | `caption`       | `table-caption`       |
| `Table.Header`         | `thead`    | `header`        | `table-header`        |
| `Table.Body`           | `tbody`    | `body`          | `table-body`          |
| `Table.Footer`         | `tfoot`    | `footer`        | `table-footer`        |
| `Table.Row`            | `tr`       | `row`           | `table-row`           |
| `Table.ColumnHeader`   | `th`       | `column-header` | `table-column-header` |
| `Table.Cell`           | `td`       | `cell`          | `table-cell`          |
| `Table.Empty`          | `td`       | `empty`         | `table-empty`         |

## Composition

```tsx
import { Table } from '@moduix/react';

export function InvoiceTable() {
  return (
    <Table.ScrollArea>
      <Table striped interactive>
        <Table.Caption side="top">Recent invoices</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Invoice</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader numeric>Amount</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>INV001</Table.Cell>
            <Table.Cell>Paid</Table.Cell>
            <Table.Cell numeric>$250.00</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Table.ScrollArea>
  );
}
```

## Upstream feature coverage

- Ark composition: every exported DOM part supports `asChild` through `ark.*`; consumers must pass a
  single semantic child when replacing a table element.
- Ark styling: parts expose `data-scope`, `data-part`, and stable moduix `data-slot` hooks.
- Chakra usage/anatomy: covered by the namespace part tree and native table semantics.
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

- `data-numeric` on `Table.ColumnHeader` and `Table.Cell`
- `data-sticky="start" | "end"` on sticky column header/data cells

## Defaults and styling

Public CSS variables are registered in `packages/react/src/lib/moduix/styles/theme.css`. Important variables:

- `--table-border-color`, `--table-border-width`
- `--table-cell-padding-x`, `--table-cell-padding-y`
- `--table-column-border-color`, `--table-column-border-width`
- `--table-column-header-color`, `--table-column-header-font-weight`
- `--table-scroll-area-bg`, `--table-scroll-area-border-color`,
  `--table-scroll-area-border-width`, `--table-scroll-area-radius`,
  `--table-scroll-area-shadow`
- `--table-row-bg-hover`, `--table-row-bg-striped`, `--table-row-transition`
- `--table-sticky-header-bg`, `--table-sticky-column-bg`, and sticky z-index variables

`interactive` controls hover highlighting. `striped` controls zebra rows. `variant="outline"` adds
a border around the table root; `Table.ScrollArea` owns the common outer surface.

## Intentional sugar and differences from upstream

- `Table.Empty` is moduix sugar for the common empty-state row. Chakra does not define this part.
- `numeric` is the local name for right-aligned tabular numerals on headers and cells.
- `htmlWidth` on `Table.Column` maps to the native `width` attribute to match Chakra's guidance.
- Moduix keeps the component native and does not wrap TanStack Table or own row selection/action
  state.

## Agent notes

- Do not re-add flat exports such as `TableCell` or `TableHeader`; the public API is namespace-first.
- Do not add sorting, filtering, selection, or pagination state to this primitive. Build those as
  higher-level compositions on top of `Table`.
- Keep `Table.Empty` narrow. It should remain a convenience row, not a full empty-state component.
- Keep table prop/type aliases private unless a real consumer need appears; the public surface is the
  namespaced component parts and their runtime behavior.

## Local changelog

- 2026-07-03: Simplified the public surface by keeping table part prop aliases private while
  preserving namespace composition, `Table.Empty`, and scroll-area styling affordances.
- 2026-06-27: Audited the owned Ark factory migration, simplified striped/interactive row styling,
  removed docs-only playground code, and aligned public docs with the no-dedicated-Ark-primitive API
  reference wording.
- 2026-06-21: Migrated `Table` to an Ark-style owned component using `@ark-ui/react/factory`,
  namespace parts, `asChild`, `data-scope` / `data-part`, Chakra-informed part names, new visual
  props, updated styling hooks, and renamed scroll-area / column-header tokens.