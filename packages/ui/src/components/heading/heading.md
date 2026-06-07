# Heading

`Heading` is a native typography wrapper for semantic section titles and page titles.

There is no Base UI heading primitive behind this component. The contract is intentionally small:
it renders exactly one `h1`-`h6` element, adds library typography styles, and exposes a few styling
hooks for size and weight.

## Purpose

Use `Heading` when you need:

- native heading semantics for the document outline;
- design-system heading tokens without writing custom CSS;
- visual size overrides that stay independent from semantic level.

Use `Text` for body copy, inline copy, and muted/supporting text.

## Current behavior contract

`Heading` renders a single heading root with:

- `data-slot="heading-root"`;
- `data-size` for the resolved size variant;
- `data-weight` for the resolved weight variant.

The component does **not** expose slots, subcomponents, `render`, or structural composition helpers.
`className` and CSS variables are the supported escape hatches.

Default behavior:

| Prop     | Default    | Values                                  |
| -------- | ---------- | --------------------------------------- |
| `as`     | `h1`       | `h1`, `h2`, `h3`, `h4`, `h5`, `h6`      |
| `size`   | by `as`    | `xs`, `sm`, `md`, `lg`, `xl`, `2xl`     |
| `weight` | `semibold` | `regular`, `medium`, `semibold`, `bold` |

Default size mapping:

- `h1 -> 2xl`
- `h2 -> xl`
- `h3 -> lg`
- `h4 -> md`
- `h5 -> sm`
- `h6 -> xs`

## Basic usage

```tsx
import { Heading } from 'moduix';

export function Example() {
  return <Heading>Build reliable interfaces</Heading>;
}
```

## Composition

Keep semantics and presentation separate:

```tsx
import { Heading } from 'moduix';

export function Example() {
  return (
    <>
      <Heading as="h1">Page title</Heading>
      <Heading as="h2" size="2xl">
        Hero title rendered as h2
      </Heading>
    </>
  );
}
```

Recommended usage:

- use `as` for document structure;
- use `size` only when visual hierarchy should differ from semantic level;
- use `weight` for the built-in emphasis presets;
- use `className` or CSS variables for one-off styling changes.

The children should stay simple: text and inline content are the intended path. `Heading` does not
manage spacing, layout, truncation, or focus behavior for nested interactive content.

## Public API

`Heading` accepts native heading attributes plus these wrapper props:

| Prop        | Type                                    | Description                                           |
| ----------- | --------------------------------------- | ----------------------------------------------------- |
| `as`        | `h1 \| h2 \| h3 \| h4 \| h5 \| h6`      | Chooses the semantic heading element.                 |
| `size`      | `xs \| sm \| md \| lg \| xl \| 2xl`     | Overrides the visual size without changing semantics. |
| `weight`    | `regular \| medium \| semibold \| bold` | Controls the font-weight preset.                      |
| `className` | `string`                                | Adds classes to the root heading element.             |

Exported types:

- `HeadingProps`
- `HeadingLevel`
- `HeadingSize`
- `HeadingWeight`

## Styling API

Root hooks:

- `data-slot="heading-root"`
- `data-size="xs" | "sm" | "md" | "lg" | "xl" | "2xl"`
- `data-weight="regular" | "medium" | "semibold" | "bold"`

Public CSS variables:

| Variable                         | Default                       |
| -------------------------------- | ----------------------------- |
| `--heading-color`                | `var(--color-foreground)`     |
| `--heading-font-family`          | `var(--font-sans)`            |
| `--heading-font-size`            | size-dependent fallback       |
| `--heading-font-size-xs`         | `var(--text-sm)`              |
| `--heading-font-size-sm`         | `var(--text-md)`              |
| `--heading-font-size-md`         | `var(--text-lg)`              |
| `--heading-font-size-lg`         | `var(--text-xl)`              |
| `--heading-font-size-xl`         | `var(--text-2xl)`             |
| `--heading-font-size-2xl`        | `var(--text-3xl)`             |
| `--heading-font-weight`          | `var(--weight-semibold)`      |
| `--heading-font-weight-bold`     | `var(--weight-bold)`          |
| `--heading-font-weight-medium`   | `var(--weight-medium)`        |
| `--heading-font-weight-regular`  | `var(--weight-regular)`       |
| `--heading-font-weight-semibold` | `var(--weight-semibold)`      |
| `--heading-letter-spacing`       | `0`                           |
| `--heading-line-height`          | size-dependent fallback       |
| `--heading-line-height-xs`       | `var(--line-height-text-sm)`  |
| `--heading-line-height-sm`       | `var(--line-height-text-md)`  |
| `--heading-line-height-md`       | `var(--line-height-text-lg)`  |
| `--heading-line-height-lg`       | `var(--line-height-text-xl)`  |
| `--heading-line-height-xl`       | `var(--line-height-text-2xl)` |
| `--heading-line-height-2xl`      | `var(--line-height-text-3xl)` |
| `--heading-text-wrap`            | `balance`                     |

Example override:

```tsx
import { Heading } from 'moduix';
import styles from './example.module.css';

export function Example() {
  return (
    <Heading as="h2" className={styles.customHeading}>
      Customized heading
    </Heading>
  );
}
```

```css
.customHeading {
  --heading-color: var(--color-primary);
  --heading-font-size-xl: var(--text-3xl);
  --heading-line-height-xl: var(--line-height-text-3xl);
  --heading-font-weight-semibold: var(--weight-bold);
}
```

## UX and accessibility notes

- `Heading` keeps native `h1`-`h6` semantics, so it does not need extra ARIA by default.
- Do not change heading level for appearance alone; keep the outline correct and use `size` for visual overrides.
- The component has no interactive, disabled, read-only, focus, or keyboard-management states.
- Because the root uses `text-wrap: balance` by default, long titles wrap more evenly. Override
  `--heading-text-wrap` if a layout needs a different wrapping strategy.

## Limitations and recommendations

- `Heading` is not a general polymorphic typography component. If you need arbitrary tags or custom
  rendered elements, use `Text` or compose your own wrapper.
- There is no built-in tone, alignment, truncation, or spacing API. Keep those concerns in layout
  or component-specific styles.
- Keep headings concise. Large blocks of copy should move to `Text`.

## Intentional differences from Base UI

- no Base UI primitive wrapper;
- no stateful behavior or interaction layer;
- no parts API beyond the root element;
- no helper props beyond semantic level, visual size, and weight.

## Agent notes

- Preserve the default semantic-to-size mapping unless the public typography scale changes.
- Preserve `data-slot`, `data-size`, `data-weight`, and the documented `--heading-*` variable contract.
- Do not add polymorphic or slot-based APIs unless there is a repeated consumer need strong enough to
  justify the extra surface area.

## Local changelog

- 2026-06-02: Rewrote the local documentation around the shipped `Heading` wrapper contract and
  documented the exported `Heading*` TypeScript types.