# Kbd

## Upstream docs

Ark UI has no Kbd primitive. This component follows the official
[Ark factory](https://ark-ui.com/docs/guides/composition#the-ark-factory),
[composition](https://ark-ui.com/docs/guides/composition), and
[ref](https://ark-ui.com/docs/guides/ref) guidance.

## Purpose

`Kbd` renders static keycaps for keyboard shortcuts, command hints, and inline key labels.

## Current behavior contract

- `Kbd` is an `ark.kbd` element; `KbdGroup` is an `ark.span` element with `role="group"`.
- Both parts accept native props, `className`, `asChild`, and a ref to the rendered element.
- Separators such as `+` are plain children; the component injects no text or elements.
- There is no state, context, callbacks, or keyboard interaction.

## Anatomy and exported parts

```text
KbdGroup
├─ Kbd
├─ separator text
└─ Kbd
```

| Part       | Default element | Data attributes                                                                  |
| ---------- | --------------- | -------------------------------------------------------------------------------- |
| `Kbd`      | `kbd`           | `data-scope="kbd"`, `data-part="root"`, `data-slot="kbd-root"`                   |
| `KbdGroup` | `span`          | `role="group"`, `data-scope="kbd"`, `data-part="group"`, `data-slot="kbd-group"` |

## Composition

```tsx
import { Kbd, KbdGroup } from '@moduix/react/kbd';

export function ShortcutHint() {
  return (
    <KbdGroup aria-label="Command K">
      <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
    </KbdGroup>
  );
}
```

## Accessibility

- `<kbd>` keeps native user-input semantics.
- Add `aria-label` to a group when symbols or abbreviations need a clearer spoken form.
- `asChild` consumers must keep `<kbd>` semantics and pass exactly one child.

## Styling

Public CSS variables (CSS Modules only), all on `Kbd`:

| Variable                    | Default                                                             |
| --------------------------- | ------------------------------------------------------------------- |
| `--moduix-kbd-bg`           | `var(--moduix-color-muted)`                                         |
| `--moduix-kbd-border-color` | `var(--moduix-color-border)`                                        |
| `--moduix-kbd-border-width` | `var(--moduix-border-width-sm)`                                     |
| `--moduix-kbd-color`        | `var(--moduix-color-foreground)`                                    |
| `--moduix-kbd-height`       | `var(--moduix-size-xs)`; also the minimum width                     |
| `--moduix-kbd-padding-x`    | `var(--moduix-spacing-2)`                                           |
| `--moduix-kbd-radius`       | `var(--moduix-radius-sm)`                                           |
| `--moduix-kbd-shadow`       | `inset 0 -1px 0 color-mix(in oklab, currentColor 12%, transparent)` |

Typography and `KbdGroup` styles come from foundation tokens; override them with a class. Separators
inherit the group text color. The keycap edge shadow follows the text color.

A keycap never wraps its label; `KbdGroup` wraps between keycaps instead. A direct `svg` child is
sized to `--moduix-spacing-3` with a `--moduix-spacing-1` gap; a size class on the icon
wins (`size-*` in Tailwind).

## Agent notes

- Keep the implementation factory-based and stateless.
- Do not add shortcut parsing, separator injection, or interactive behavior.
- `CommandPaletteKbd` sizes itself through `--moduix-kbd-height`, `--moduix-kbd-padding-x`, and
  `--moduix-kbd-color`; keep those variables while it depends on them.