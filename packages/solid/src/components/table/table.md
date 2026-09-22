# Table (Solid)

`Table` preserves the React component's semantic table parts, visual props, stable data hooks,
CSS-variable contract, `TableEmpty` sugar, and flat public API.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <table {...props()} aria-label="Invoices" />}`. Its factory does not forward
`ref` through `asChild`, so ordinary refs and custom-host composition are supported as separate
native paths. The Solid tests cover them independently.

## Contract parity

- `Table` is the root component and renders a native `<table>` by default.
- `TableScrollArea`, `TableCaption`, `TableColumnGroup`, `TableColumn`, `TableHeader`, `TableBody`,
  `TableFooter`, `TableRow`, `TableColumnHeader`, and `TableCell` render their matching native
  elements.
- `TableEmpty` renders a full empty row with a required `colSpan`; its `asChild` replaces only the
  generated cell.
- Root props are `interactive`, `showColumnBorder`, `size`, `stickyHeader`, `striped`, and
  `variant`. `TableColumn.htmlWidth` maps to the native `width` attribute, and headers/cells support
  `numeric` alignment.
- The component owns no sorting, filtering, selection, pagination, virtualization, or row-action
  state.

Every part exposes `data-scope="table"`, a stable `data-part`, and its matching `data-slot`.
Native refs, HTML attributes, and semantic accessibility metadata remain available on each part.
