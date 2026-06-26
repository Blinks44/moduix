# Popover

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/popover
- Chakra UI: https://chakra-ui.com/docs/components/popover

## Purpose

`Popover` displays compact interactive content anchored to a trigger or a separate anchor element.
Use `Dialog` for larger or strongly interruptive workflows and `Tooltip` for non-interactive hints.

## Upstream model to preserve

The component is a thin styled wrapper over `@ark-ui/react/popover`. Preserve Ark part names,
controlled state details, focus management, dismiss behavior, positioning options, nesting, presence,
and provider/context APIs without remapping them.

## Current behavior contract

- `Popover` and `Popover.Root` are the same root component.
- `onOpenChange` receives Ark's `{ open }` details object.
- Floating placement is configured through `positioning` on `Root` or `usePopover`, not on
  `Positioner` or `Content`.
- The popup tree is explicit: `Portal > Positioner > Content`.
- `Trigger` and `CloseTrigger` receive moduix control styling only when `asChild` is not used.
- `Arrow` renders the styled `ArrowTip` by default.
- `Header`, `Body`, and `Footer` are plain layout helpers.

## Anatomy and exported parts

```text
Popover.Root
├─ Popover.Anchor (optional)
├─ Popover.Trigger
│  └─ Popover.Indicator (optional)
└─ Portal
   └─ Popover.Positioner
      └─ Popover.Content
         ├─ Popover.Arrow
         │  └─ Popover.ArrowTip
         ├─ Popover.Header (moduix)
         │  ├─ Popover.Title
         │  └─ Popover.Description
         ├─ Popover.Body (moduix)
         ├─ Popover.Footer (moduix)
         └─ Popover.CloseTrigger
```

Exported Ark-aligned state surfaces are `Popover.RootProvider`, `Popover.Context`, `usePopover`,
and `usePopoverContext`. Every rendered wrapper has a matching `data-slot` in kebab-case except
`Portal`, which does not render a DOM element.

| Export                 | Stable slot             | Notes                                      |
| ---------------------- | ----------------------- | ------------------------------------------ |
| `Popover.Anchor`       | `popover-anchor`        | Optional positioning reference.            |
| `Popover.Trigger`      | `popover-trigger`       | Styled by moduix unless `asChild` is used. |
| `Popover.Indicator`    | `popover-indicator`     | Optional trigger state indicator.          |
| `Popover.Positioner`   | `popover-positioner`    | Ark floating positioner.                   |
| `Popover.Content`      | `popover-content`       | Styled popup surface.                      |
| `Popover.Arrow`        | `popover-arrow`         | Renders `ArrowTip` by default.             |
| `Popover.ArrowTip`     | `popover-arrow-tip`     | Visible arrow tip.                         |
| `Popover.Title`        | `popover-title`         | Accessible content title.                  |
| `Popover.Description`  | `popover-description`   | Accessible content description.            |
| `Popover.CloseTrigger` | `popover-close-trigger` | Styled by moduix unless `asChild` is used. |
| `Popover.Header`       | `popover-header`        | Moduix layout helper.                      |
| `Popover.Body`         | `popover-body`          | Moduix layout helper.                      |
| `Popover.Footer`       | `popover-footer`        | Moduix action row helper.                  |

## Composition

```tsx
import { Button, Popover, Portal } from '@moduix/react';

export function PopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open</Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Header>
              <Popover.Title>Project status</Popover.Title>
              <Popover.Description>Everything is on schedule.</Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover>
  );
}
```

`asChild` accepts one semantic child. The child must preserve the interaction semantics required by
the Ark part.

## Upstream feature coverage

- Basic explicit composition, `asChild`, controlled state, context reads, arrow, placement, close
  behavior, lazy mounting, modal mode, initial focus, custom anchor, same-width positioning, dialog
  layering, nested popovers, and multiple trigger values are supported.
- External state uses `usePopover` with `Popover.RootProvider`; do not render `Root` for that same
  state instance.
- `Popover.Context` supports inline render-prop state access and `usePopoverContext` supports
  reusable child components.
- `lazyMount`, `unmountOnExit`, `present`, `skipAnimationOnMount`, `ids`, `portalled`,
  `onTriggerValueChange`, interaction callbacks, and focus callbacks pass through Ark unchanged.
- Ark has no popover backdrop, viewport, hover trigger, detached handle, or legacy popup part.
  Those legacy surfaces are intentionally absent.

## Accessibility and state

- Refs forward to the underlying Ark DOM parts. `Trigger` and `CloseTrigger` target buttons;
  `Anchor`, `Positioner`, `Content`, `Arrow`, `ArrowTip`, `Title`, `Description`, `Indicator`,
  `Header`, `Body`, and `Footer` target their rendered elements.
- Ark wires `Trigger`, `Content`, `Title`, `Description`, and `CloseTrigger` IDs and ARIA
  relationships. Use `ids` when stable cross-part IDs are required.
- `modal` is a boolean. In modal mode Ark traps focus, blocks outside interaction and scrolling, and
  hides outside content from assistive technology.
- `initialFocusEl` is a function returning the element to focus. `autoFocus`, `closeOnEscape`, and
  `closeOnInteractOutside` retain Ark semantics.
- Escape, pointer-down-outside, focus-outside, interact-outside, and dismissal callbacks receive Ark
  event objects unchanged.
- `Trigger` exposes `data-state` and `data-placement`. `Content` exposes `data-state`,
  `data-placement`, `data-nested`, `data-has-nested`, and `data-expanded`.
- `Positioner` exposes `--reference-width`, `--reference-height`, `--available-width`,
  `--available-height`, `--x`, `--y`, `--z-index`, and `--transform-origin`.
- `Content` exposes `--layer-index` and `--nested-layer-count`; `Arrow` exposes Ark arrow variables.

## Defaults and styling

The wrappers preserve Ark `data-scope` and `data-part` attributes and add stable `data-slot` hooks.
The content uses moduix colors, spacing, radii, shadow, typography, and motion tokens.

Open and closed animations target `[data-state='open']` and `[data-state='closed']`. Ark's presence
layer keeps exit animations mounted. Use `present` only for JavaScript-controlled animation
lifecycles.

The public `--popover-*` variables are declared in `theme.css`. Positioner sizing relies on Ark's
runtime available-size and reference-size variables rather than duplicate measurements.

## Intentional sugar and differences from upstream

- The recommended popup composition uses the shared `Portal` export plus `Popover.Positioner` and
  `Popover.Content` so overlay structure matches other popup components across the library.
- `Popover.Arrow` supplies `Popover.ArrowTip` when children are omitted.
- `Popover.Header`, `Popover.Body`, and `Popover.Footer` provide only moduix layout and slots.
- Trigger and close-trigger default visuals are omitted with `asChild`, leaving the composed child
  responsible for its own appearance.
- No legacy aliases, flat part exports, adapter callbacks, hidden content composition, or legacy
  compatibility layers are retained.

## Agent notes

- Keep `Portal`, `Popover.Positioner`, and `Popover.Content` explicit in public examples.
- Keep positioning options on `Root`/`usePopover`.
- Do not add `Backdrop`, `Popup`, `Viewport`, `openOnHover`, `render`, `handle`, or `showArrow`.
- Mirror any future Ark provider, context, hook, part, or public type additions through the package
  barrel unless intentionally documented otherwise.

## Local changelog

- 2026-06-26: Synced public docs and stories with current Ark Popover examples for context reads,
  lazy mounting, multiple trigger values, default props, and anatomy roles.
- 2026-06-26: Tightened docs-workflow alignment for anatomy, ref targets, and stable `data-slot`
  hooks.
- 2026-06-20: Removed the `Popover.Portal` alias from the public API. Popover now follows the same
  shared `Portal -> Popover.Positioner -> Popover.Content` composition as other popup components.
- 2026-06-20: Switched the recommended docs and examples from `Popover.Portal` to the shared
  `Portal` export so Popover composition matches Menu, Select, Combobox, and other popup families.
- 2026-06-19: Updated layering to keep Ark `--z-index` on `Popover.Positioner` and apply
  `calc(var(--z-popup) + var(--layer-index))` on `Popover.Content` so nested popovers render above parent layers.
- 2026-06-19: Replaced the previous implementation and legacy API with the full Ark UI React
  contract, namespace composition, provider/context hooks, Ark state selectors, positioning
  variables, examples, and documentation.
- 2026-06-10: Added phase-specific popup motion variables.