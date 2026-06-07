# Text

`Text` is the default moduix typography primitive for body copy, inline copy, helper text, and small
semantic emphasis.

There is no dedicated Base UI `Text` primitive behind this component. The wrapper uses Base UI
`useRender` only to keep root replacement simple while the shipped moduix contract stays small and
predictable.

## Purpose

Use `Text` when you need:

- body typography tokens without writing local CSS for every paragraph;
- a small set of visual variants for size, weight, tone, and alignment;
- simple semantic swaps such as `span`, `small`, `strong`, `em`, or `div`;
- custom root composition through `render` for app-level primitives such as links.

Use `Heading` for document headings. Use local layout or component CSS for spacing, truncation, or
rich text layout concerns that do not belong in the typography primitive itself.

## Current behavior contract

`Text` renders exactly one root element and always applies:

- `data-slot="text-root"`;
- `data-size` with the resolved size variant;
- `data-weight` with the resolved weight variant;
- `data-tone` with the resolved tone variant;
- `data-align` only when `align` is provided.

Default behavior:

| Prop     | Default         | Values                                                 |
| -------- | --------------- | ------------------------------------------------------ |
| `as`     | `p`             | `p`, `span`, `small`, `strong`, `em`, `div`            |
| `render` | unset           | React element or Base UI render function               |
| `size`   | render-based    | `xs`, `sm`, `md`, `lg`, `xl`                           |
| `weight` | render-based    | `regular`, `medium`, `semibold`, `bold`                |
| `tone`   | `default`       | `default`, `muted`, `subtle`, `primary`, `destructive` |
| `align`  | unset (`start`) | `left`, `center`, `right`                              |

Resolved defaults for `size` and `weight`:

- default root (`p`) -> `size="md"`, `weight="regular"`
- `as="small"` or `render={<small />}` -> `size="sm"`, `weight="regular"`
- `as="strong"` or `render={<strong />}` -> `size="md"`, `weight="semibold"`
- every other intrinsic element or custom rendered component -> `size="md"`, `weight="regular"`

The wrapper does not add interactive behavior, disabled/read-only states, truncation helpers, rich
text parsing, or layout spacing.

## Basic usage

```tsx
import { Text } from 'moduix';

export function ReleaseNote() {
  return (
    <>
      <Text>Use text to describe interface state and supporting details.</Text>
      <Text as="small" tone="muted">
        Last updated 2 minutes ago
      </Text>
    </>
  );
}
```

## Composition

`Text` has two intended composition paths:

| Pattern             | Best fit                                                         |
| ------------------- | ---------------------------------------------------------------- |
| default `p` / `as`  | Native semantic elements that only need moduix typography styles |
| `render={<Link />}` | Router links or app-specific primitives that own the root        |

Intrinsic semantic swap:

```tsx
import { Text } from 'moduix';

export function Metadata() {
  return (
    <Text as="small" tone="muted">
      Last synced 2 minutes ago
    </Text>
  );
}
```

Custom root element:

```tsx
import type { ComponentPropsWithoutRef } from 'react';
import { Text } from 'moduix';

type InlineLinkProps = ComponentPropsWithoutRef<'a'>;

function InlineLink(props: InlineLinkProps) {
  return <a {...props} />;
}

export function DocsLink() {
  return (
    <Text render={<InlineLink href="/docs" />} tone="primary" weight="medium">
      Read the documentation
    </Text>
  );
}
```

Recommendations:

- prefer `as` when an intrinsic HTML tag is enough;
- prefer `render` only when the root must be a custom component;
- keep the children simple and inline-friendly;
- keep spacing and layout outside of `Text`.

## Parts

| Part   | Element/primitive | Purpose                                           |
| ------ | ----------------- | ------------------------------------------------- |
| `Text` | root element      | Styled body-text root with semantic tag override. |

There are no slots, subcomponents, `slotProps`, or class-name maps.

## Public API

`Text` accepts native paragraph attributes plus the wrapper props below.

| Prop        | Type                                                   | Description                                                   |
| ----------- | ------------------------------------------------------ | ------------------------------------------------------------- |
| `as`        | `p \| span \| small \| strong \| em \| div`            | Replaces the default root with a supported intrinsic element. |
| `render`    | Base UI `render` prop                                  | Replaces the root with a React element or render function.    |
| `size`      | `xs \| sm \| md \| lg \| xl`                           | Overrides the visual text size.                               |
| `weight`    | `regular \| medium \| semibold \| bold`                | Overrides the font-weight preset.                             |
| `tone`      | `default \| muted \| subtle \| primary \| destructive` | Selects the built-in text color preset.                       |
| `align`     | `left \| center \| right`                              | Sets text alignment on the root element.                      |
| `className` | `string`                                               | Adds classes to the root element.                             |
| `style`     | native React style prop                                | Useful for one-off CSS variable overrides.                    |
| `children`  | React node                                             | Text or inline content rendered inside the root.              |

Exported types:

- `TextProps`
- `TextElement`
- `TextSize`
- `TextWeight`
- `TextTone`
- `TextAlign`

## Styling API

Root hooks:

| Hook          | When it exists                                   |
| ------------- | ------------------------------------------------ |
| `data-slot`   | Always present as `text-root`.                   |
| `data-size`   | Always present with the resolved size variant.   |
| `data-weight` | Always present with the resolved weight variant. |
| `data-tone`   | Always present with the resolved tone variant.   |
| `data-align`  | Present only when `align` is set.                |

Important styling details:

- the base style resets paragraph margin to `0`;
- the default alignment is `text-align: start`, which stays logical for LTR and RTL content;
- explicit `align` values use physical CSS values (`left`, `center`, `right`);
- long words wrap with `overflow-wrap: break-word`.

Public CSS variables:

| Variable                      | Default                             |
| ----------------------------- | ----------------------------------- |
| `--text-default-color`        | `var(--color-foreground)`           |
| `--text-destructive-color`    | `var(--color-destructive)`          |
| `--text-font-family`          | `var(--font-sans)`                  |
| `--text-font-size-xs`         | `var(--text-xs)`                    |
| `--text-font-size-sm`         | `var(--text-sm)`                    |
| `--text-font-size-md`         | `var(--text-md)`                    |
| `--text-font-size-lg`         | `var(--text-lg)`                    |
| `--text-font-size-xl`         | `var(--text-xl)`                    |
| `--text-font-weight-bold`     | `var(--weight-bold)`                |
| `--text-font-weight-medium`   | `var(--weight-medium)`              |
| `--text-font-weight-regular`  | `var(--weight-regular)`             |
| `--text-font-weight-semibold` | `var(--weight-semibold)`            |
| `--text-letter-spacing`       | `0`                                 |
| `--text-line-height-xs`       | `var(--line-height-text-xs)`        |
| `--text-line-height-sm`       | `var(--line-height-text-sm)`        |
| `--text-line-height-md`       | `var(--line-height-text-md)`        |
| `--text-line-height-lg`       | `var(--line-height-text-lg)`        |
| `--text-line-height-xl`       | `var(--line-height-text-xl)`        |
| `--text-muted-color`          | `var(--color-muted-foreground)`     |
| `--text-primary-color`        | `var(--color-primary)`              |
| `--text-subtle-color`         | `var(--color-secondary-foreground)` |

Example override:

```tsx
import { Text } from 'moduix';
import styles from './example.module.css';

export function Example() {
  return <Text className={styles.customText}>Customized body copy.</Text>;
}
```

```css
.customText {
  --text-default-color: var(--color-primary);
  --text-font-size-md: var(--text-lg);
  --text-line-height-md: var(--line-height-text-lg);
  --text-font-weight-regular: var(--weight-medium);
}
```

## UX and accessibility notes

- `Text` keeps native semantics; use `as` to choose the correct HTML meaning instead of adding ARIA.
- Use `small`, `strong`, and `em` only when the semantic meaning fits, not only for visual styling.
- Do not rely on `tone` alone to communicate destructive or important state; pair color with clear
  copy or supporting icons when the meaning matters.
- When using `render`, preserve the semantics and focus behavior of the element you render.
- The component has no keyboard, focus-management, disabled, or read-only behavior of its own.

## Limitations and recommendations

- `Text` is not a rich-text renderer or markdown wrapper.
- It does not provide truncation, line clamp, link styling, spacing, or responsive typography props.
- It is intentionally limited to a small intrinsic `as` set. For anything else, use `render`.
- If the text should be the interactive control itself, let the rendered element own that behavior.

## Intentional differences from Base UI

- there is no dedicated Base UI text primitive to mirror here;
- moduix ships a styled typography root with `data-slot` and documented `--text-*` variables;
- the local docs describe the moduix wrapper contract instead of generic `useRender` behavior;
- `Text` keeps a narrow semantic `as` API and uses `render` as the explicit escape hatch.

## Agent notes

- Preserve the intrinsic default mapping for `small` and `strong` unless the public typography scale changes.
- Keep the local markdown, Storybook stories, docs examples, and shipped `Text` API synchronized.
- If `Text` gains new public variants or `--text-*` variables, update this file in the same task.
- Do not add layout, truncation, interactive, or slot-based props unless there is a repeated consumer need
  strong enough to justify the extra API surface.

## Local changelog

- 2026-06-03: Rewrote the local documentation around the shipped moduix `Text` contract, including the
  real default semantics, composition model, styling hooks, CSS variables, accessibility guidance, and
  exported TypeScript types.
- 2026-06-03: Exported `TextProps`, `TextElement`, `TextSize`, `TextWeight`, `TextTone`, and `TextAlign`
  for consumer-side typing and wrapper composition.