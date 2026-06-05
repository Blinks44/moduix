# CloseButton

Upstream primitive docs: https://base-ui.com/react/components/button.md

## Purpose

`CloseButton` is the moduix icon-only dismiss control for closeable surfaces: dialogs,
lightboxes, notifications, cards, and similar UI. It is a styled wrapper around Base UI `Button`
with one visual root and a default close icon.

Use it when the control itself performs a close or dismiss action. It does not close anything by
itself; wire `onClick`, compose it through an overlay close primitive, or use a component-specific
close part such as `DialogCloseIcon` or `LightboxCloseButton`.

## Current behavior contract

```tsx
import { CloseButton } from 'moduix';

export function Example() {
  return <CloseButton aria-label="Dismiss notification" />;
}
```

The wrapper adds these defaults on top of Base UI `Button`:

| Prop / behavior | Default                                                                           |
| --------------- | --------------------------------------------------------------------------------- |
| `type`          | `button`, still overrideable through props                                        |
| `children`      | internal `CloseIcon` when omitted                                                 |
| `aria-label`    | `Close` only when `children`, `aria-label`, and `aria-labelledby` are all omitted |
| `data-slot`     | `close-button`                                                                    |

All other Base UI `Button` props pass through, including `disabled`, `focusableWhenDisabled`,
`nativeButton`, `render`, event handlers, and native button attributes.

The forwarded ref points to the Base UI `Button` element. Keep `forwardRef`; consumers and overlay
parts can use it for focus management.

## Composition

`CloseButton` exposes a single public part:

```text
CloseButton[data-slot="close-button"]
└─ CloseIcon (default) or custom children
```

There are no exported subparts, `classNames`, slot prop bags, or variants. Use `className` on the
root and CSS variables for styling.

Custom icon content is supported through `children`:

```tsx
<CloseButton aria-label="Close panel">
  <MyCloseIcon aria-hidden="true" focusable="false" />
</CloseButton>
```

When replacing the default icon, provide an accessible name with `aria-label` or
`aria-labelledby`. The automatic `Close` label is intentionally limited to the default icon path so
custom text-like children are not mislabeled.

For overlay components, prefer the overlay's close primitive when it exists:

```tsx
<DialogCloseIcon aria-label="Close settings" />
```

Use a standalone `CloseButton` only when you control the close behavior directly:

```tsx
<CloseButton aria-label="Dismiss notification" onClick={dismissNotification} />
```

## Public props

`CloseButton` intentionally does not export a custom props type. Its public props are Base UI
`Button.Props` plus the wrapper defaults above.

Commonly used props:

| Prop                             | Notes                                                                                                                            |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `className`                      | Merged with the component root class.                                                                                            |
| `children`                       | Replaces the default `CloseIcon`; keep it icon-sized.                                                                            |
| `aria-label` / `aria-labelledby` | Required for custom icon-only content; recommended even when the default fallback is acceptable.                                 |
| `disabled`                       | Disables interaction and applies the disabled visual state.                                                                      |
| `focusableWhenDisabled`          | Keeps the disabled button focusable when Base UI disabled focus behavior is needed.                                              |
| `render` / `nativeButton`        | Base UI composition escape hatches; use only when button semantics are still correct. Do not render links through `CloseButton`. |
| `type`                           | Defaults to `button`; override only for a real form workflow.                                                                    |

## Defaults and styling

The root has `data-slot="close-button"` and uses the CSS module class `root`.

Public styling contract:

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

The component styles:

- reset native button margin, appearance, inherited font, and user selection;
- keep the root square via `--close-button-size`;
- size direct nested SVG icons via `--close-button-icon-size`;
- expose hover, focus-visible, and disabled states;
- disable pointer interaction for disabled buttons through `:disabled` and `[data-disabled]`.

Overlay components can map their own variables into the `--close-button-*` contract, as Dialog and
Lightbox do for their close controls.

## Accessibility and UX

- The default `type="button"` prevents accidental form submission.
- The default icon path receives `aria-label="Close"` only when no label is provided elsewhere.
- Prefer specific labels such as `Dismiss notification`, `Close dialog`, or `Close preview` when
  multiple close controls can appear on a page.
- Custom icon children should be decorative (`aria-hidden`, `focusable="false"`) unless they
  provide the accessible name intentionally.
- Do not use `CloseButton` for navigation links. If a link needs close-button styling, style the
  anchor directly instead of using Base UI button semantics.
- The component provides the control visuals and button semantics only; it does not manage overlay
  state, focus return, escape key handling, or dismissal lifecycle.

## Intentional differences from Base UI

- moduix ships styling, CSS variables, `data-slot="close-button"`, and a default close glyph.
- The wrapper defaults `type` to `button`; Base UI `Button` requires submit behavior to be opted in.
- The wrapper does not expose Base UI documentation as local API. Only props that pass through the
  wrapper and the documented moduix styling hooks are part of this component contract.
- There are no `variant`, `size`, `classNames`, `slotProps`, or close-specific state props. Reuse
  CSS variables or compose with the relevant overlay part instead.

## Agent notes

- Keep the component as a thin icon button wrapper. Do not add feature flags for icon selection,
  overlay closing, placement, labels, variants, or slot maps.
- Preserve `data-slot="close-button"` and the `--close-button-*` CSS variable contract; Dialog,
  Lightbox, docs, and stories depend on it.
- If the default icon, accessible-name fallback, or CSS variables change, update stories,
  `apps/docs/content/docs/close-button.mdx`, and
  `apps/docs/src/components/examples/close-button.tsx` in the same task.
- New sugar should only be accepted if it removes repeated production boilerplate without hiding the
  composition model. No such sugar is currently needed.

## Local changelog

- Clarified the local documentation so it describes the moduix wrapper contract instead of Base UI
  behavior in general.
- Tightened the accessibility contract: the default `Close` label is only applied when the default
  icon is used and no `aria-labelledby` is present.
- Aligned the root CSS reset and disabled pointer behavior with the project's button styling
  patterns.