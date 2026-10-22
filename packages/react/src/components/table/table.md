# Table

Upstream docs (accessed 2026-10-22):

- Ark UI: no Table primitive. Parts follow https://ark-ui.com/docs/guides/composition and
  https://ark-ui.com/docs/guides/styling.
- Chakra UI: https://chakra-ui.com/docs/components/table
- shadcn/ui: https://ui.shadcn.com/docs/components/table

## Contract

- Every part renders its native element through `ark.*`, supports `asChild`, forwards refs, and
  exposes `data-scope="table"`, a stable `data-part`, and `data-slot`.
- `Table` accepts `size` (`sm` | `md` | `lg`, default `md`), `interactive`, `striped`,
  `stickyHeader`, and `showColumnBorder`, mirrored as `data-size`, `data-interactive`,
  `data-striped`, `data-sticky-header`, and `data-show-column-border`.
- `TableScrollArea` is the optional bordered horizontal-scroll shell and owns the outer border.
- `TableCaption` takes `side` (`top` | `bottom`, default `bottom`), mirrored as `data-side`.
- `TableColumnHeader` and `TableCell` take `numeric` (end-aligned, tabular, no wrap), mirrored as
  `data-numeric`. Cells with `data-sticky="start" | "end"` stick to that inline edge.
- `TableColumn` uses the native `width` attribute.
- `TableEmpty` is the only sugar: a `TableRow` with `data-empty` around one cell with a required
  `colSpan` and the `a11yLabels.noResults` default text. Its `asChild` replaces only the cell.
- The component owns no sorting, filtering, selection, pagination, or virtualization state.

## Anatomy

```text
TableScrollArea (optional)
└─ Table
   ├─ TableColumnGroup > TableColumn (optional)
   ├─ TableCaption (optional)
   ├─ TableHeader > TableRow > TableColumnHeader
   ├─ TableBody > TableRow > TableCell | TableEmpty
   └─ TableFooter (optional)
```

## Styling

The CSS Modules packages expose `--moduix-table-bg` (scroll area, sticky header, and sticky
cells), `--moduix-table-border-color`, `--moduix-table-cell-padding-x`,
`--moduix-table-cell-padding-y`, `--moduix-table-row-bg-hover` (hover and focus within), and
`--moduix-table-row-bg-striped`. Override anything else with a class on the part.

Rows keep their state color in the private `--_table-row-bg` property. Sticky cells paint it as a
gradient over their opaque background, so hover, focus, and stripes reach sticky columns without
letting scrolled content show through.

## Agent notes

- Keep the parts explicit and native; do not add a `variant` prop for the outer border, since
  `TableScrollArea` owns it.
- Do not add sorting, filtering, selection, or pagination state; build those on top of `Table`.
- Keep `TableEmpty` a convenience row, not a full empty-state component.