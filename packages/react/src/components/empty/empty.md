# Empty

Upstream docs:

- Ark UI: no dedicated Empty primitive; use https://ark-ui.com/docs/guides/composition,
  https://ark-ui.com/docs/guides/styling, and https://ark-ui.com/docs/guides/ref
- Chakra UI: https://chakra-ui.com/docs/components/empty-state
- shadcn/ui: https://ui.shadcn.com/docs/components/empty

## Purpose

`Empty` composes a zero-data, no-results, or first-run message with optional next-step actions.

## Upstream model to preserve

Ark UI does not ship an Empty primitive. moduix implements it as presentational
`@ark-ui/react/factory` wrappers: every part is an `ark.*` element, accepts `asChild`, and forwards
its ref. There is no provider, context, state, or callback to mirror.

## Current behavior contract

- Flat parts: `Empty`, `EmptyIcon`, `EmptyContent`, `EmptyTitle`, `EmptyDescription`,
  `EmptyActions`. No `Empty*Props` types: props are Ark factory intrinsics (`HTMLArkProps<'div'>`,
  `HTMLArkProps<'h3'>`).
- `EmptyTitle` renders `h3`; use `asChild` with another heading for a different level.
- `EmptyDescription` renders a `div`, so it can contain paragraphs, links, or other block content.
  The first child's top margin and the last child's bottom margin are reset.
- `EmptyIcon` and `EmptyActions` are optional root-level siblings of `EmptyContent`, not nested in it.
- Every part emits `data-scope="empty"`, `data-part`, and `data-slot="empty-*"` after the consumer
  props, so colliding `data-*` props cannot replace them.
- No role, live region, keyboard behavior, or focus management. The caller chooses the landmark,
  heading level, and `aria-live` behavior.

## Anatomy

```text
Empty
├─ EmptyIcon (optional)
├─ EmptyContent
│  ├─ EmptyTitle
│  └─ EmptyDescription
└─ EmptyActions (optional)
```

| Part               | Element | `data-part`   | `data-slot`         |
| ------------------ | ------- | ------------- | ------------------- |
| `Empty`            | `div`   | `root`        | `empty-root`        |
| `EmptyIcon`        | `div`   | `icon`        | `empty-icon`        |
| `EmptyContent`     | `div`   | `content`     | `empty-content`     |
| `EmptyTitle`       | `h3`    | `title`       | `empty-title`       |
| `EmptyDescription` | `div`   | `description` | `empty-description` |
| `EmptyActions`     | `div`   | `actions`     | `empty-actions`     |

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@moduix/react/empty';
import { Map as MapIcon } from 'lucide-react';

export function EmptyPlaces() {
  return (
    <Empty>
      <EmptyIcon>
        <MapIcon aria-hidden />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>No saved places</EmptyTitle>
        <EmptyDescription>Save destinations to keep them close to your workspace.</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>Add place</Button>
      </EmptyActions>
    </Empty>
  );
}
```

## Defaults and styling

The root is a full-width centered grid on a card surface tinted with `muted`. The text block is
capped at `28rem`. `EmptyIcon` is a round muted badge that sizes nested SVGs to
`--moduix-spacing-6`. Long titles and descriptions break anywhere. `EmptyActions` wraps its
children, and direct `button` / `a` children wrap long labels inside narrow surfaces.

CSS Modules expose six root-surface variables so a theme can retune every empty state at once:
`--moduix-empty-bg`, `--moduix-empty-border-color`, `--moduix-empty-border-width`,
`--moduix-empty-color`, `--moduix-empty-padding`, and `--moduix-empty-radius`. Everything else uses
foundation tokens directly; a class on the part overrides the layered styles. Tailwind adapters apply
the same values through utilities.

## Agent notes

- Keep `Empty` presentational. Do not add variants, alignment flags, state hooks, or built-in action
  props without a concrete product requirement.
- Keep `EmptyDescription` a `div`; a `p` breaks block content.
- Do not add per-part `--moduix-empty-*` variables; a class on the part is the override path.
- `EmptyActions` targets `> :is(button, a)` so it outranks the Button root class regardless of
  stylesheet order.