# CloseButton

Upstream docs (reviewed 2026-10-14):

- Ark UI Composition: https://ark-ui.com/docs/guides/composition
- Ark UI Styling: https://ark-ui.com/docs/guides/styling
- Ark UI Ref: https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/close-button
- shadcn/ui Button: https://ui.shadcn.com/docs/components/button

## Purpose

`CloseButton` is the moduix icon-only dismiss control for dialogs, notifications, cards,
lightboxes, and similar closeable surfaces.

## Upstream model to preserve

Ark UI does not ship a dedicated close-button primitive. The component follows the Ark factory
model through `@ark-ui/react/factory`:

- one explicit root part exposed as `CloseButton`;
- native button props and ref forwarding;
- DOM ownership composition through `asChild`;
- Ark-style `data-scope`, `data-part`, and state hooks.

## Current behavior contract

The React module declares a `'use client'` boundary. Server parents may pass serializable props;
event handlers and render functions belong in a client composition.

- `CloseButton` is the root component and only public component value.
- The default DOM node is `button`.
- `type` defaults to `button` for the native root.
- Omitting `children` renders the moduix `CloseIcon`.
- Omitting `aria-label` and `aria-labelledby` adds `aria-label="Close"`, including for custom
  icon children.
- `disabled` and `aria-disabled="true"` expose `data-disabled`.
- On an `asChild` host, `disabled` adds `aria-disabled="true"` and `data-disabled` but never
  forwards a native `disabled` attribute; click activation remains blocked.
- When a parent Ark part composes `CloseButton` through `asChild`, the parent's `data-scope`,
  `data-part`, `data-slot`, and `data-disabled` hooks remain on the DOM node. `CloseButton`
  contributes its button styling and disabled click protection without replacing that anatomy.

## Upstream comparison

| Source    | Relevant difference                                                                          | Moduix decision                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Ark UI    | No dedicated close-button primitive; the factory supplies composition, refs, and data hooks. | **Required correctness:** preserve the factory root, one semantic child for `asChild`, and ref/data-attribute behavior. |
| Chakra UI | Provides a dedicated close-button recipe.                                                    | **Intentional difference:** retain a root-only API and CSS-variable theming instead of recipe variants.                 |
| shadcn/ui | Uses an icon-sized generic Button rather than a dedicated close button.                      | **Intentional difference:** keep `CloseButton` discoverable with its default glyph and accessible-name fallback.        |

## Anatomy and exported parts

```text
CloseButton
└─ root[data-scope="close-button"][data-part="root"][data-slot="close-button-root"]
   └─ CloseIcon (default) | custom children
```

| Part          | `data-slot`         | Notes                                 |
| ------------- | ------------------- | ------------------------------------- |
| `CloseButton` | `close-button-root` | Single icon-only interactive surface. |

## Composition

```tsx
import { CloseButton } from '@moduix/react/close-button';

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

## Accessibility and state

- The root receives `aria-label="Close"` when neither `aria-label` nor `aria-labelledby` is
  provided. Pass a surface-specific label in product UI.
- Falsy children render the default decorative close icon so conditional icon content cannot leave
  an empty button.
- Native `disabled` and `aria-disabled="true"` map to `data-disabled` for styling. On an
  `asChild` host, `disabled` is represented by `aria-disabled="true"` rather than a native
  attribute. An inherited parent `data-disabled` state is preserved and prevents activation as
  well.
- Every disabled form blocks activation in one capture-phase handler, which also stops the bubble
  `onClick` of the component and of an `asChild` child.
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

| CSS variable                              | Default                                |
| ----------------------------------------- | -------------------------------------- |
| `--moduix-close-button-bg`                | `transparent`                          |
| `--moduix-close-button-bg-hover`          | `var(--moduix-color-muted)`            |
| `--moduix-close-button-color`             | `var(--moduix-color-muted-foreground)` |
| `--moduix-close-button-color-hover`       | `var(--moduix-color-foreground)`       |
| `--moduix-close-button-disabled-opacity`  | `var(--moduix-opacity-disabled)`       |
| `--moduix-close-button-focus-ring-color`  | `var(--moduix-color-ring)`             |
| `--moduix-close-button-focus-ring-offset` | `var(--moduix-focus-ring-offset)`      |
| `--moduix-close-button-focus-ring-width`  | `var(--moduix-focus-ring-width)`       |
| `--moduix-close-button-icon-size`         | `var(--moduix-spacing-4)`              |
| `--moduix-close-button-radius`            | `var(--moduix-radius-sm)`              |
| `--moduix-close-button-size`              | `var(--moduix-spacing-7)`              |

## Agent notes

- Keep this as a thin Ark factory wrapper with one part.
- Keep standalone `CloseButton` data hooks stable. When it is composed by an Ark parent, preserve
  the parent's anatomy hooks so the parent remains the DOM contract owner.
- Preserve the shared `--moduix-close-button-*` contract: about 16 components (Dialog, Drawer, Toast,
  Tag, Select, InputGroup and others) set these variables on their close and clear triggers.