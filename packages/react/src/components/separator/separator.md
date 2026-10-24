# Separator

Upstream docs:

- Ark UI: no dedicated primitive; built with https://ark-ui.com/docs/guides/composition
- Chakra UI: https://chakra-ui.com/docs/components/separator

## Contract

- `Separator` is the only public component: one `ark.span` root with `asChild` and a forwarded ref.
- Local props: `orientation` (`horizontal` | `vertical`, default `horizontal`), `variant`
  (`solid` | `dashed` | `dotted`, default `solid`), and `size` (`xs` | `sm` | `md` | `lg`, default
  `sm`), the same model and thickness scale as Chakra (0.5px, 1px, 2px, 3px).
- Exported types: `SeparatorRootProps`, `SeparatorOrientation`, `SeparatorSize`, `SeparatorVariant`.
- The component is non-interactive and has no state, context, or callbacks.

```text
Separator
└─ root[data-scope="separator"][data-part="root"][data-slot="separator-root"]
```

## Accessibility

- `role` defaults to `separator`, and `aria-orientation` follows `orientation` only while the role is
  `separator`. Pass `role="presentation"` for a purely decorative line; a passthrough
  `aria-orientation` is then dropped.
- The wrapper owns `role`, `aria-orientation`, `data-scope`, `data-part`, `data-slot`,
  `data-orientation`, `data-size`, and `data-variant`; passthrough values do not override them.

## Styling

- The line is a border (`border-block-start` or `border-inline-start`), so dashed and dotted are
  native border styles. Horizontal lines are `100%` wide; vertical lines are `1em` tall.
- The root has `margin: 0`, so an `asChild` `hr` matches the default span.
- CSS Modules expose two variables: `--moduix-separator-color` (default
  `var(--moduix-color-border)`) and `--moduix-separator-thickness` (default: the active size). To
  theme one size, set the thickness on `[data-slot='separator-root'][data-size='<size>']`. Change
  length or border style with a plain class.
- Tailwind variants map the same values to utilities; consumer classes merge through `cn`.

## Agent notes

- Keep `Separator` thin and state-free.
- Keep the line border-based, not background-based.
- `Sidebar` sets `--moduix-separator-color` for `SidebarSeparator`.