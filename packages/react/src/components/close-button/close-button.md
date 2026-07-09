# CloseButton

Upstream docs:

- Ark UI Composition: https://ark-ui.com/docs/guides/composition
- Ark UI Styling: https://ark-ui.com/docs/guides/styling
- Chakra UI: https://chakra-ui.com/docs/components/close-button

## Purpose

`CloseButton` is the moduix icon-only dismiss control for dialogs, notifications, cards,
lightboxes, and similar closeable surfaces.

## Upstream model to preserve

Ark UI does not ship a dedicated close-button primitive. The component follows the Ark factory
model through `@ark-ui/react/factory`:

- one explicit root part exposed as `CloseButton` and `CloseButton.Root`;
- native button props and ref forwarding;
- DOM ownership composition through `asChild`;
- Ark-style `data-scope`, `data-part`, and state hooks.

## Current behavior contract

- `CloseButton` is the short root form.
- `CloseButton.Root` is the equivalent Ark-aligned namespace form.
- The default DOM node is `button`.
- `type` defaults to `button` for the native root.
- Omitting `children` renders the moduix `CloseIcon`.
- Omitting an accessible name on the default-icon path adds `aria-label="Close"`.
- `disabled` and `aria-disabled="true"` expose `data-disabled`.
- legacy `render`, `nativeButton`, and `focusableWhenDisabled` are not supported.

## Anatomy and exported parts

```text
CloseButton / CloseButton.Root
└─ root[data-scope="close-button"][data-part="root"][data-slot="close-button-root"]
   └─ CloseIcon (default) | custom children
```

| Part                               | `data-slot`         | Notes                                 |
| ---------------------------------- | ------------------- | ------------------------------------- |
| `CloseButton` / `CloseButton.Root` | `close-button-root` | Single icon-only interactive surface. |

## Composition

```tsx
import { CloseButton } from '@moduix/react';

export function DismissNotification() {
  return <CloseButton aria-label="Dismiss notification" />;
}
```

Use `asChild` when another button component must own the DOM node. The child must provide its own
icon content because the single child is the composed root:

```tsx
<CloseButton asChild aria-label="Close panel">
  <button>
    <MyCloseIcon aria-hidden="true" />
  </button>
</CloseButton>
```

## Upstream feature coverage

- `Ark factory`: used for the root element and its prop/ref contract.
- `asChild`: supported with the Ark single-child constraint.
- `data-scope` / `data-part`: exposed for Ark-style styling.
- `Dedicated primitive state or callbacks`: not applicable because Ark has no close-button
  primitive.
- `Chakra close-button recipe`: reflected through the single-part anatomy and replaceable icon
  children.

## Accessibility and state

- The default icon path receives `aria-label="Close"` only when neither `aria-label` nor
  `aria-labelledby` is provided.
- Custom icon content should be decorative and requires an accessible name on the root.
- Native `disabled` and `aria-disabled="true"` map to `data-disabled` for styling.
- `aria-disabled="true"` suppresses the root click handler and prevents default activation.
- The component does not manage overlay state, escape handling, focus return, or dismissal
  callbacks.

## Defaults and styling

| Entry       | Default     | Notes                                      |
| ----------- | ----------- | ------------------------------------------ |
| `type`      | `button`    | Applied only to the native root            |
| `children`  | `CloseIcon` | Replaced when custom children are provided |
| `asChild`   | `false`     | Ark factory composition                    |
| `className` | -           | Applied to the root                        |

Public CSS variables:

| CSS variable                       | Default                         |
| ---------------------------------- | ------------------------------- |
| `--close-button-bg`                | `transparent`                   |
| `--close-button-bg-hover`          | `var(--color-muted)`            |
| `--close-button-color`             | `var(--color-muted-foreground)` |
| `--close-button-color-hover`       | `var(--color-foreground)`       |
| `--close-button-disabled-opacity`  | `var(--opacity-disabled)`       |
| `--close-button-focus-ring-color`  | `var(--color-ring)`             |
| `--close-button-focus-ring-offset` | `2px`                           |
| `--close-button-focus-ring-width`  | `var(--border-width-md)`        |
| `--close-button-icon-size`         | `12px`                          |
| `--close-button-radius`            | `var(--radius-sm)`              |
| `--close-button-size`              | `28px`                          |
| `--close-button-transition`        | `var(--transition-default)`     |

## Intentional sugar and differences from upstream

- moduix adds the default close glyph, accessible-name fallback, visual tokens, and square
  icon-button styling.
- The component exposes `CloseButton` as the short root form and `CloseButton.Root` as the
  equivalent Ark-aligned namespace form.
- The root defaults to safe non-submit behavior without forwarding that default through `asChild`.

## Agent notes

- Keep this as a thin Ark factory wrapper with one part.
- Keep the internal `data-scope`, `data-part`, `data-slot`, and `data-disabled` hooks authoritative;
  consumer props must not replace them.
- Preserve the shared `--close-button-*` contract because Dialog, Drawer, and Lightbox map their
  close-control tokens into it.
- Do not reintroduce legacy render props.

## Local changelog

- 2026-07-09: Made the stable data hooks authoritative so consumer props cannot replace the
  component's styling contract.
- 2026-06-24: Restored the short root `CloseButton` API and kept `CloseButton.Root` as the
  equivalent namespace form.
- 2026-06-24: Simplified close-button CSS to style the normalized `data-disabled`
  state only and aligned public docs examples with the root API.
- 2026-06-18: Migrated to `@ark-ui/react/factory`, introduced the explicit
  `CloseButton.Root` part and Ark data hooks, added `asChild`, and removed the legacy button
  contract and callable alias.
- 2026-06-18: Aligned `aria-disabled` with disabled behavior by suppressing root click activation.