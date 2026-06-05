# Table

There is no Base UI primitive behind `Table`. It is a small native wrapper over semantic table
elements with moduix styling, `data-slot` hooks, and the same part names most users expect from a
shadcn-like table API.

## Purpose

Use `Table` for read-only or lightly interactive tabular data: invoices, settings matrices,
comparisons, audit summaries, or simple admin views.

Use this component when you want:

- semantic table markup with library styling defaults;
- a familiar `TableHeader` / `TableBody` / `TableRow` / `TableCell` composition model;
- a small primitive with a little high-frequency sugar, without turning it into a data grid.

Use plain HTML tables when you do not need the design-system contract. Use a future higher-level
data-table abstraction when you need sorting, filtering, selection, or virtualization.

## Current behavior contract

- `Table` renders a native `<table>` with `data-slot="table"`.
- `TableContainer` is an optional shell for the common “bordered horizontal scroll area” case. It
  renders a plain `<div>` with `overflow-x: auto`, border, radius, and card background defaults.
- `TableHeader`, `TableBody`, `TableFooter`, `TableRow`, `TableHead`, `TableCell`, and
  `TableCaption` are thin semantic wrappers over the corresponding HTML elements.
- `Table` does **not** add scrolling containers, sorting state, column sizing, row selection,
  pagination, sticky headers, or empty-state logic.
- Header and body rows render a shared bottom border. The last body row drops its border.
- Body rows get a subtle hover background by default.
- `TableFooter` adds a top border, muted background, and medium text weight for summary rows.
- `TableHead` and `TableCell` accept `numeric` for the common “right-aligned, tabular numerals”
  case.
- `TableEmpty` renders a centered empty-state row for the common “no results” case.
- `TableCaption` defaults to the bottom for the familiar shadcn-like path, but `side="top"` is
  supported when the label reads better before the table content.
- `TableCaption` inherits muted typography defaults and adds inline padding so it does not sit flush
  against the table edges.

## Basic usage

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from 'moduix';

export function InvoiceTable() {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead numeric>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell numeric>$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
```

## Composition

```text
TableContainer (optional)
└─ Table
   ├─ TableCaption (optional, `side="top" | "bottom"`)
   ├─ TableHeader
   │  └─ TableRow
   │     └─ TableHead
   ├─ TableBody
   │  ├─ TableRow
   │  │  └─ TableCell
   │  └─ TableEmpty (optional)
   └─ TableFooter (optional)
```

Recommended usage:

- use `TableContainer` for the common bordered overflow shell instead of rewriting that wrapper;
- use `TableHead` for column headers and `TableCell` for body/footer data cells;
- use `numeric` on headers and cells for amounts, totals, counters, and other numeric columns;
- use `TableEmpty` when a body would otherwise render no rows;
- wrap the table in `ScrollArea` instead of `TableContainer` when you need a custom scrolling surface;
- keep alignment concerns in `className` rather than adding component props;
- compose richer row content with existing components such as `Badge`, `Button`, or `Menu`.

## Public API

All exported parts extend their matching native table element props and accept `className`.

`TableHead` and `TableCell` also accept:

| Prop      | Type      | Default | Description                                                       |
| --------- | --------- | ------- | ----------------------------------------------------------------- |
| `numeric` | `boolean` | `false` | Applies right alignment and tabular numerals for numeric columns. |

`TableCaption` also accepts:

| Prop   | Type                | Default    | Description                                                        |
| ------ | ------------------- | ---------- | ------------------------------------------------------------------ |
| `side` | `'top' \| 'bottom'` | `'bottom'` | Controls whether the caption is rendered above or below the table. |

`TableEmpty` also accepts:

| Prop      | Type     | Description                               |
| --------- | -------- | ----------------------------------------- |
| `colSpan` | `number` | Required colspan for the empty-state row. |

| Part             | Element   | `data-slot`       |
| ---------------- | --------- | ----------------- |
| `TableContainer` | `div`     | `table-container` |
| `Table`          | `table`   | `table`           |
| `TableCaption`   | `caption` | `table-caption`   |
| `TableHeader`    | `thead`   | `table-header`    |
| `TableBody`      | `tbody`   | `table-body`      |
| `TableFooter`    | `tfoot`   | `table-footer`    |
| `TableRow`       | `tr`      | `table-row`       |
| `TableHead`      | `th`      | `table-head`      |
| `TableCell`      | `td`      | `table-cell`      |
| `TableEmpty`     | `td`      | `table-empty`     |

## Defaults and styling

The root table uses:

- `width: 100%`;
- collapsed borders;
- left-aligned text;
- small body typography from table-specific CSS variables.

Public CSS variables are registered in `packages/ui/src/styles/theme.css`.

| Variable                         | Default/fallback                             | Affects                                                   |
| -------------------------------- | -------------------------------------------- | --------------------------------------------------------- |
| `--table-border-color`           | `var(--color-border)`                        | Header, body, and footer dividers.                        |
| `--table-border-width`           | `var(--border-width-sm)`                     | Divider thickness.                                        |
| `--table-caption-color`          | `var(--color-muted-foreground)`              | Caption text color.                                       |
| `--table-caption-font-size`      | `var(--text-sm)`                             | Caption font size.                                        |
| `--table-caption-line-height`    | `var(--line-height-text-sm)`                 | Caption line height.                                      |
| `--table-caption-padding-edge`   | `var(--spacing-2)`                           | Outer top/bottom inset for captions, depending on `side`. |
| `--table-caption-padding-x`      | `var(--table-cell-padding-x)`                | Caption horizontal inset.                                 |
| `--table-caption-padding-y`      | `var(--spacing-3)`                           | Inner spacing between the caption and the table.          |
| `--table-cell-padding-x`         | `var(--spacing-4)`                           | Cell horizontal padding.                                  |
| `--table-cell-padding-y`         | `var(--spacing-3)`                           | Cell vertical padding.                                    |
| `--table-color`                  | `var(--color-foreground)`                    | Root text color.                                          |
| `--table-container-bg`           | `var(--color-card)`                          | Container background.                                     |
| `--table-container-border-color` | `var(--table-border-color)`                  | Container border color.                                   |
| `--table-container-border-width` | `var(--table-border-width)`                  | Container border width.                                   |
| `--table-container-radius`       | `var(--radius-lg)`                           | Container border radius.                                  |
| `--table-container-shadow`       | `none`                                       | Container shadow.                                         |
| `--table-empty-color`            | `var(--color-muted-foreground)`              | Empty-state row text color.                               |
| `--table-empty-padding-y`        | `calc(var(--table-cell-padding-y) * 2)`      | Empty-state row vertical padding.                         |
| `--table-font-family`            | `var(--font-sans)`                           | Root font family.                                         |
| `--table-font-size`              | `var(--text-sm)`                             | Root font size.                                           |
| `--table-footer-bg`              | `var(--color-muted)`                         | Footer background.                                        |
| `--table-footer-color`           | `var(--table-color)`                         | Footer text color.                                        |
| `--table-footer-font-weight`     | `var(--weight-medium)`                       | Footer text weight.                                       |
| `--table-head-color`             | `var(--color-muted-foreground)`              | Header cell text color.                                   |
| `--table-head-font-weight`       | `var(--weight-medium)`                       | Header cell text weight.                                  |
| `--table-line-height`            | `var(--line-height-text-sm)`                 | Root line height.                                         |
| `--table-row-bg-hover`           | `var(--color-muted)`                         | Body row hover background.                                |
| `--table-row-transition`         | `background-color var(--transition-default)` | Row hover transition.                                     |

## Intentional differences from shadcn

- `Table` stays a native `<table>`, but moduix adds `TableContainer` as a small convenience for the
  most common overflow shell.
- There is no built-in selected-row styling or checkbox-column special casing.
- The only wrapper-level sugar is `TableContainer`, `numeric`, and `TableEmpty`.

## Agent notes

- Keep this component native and boring. Do not turn it into a data-grid abstraction.
- If future work needs sorting, filtering, selection, or virtualization, build that as a higher-level
  component on top of `Table` instead of expanding this primitive.

## Local changelog

- Added the initial `Table` primitive with semantic table parts, light default styling, and a small
  shadcn-like composition API.
- Added `TableCaption side="top" | "bottom"` and inset caption styling to make captions read better in
  bordered table shells.
- Added a small outer caption inset so top captions get breathing room above and bottom captions below.
- Added three small sugar layers: `TableContainer`, `numeric` on headers/cells, and `TableEmpty`.