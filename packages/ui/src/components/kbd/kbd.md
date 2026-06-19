# Kbd

## Upstream docs

Ark UI has no dedicated Kbd primitive. This component follows the
[Ark composition and factory model](https://ark-ui.com/docs/guides/composition).

## Purpose

`Kbd` renders static keycaps for keyboard shortcuts, command hints, and inline key labels.

## Upstream model to preserve

The component uses `@ark-ui/react/factory` rather than a state machine:

- each part is an `ark.kbd` element;
- `HTMLArkProps<'kbd'>` provides native props and `asChild`;
- refs target the rendered host element;
- `data-scope` and `data-part` describe the local anatomy.

There are no callbacks, controlled state, context, CSS runtime variables, or keyboard navigation
because the component is static.

## Current behavior contract

- `Kbd` is the root shorthand and renders a native `<kbd>` by default.
- `Kbd.Root` exposes the same root part explicitly.
- `Kbd.Group` renders a semantic `<kbd>` wrapper for grouped shortcuts.
- Separators remain plain composition; the component does not inject text or extra elements.
- Every part supports `className`, native attributes, `asChild`, and a forwarded ref.
- Styling uses Ark anatomy attributes, stable `data-slot` hooks, and public `--kbd-*` variables.

## Anatomy and exported parts

```text
Kbd.Group
├─ Kbd / Kbd.Root
├─ separator text
└─ Kbd / Kbd.Root
```

| Part               | Default element | Data attributes                                                  |
| ------------------ | --------------- | ---------------------------------------------------------------- |
| `Kbd` / `Kbd.Root` | `kbd`           | `data-scope="kbd"`, `data-part="root"`, `data-slot="kbd-root"`   |
| `Kbd.Group`        | `kbd`           | `data-scope="kbd"`, `data-part="group"`, `data-slot="kbd-group"` |

Exported prop types:

- `KbdRootProps`
- `KbdGroupProps`

## Composition

```tsx
import { Kbd } from 'moduix';

export function ShortcutHint() {
  return (
    <Kbd.Group aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </Kbd.Group>
  );
}
```

Use `asChild` only with one semantic child:

```tsx
<Kbd asChild>
  <kbd title="Escape">Esc</kbd>
</Kbd>
```

## Upstream feature coverage

There is no Ark Kbd examples section to mirror. The relevant factory features are fully exposed:

- intrinsic `kbd` rendering;
- native HTML and ARIA props;
- `asChild` prop merging;
- forwarded host refs;
- Ark-style anatomy attributes.

State machines, callbacks, provider/context APIs, `ids`, `present`, `HiddenInput`, and
`Field`/`Fieldset` integration do not apply.

## Accessibility and state

- `<kbd>` preserves native semantics for user-input labels.
- `Kbd.Group` remains a `<kbd>` by default so the full shortcut is semantically grouped.
- Add `aria-label` to a group when abbreviations or symbols need a clearer spoken form.
- `asChild` consumers must preserve `<kbd>` semantics and provide exactly one child.
- The component has no focus, disabled, invalid, open/closed, or controlled/uncontrolled state.

## Defaults and styling

Stable styling hooks:

- `[data-scope="kbd"][data-part="root"]`
- `[data-scope="kbd"][data-part="group"]`
- `[data-slot="kbd-root"]`
- `[data-slot="kbd-group"]`

Public CSS variables:

| Variable                      | Default                                                                        | Part  |
| ----------------------------- | ------------------------------------------------------------------------------ | ----- |
| `--kbd-bg`                    | `var(--color-muted)`                                                           | Root  |
| `--kbd-border-color`          | `var(--color-border)`                                                          | Root  |
| `--kbd-border-width`          | `var(--border-width-sm)`                                                       | Root  |
| `--kbd-color`                 | `var(--color-foreground)`                                                      | Root  |
| `--kbd-font-family`           | `var(--font-mono)`                                                             | Root  |
| `--kbd-font-size`             | `var(--text-xs)`                                                               | Root  |
| `--kbd-font-weight`           | `var(--weight-medium)`                                                         | Root  |
| `--kbd-group-gap`             | `0.25rem`                                                                      | Group |
| `--kbd-group-separator-color` | `var(--color-muted-foreground)`                                                | Group |
| `--kbd-height`                | `1.5rem`                                                                       | Root  |
| `--kbd-line-height`           | `var(--line-height-text-xs)`                                                   | Root  |
| `--kbd-min-width`             | `var(--kbd-height, 1.5rem)`                                                    | Root  |
| `--kbd-padding-x`             | `0.4375rem`                                                                    | Root  |
| `--kbd-padding-y`             | `0`                                                                            | Root  |
| `--kbd-radius`                | `var(--radius-sm)`                                                             | Root  |
| `--kbd-shadow`                | `inset 0 -1px 0 color-mix(in oklab, var(--color-foreground) 12%, transparent)` | Root  |

## Intentional sugar and differences from upstream

- moduix defines the `Root` and `Group` anatomy because Ark UI has no Kbd primitive.
- `Kbd` remains a root shorthand in addition to `Kbd.Root`.
- moduix adds visual defaults, public CSS variables, and stable `data-slot` hooks.
- The removed `KbdGroup` export is not retained as an alias; use `Kbd.Group`.

## Agent notes

- Keep the implementation factory-based and stateless.
- Do not add shortcut parsing, separator injection, or interactive behavior.
- Keep source, stories, docs, and registry dependencies synchronized.

## Local changelog

- 2026-06-19: Migrated the component to Ark factory primitives, added `Root`/`Group` anatomy,
  `asChild`, forwarded refs, Ark data attributes, and removed the standalone `KbdGroup` export.
- 2026-06-02: Documented the native Kbd behavior and public styling contract.