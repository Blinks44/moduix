# Stack

## Upstream docs

- Ark UI: no Stack primitive; the component uses the Ark factory and composition model:
  https://ark-ui.com/docs/guides/composition
- Chakra UI Stack: https://chakra-ui.com/docs/components/stack
- shadcn/ui has no Stack component.

## Purpose

`Stack` lays out children in one flex container with direction, gap, alignment, wrapping, and a
two-breakpoint responsive direction. It follows Chakra's `direction`, `gap`, `align`, `justify`,
and `wrap` props without `HStack`, `VStack`, the `separator` prop, or a default gap.

## Current behavior contract

- `Stack` is the only component export; `StackRootProps` and `StackDirection` are exported types.
- Root accepts Ark factory div props, including `asChild`, and forwards its ref to the rendered root.
- The stylesheet (`flex flex-col` in Tailwind) sets `display: flex` and `flex-direction: column`, so
  consumer classes can replace both, including inside media queries.
- `direction` accepts `row`, `row-reverse`, `column`, `column-reverse`, or `{ mobile, desktop }`.
  The desktop value applies from `640px` (Tailwind `sm`). Responsive values are mobile-first: an
  omitted `mobile` stays `column`, an omitted `desktop` keeps the mobile direction.
- CSS Modules write the direction into private `--_stack-direction*` properties that every root
  redeclares, so nested stacks never inherit a parent's direction.
- `fill` adds a class with `flex: 1 1 0%` (`flex-1` in Tailwind) so the stack grows as a flex item.
- `gap`, `align`, `justify`, and `wrap` write inline styles only when passed. Numbers in `gap` are
  pixels. `style` is merged last and is the final per-instance override.
- There are no public CSS variables, state attributes, or item wrappers.

## Anatomy

```text
Stack
└─ root (data-scope="stack" data-part="root" data-slot="stack-root")
```

## Agent notes

- Keep the component root-only and stateless. Compose `Separator` as an ordinary child instead of
  adding a `separator` prop or child processing.
- Keep the direction and `fill` defaults in the stylesheet, not in inline styles: inline styles beat
  every consumer class, and inherited custom properties leak into nested stacks.
- Keep `gap` opt-in, unlike Chakra's `0.5rem`, so Stack stays a neutral layout primitive.