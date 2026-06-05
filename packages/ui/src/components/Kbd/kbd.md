# Kbd

Upstream primitive docs: none. `Kbd` is a standalone moduix wrapper over native HTML `kbd` elements.

## Purpose

`Kbd` renders compact keycaps for keyboard shortcuts, command hints, and inline key labels.
Use `Kbd` for a single key and `KbdGroup` when several keys should read as one shortcut.

## Current behavior contract

- `Kbd` renders a native `<kbd>` with `data-slot="kbd-root"`.
- `KbdGroup` renders a native `<kbd>` with `data-slot="kbd-group"` so grouped shortcuts keep HTML
  keyboard semantics instead of being only a visual wrapper.
- `KbdGroup` is still layout-light: it only aligns keys and separators; it does not inject separators
  or extra structure.
- Separators such as `+`, `/`, or `then` stay in composition as plain text.
- The public API is intentionally small: no variants, no size props, no slot prop bags, no stateful
  or controlled behavior.
- Styling is driven by `className`, stable `data-slot` hooks, and the public `--kbd-*` CSS variables
  declared in `src/styles/theme.css`.

## Composition

Recommended shortcut composition:

```tsx
import { Kbd, KbdGroup } from 'moduix';

export function ShortcutHint() {
  return (
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  );
}
```

Single key:

```tsx
import { Kbd } from 'moduix';

export function EscapeHint() {
  return <Kbd>Esc</Kbd>;
}
```

## Parts

| Part       | Element | Data attributes         | Purpose                                         |
| ---------- | ------- | ----------------------- | ----------------------------------------------- |
| `Kbd`      | `kbd`   | `data-slot="kbd-root"`  | Styled keycap for one key label.                |
| `KbdGroup` | `kbd`   | `data-slot="kbd-group"` | Semantic inline wrapper for grouped key combos. |

There is no exported separator part. Keep separators in normal text composition.

## Public props

`Kbd` accepts standard native `kbd` props, including `className`, `title`, and ARIA attributes.

`KbdGroup` also accepts standard native `kbd` props, including `className` and ARIA attributes for
describing the full shortcut when the visible keys use abbreviations or symbols.

## Styling API

Use `className` on `Kbd` or `KbdGroup` for local overrides. Stable selectors:

- `data-slot="kbd-root"`
- `data-slot="kbd-group"`

There are no variant attributes and no interactive state attributes.

Public CSS variables:

| Variable                      | Default                                                                        | Applies to |
| ----------------------------- | ------------------------------------------------------------------------------ | ---------- |
| `--kbd-bg`                    | `var(--color-muted)`                                                           | `Kbd`      |
| `--kbd-border-color`          | `var(--color-border)`                                                          | `Kbd`      |
| `--kbd-border-width`          | `var(--border-width-sm)`                                                       | `Kbd`      |
| `--kbd-color`                 | `var(--color-foreground)`                                                      | `Kbd`      |
| `--kbd-font-family`           | `var(--font-mono)`                                                             | `Kbd`      |
| `--kbd-font-size`             | `var(--text-xs)`                                                               | `Kbd`      |
| `--kbd-font-weight`           | `var(--weight-medium)`                                                         | `Kbd`      |
| `--kbd-group-gap`             | `0.25rem`                                                                      | `KbdGroup` |
| `--kbd-group-separator-color` | `var(--color-muted-foreground)`                                                | `KbdGroup` |
| `--kbd-height`                | `1.5rem`                                                                       | `Kbd`      |
| `--kbd-line-height`           | `var(--line-height-text-xs)`                                                   | `Kbd`      |
| `--kbd-min-width`             | `var(--kbd-height, 1.5rem)`                                                    | `Kbd`      |
| `--kbd-padding-x`             | `0.4375rem`                                                                    | `Kbd`      |
| `--kbd-padding-y`             | `0`                                                                            | `Kbd`      |
| `--kbd-radius`                | `var(--radius-sm)`                                                             | `Kbd`      |
| `--kbd-shadow`                | `inset 0 -1px 0 color-mix(in oklab, var(--color-foreground) 12%, transparent)` | `Kbd`      |

Example override:

```css
.shortcutGroup {
  --kbd-group-gap: 0.375rem;
}

.shortcutKey {
  --kbd-bg: color-mix(in oklab, var(--color-primary) 12%, var(--color-background));
  --kbd-border-color: color-mix(in oklab, var(--color-primary) 32%, transparent);
  --kbd-color: var(--color-primary);
  --kbd-height: 1.625rem;
  --kbd-min-width: 1.625rem;
  --kbd-radius: var(--radius-md);
  --kbd-shadow: inset 0 -1px 0 color-mix(in oklab, var(--color-primary) 22%, transparent);
}
```

## UX and accessibility

- `Kbd` and `KbdGroup` are presentational shortcut labels, not interactive controls.
- Prefer short visible key labels (`Esc`, `Cmd`, `Shift`) and add `aria-label` to `KbdGroup` when
  abbreviations or symbols need a clearer spoken form.
- Do not rely on separator color alone to communicate meaning.
- There is no keyboard navigation, focus management, disabled state, or controlled/uncontrolled API
  because the component only renders static HTML semantics.

## Intentional differences from Base UI

- There is no Base UI `Kbd` primitive in this component family.
- moduix does not emulate Base UI slot props, state attributes, or part registries here.
- The component stays native and composition-first instead of adding shortcut-specific helper props.

## Agent notes

- Keep this component thin and native. Do not add variants, separator props, or slot prop bags unless
  a repeated library-wide need clearly appears.
- Preserve the `data-slot` hooks and the public `--kbd-*` CSS variable contract.
- If the semantic wrapper changes, update `Kbd`, `KbdGroup`, stories, docs examples, and this file in
  the same task.

## Local changelog

- 2026-06-02: Rewrote the local docs around the real moduix API, documented the full styling contract,
  and aligned `KbdGroup` semantics with native `<kbd>` shortcut grouping.