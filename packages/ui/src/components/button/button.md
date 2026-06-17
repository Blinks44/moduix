# Button

Upstream references:

- Ark UI styling guide: https://ark-ui.com/docs/guides/styling
- Ark UI composition guide: https://ark-ui.com/docs/guides/composition

## Purpose

`Button` is the moduix action control built as an Ark-style factory wrapper. Ark UI does not ship a
dedicated button primitive, so moduix exposes `Button.Root` on top of `@ark-ui/react/factory` and
keeps the wrapper limited to styling, `data-slot`, and `asChild` composition.

## Current behavior contract

- Uses one Ark-aligned root part: `Button.Root`.
- Keeps `Button` as a callable alias of `Button.Root`.
- Supports Ark factory root props such as `asChild`, `className`, `style`, event handlers, and
  native button attributes.
- `variant` and `size` are the only local root props. They map to `data-variant` and `data-size`.
- Writes `data-scope="button"`, `data-part="root"`, and `data-slot="button-root"` on the root.
- Does not keep Base UI `render`, `nativeButton`, or `focusableWhenDisabled`.

## Composition

```tsx
import { Button } from 'moduix';

export function SaveButton() {
  return <Button.Root>Save Changes</Button.Root>;
}
```

```text
Button.Root
└─ root[data-scope="button"][data-part="root"][data-slot="button-root"]
   ├─ icon, spinner, or other visual child (optional)
   └─ text label
```

Use `asChild` when another element should own the DOM node:

```tsx
<Button.Root asChild variant="outline">
  <a href="/docs/button">Open Button Docs</a>
</Button.Root>
```

For icon-only buttons, use an `icon-*` size and provide an accessible name with `aria-label` or an
equivalent labeling mechanism.

## Defaults and styling

Every exported root accepts `className` and receives stable hooks:

| Part          | `data-slot`   |
| ------------- | ------------- |
| `Button.Root` | `button-root` |
| `Button`      | alias of root |

The root also exposes:

- `data-scope="button"`
- `data-part="root"`
- `data-variant="<variant>"`
- `data-size="<size>"`

Disabled styling is driven by native `[disabled]` and `[aria-disabled='true']`.

| Entry       | Default   | Values                                                                                   |
| ----------- | --------- | ---------------------------------------------------------------------------------------- |
| `variant`   | `default` | `default`, `outline`, `secondary`, `destructive`, `destructive-outline`, `ghost`, `link` |
| `size`      | `md`      | `xs`, `sm`, `md`, `lg`, `xl`, `icon-sm`, `icon-md`, `icon-lg`                            |
| `asChild`   | `false`   | Ark factory composition                                                                  |
| `className` | -         | Applied to the root                                                                      |

Primary CSS variables:

| Variable                                            | Default/fallback                                |
| --------------------------------------------------- | ----------------------------------------------- |
| `--button-border-width`                             | `var(--border-width-sm)`                        |
| `--button-color`                                    | `var(--color-foreground)`                       |
| `--button-content-gap`                              | `var(--spacing-2)`                              |
| `--button-default-bg`                               | `var(--color-primary)`                          |
| `--button-default-bg-hover`                         | `var(--color-foreground)`                       |
| `--button-default-border-color`                     | `var(--color-primary)`                          |
| `--button-default-color`                            | `var(--color-primary-foreground)`               |
| `--button-destructive-bg`                           | `var(--color-destructive)`                      |
| `--button-destructive-border-color`                 | `var(--color-destructive)`                      |
| `--button-destructive-color`                        | `var(--color-primary-foreground)`               |
| `--button-destructive-hover-brightness`             | `0.96`                                          |
| `--button-destructive-outline-bg`                   | `var(--color-background)`                       |
| `--button-destructive-outline-bg-hover`             | `var(--color-destructive)`                      |
| `--button-destructive-outline-border-color`         | `var(--color-destructive)`                      |
| `--button-destructive-outline-color`                | `var(--color-destructive)`                      |
| `--button-destructive-outline-color-hover`          | `var(--button-destructive-color)`               |
| `--button-disabled-opacity`                         | `var(--opacity-disabled)`                       |
| `--button-focus-ring-color`                         | `var(--color-ring)`                             |
| `--button-focus-ring-offset`                        | `var(--button-border-width)`                    |
| `--button-focus-ring-width`                         | `var(--border-width-md)`                        |
| `--button-font-size`                                | `var(--text-sm)`                                |
| `--button-font-size-xs` / `--button-line-height-xs` | `var(--text-xs)` / `var(--line-height-text-xs)` |
| `--button-font-size-lg` / `--button-line-height-lg` | `var(--text-md)` / `var(--line-height-text-md)` |
| `--button-font-size-xl` / `--button-line-height-xl` | `var(--text-lg)` / `var(--line-height-text-lg)` |
| `--button-font-weight`                              | `var(--weight-medium)`                          |
| `--button-ghost-bg`                                 | `transparent`                                   |
| `--button-ghost-bg-hover`                           | `var(--color-accent)`                           |
| `--button-ghost-border-color`                       | `transparent`                                   |
| `--button-ghost-color`                              | `var(--color-foreground)`                       |
| `--button-icon-size`                                | `1rem`                                          |
| `--button-line-height`                              | `var(--line-height-text-sm)`                    |
| `--button-link-color`                               | `var(--color-primary)`                          |
| `--button-link-color-hover`                         | `var(--color-foreground)`                       |
| `--button-link-text-decoration`                     | `underline`                                     |
| `--button-link-underline-offset`                    | `0.25em`                                        |
| `--button-outline-bg`                               | `var(--color-background)`                       |
| `--button-outline-bg-hover`                         | `var(--color-accent)`                           |
| `--button-outline-border-color`                     | `var(--color-border)`                           |
| `--button-outline-color`                            | `var(--color-foreground)`                       |
| `--button-padding-x-xs` / `--button-padding-y-xs`   | `0.625rem` / `0.25rem`                          |
| `--button-padding-x-sm` / `--button-padding-y-sm`   | `0.75rem` / `0.375rem`                          |
| `--button-padding-x-md` / `--button-padding-y-md`   | `1rem` / `0.5rem`                               |
| `--button-padding-x-lg` / `--button-padding-y-lg`   | `1.25rem` / `0.625rem`                          |
| `--button-padding-x-xl` / `--button-padding-y-xl`   | `1.5rem` / `0.75rem`                            |
| `--button-radius`                                   | `var(--radius-md)`                              |
| `--button-secondary-bg`                             | `var(--color-secondary)`                        |
| `--button-secondary-bg-hover`                       | `var(--color-accent)`                           |
| `--button-secondary-border-color`                   | `var(--color-secondary)`                        |
| `--button-secondary-color`                          | `var(--color-secondary-foreground)`             |
| `--button-size-icon-sm`                             | `var(--size-sm)`                                |
| `--button-size-icon-md`                             | `var(--size-lg)`                                |
| `--button-size-icon-lg`                             | `var(--size-xl)`                                |
| `--button-size-xs`                                  | `var(--size-xs)`                                |
| `--button-size-sm`                                  | `var(--size-sm)`                                |
| `--button-size-md`                                  | `var(--size-lg)`                                |
| `--button-size-lg`                                  | `var(--size-xl)`                                |
| `--button-size-xl`                                  | `3.5rem`                                        |
| `--button-transition`                               | `var(--transition-default)`                     |

## Intentional differences from upstream

- Ark UI has no button primitive here; moduix owns the root wrapper.
- moduix ships pre-styled defaults and the local `variant` / `size` shortcuts.
- The old Base UI `render`, `nativeButton`, and `focusableWhenDisabled` surface is removed. Use
  `asChild` for polymorphism and native `disabled` or `aria-disabled` depending on the rendered
  element.

## Agent notes

- Keep the wrapper root-only unless a real multi-part button contract appears.
- Keep `variant` and `size` synchronized across `Button.tsx`, CSS, stories, docs, and theme tokens.
- Do not reintroduce Base button shims or converted prop names.

## Local changelog

- 2026-06-17: Migrated `Button` from Base UI to an Ark-style factory wrapper, added `Button.Root`
  plus the callable `Button` alias, and replaced `render` / `nativeButton` with `asChild`.
- 2026-06-17: Switched disabled styling hooks to native `[disabled]` and `[aria-disabled='true']`
  for the root-only Ark surface.