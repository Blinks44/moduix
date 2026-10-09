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

`Popover` portals `PopoverPositioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. With `PopoverRootProvider`, configure `portalled` in `usePopover`; `PopoverRootProvider` accepts `portalRef` only. The structural parts remain explicit and independently styleable.

- `Popover` is the root component.
- `PopoverContext` and `usePopoverContext` expose the current Ark state to descendants; both are
  available from `@moduix/react`.
- `onOpenChange` receives Ark's `{ open }` details object.
- Floating placement is configured through `positioning` on `Popover` or `usePopover`, not on
  `PopoverPositioner` or `PopoverContent`.
- The popup tree is explicit: `PopoverPositioner > PopoverContent`; the root owns portalling.
- `PopoverTrigger` and `PopoverCloseTrigger` receive moduix control styling only when `asChild` is not used.
- `PopoverCloseIcon` composes `PopoverCloseTrigger` with the shared close button and pins it to the content corner.
- `PopoverArrow` renders the styled `PopoverArrowTip` by default.
- `PopoverHeader`, `PopoverBody`, and `PopoverFooter` are plain layout helpers. `PopoverHeader` reserves space for `PopoverCloseIcon`
  only when that helper is present.
- When `PopoverBody` is a direct child of `PopoverContent`, it becomes the scroll region when the popup reaches
  its available height. Keep `PopoverArrow`, `PopoverHeader`, and `PopoverFooter` outside `PopoverBody`.

## Anatomy and exported parts

```text
Popover
├─ PopoverAnchor (optional)
├─ PopoverTrigger
│  └─ PopoverIndicator (optional)
└─ Overlay subtree (automatically portalled)
   └─ PopoverPositioner
      └─ PopoverContent
         ├─ PopoverArrow
         │  └─ PopoverArrowTip
         ├─ PopoverHeader (moduix)
         │  ├─ PopoverTitle
         │  └─ PopoverDescription
         ├─ PopoverCloseTrigger or PopoverCloseIcon
         ├─ PopoverBody (moduix)
         └─ PopoverFooter (moduix)
```

Exported Ark-aligned state surfaces are `PopoverRootProvider`, `PopoverContext`, `usePopover`, and
`usePopoverContext`. Every rendered wrapper has a matching `data-slot` in kebab-case; the internal
portal transport and `PopoverContext` do not render DOM elements.

| Export                | Stable slot             | Notes                                      |
| --------------------- | ----------------------- | ------------------------------------------ |
| `PopoverAnchor`       | `popover-anchor`        | Optional positioning reference.            |
| `PopoverTrigger`      | `popover-trigger`       | Styled by moduix unless `asChild` is used. |
| `PopoverIndicator`    | `popover-indicator`     | Optional trigger state indicator.          |
| `PopoverPositioner`   | `popover-positioner`    | Ark floating positioner.                   |
| `PopoverContent`      | `popover-content`       | Styled popup surface.                      |
| `PopoverArrow`        | `popover-arrow`         | Renders `PopoverArrowTip` by default.      |
| `PopoverArrowTip`     | `popover-arrow-tip`     | Visible arrow tip.                         |
| `PopoverTitle`        | `popover-title`         | Accessible content title.                  |
| `PopoverDescription`  | `popover-description`   | Accessible content description.            |
| `PopoverCloseTrigger` | `popover-close-trigger` | Styled by moduix unless `asChild` is used. |
| `PopoverCloseIcon`    | `popover-close-icon`    | Shared icon-only close button helper.      |
| `PopoverHeader`       | `popover-header`        | Moduix layout helper.                      |
| `PopoverBody`         | `popover-body`          | Moduix layout helper.                      |
| `PopoverFooter`       | `popover-footer`        | Moduix action row helper.                  |

## Composition

```tsx
import { Button } from '@moduix/react/button';
import {
  Popover,
  PopoverCloseIcon,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
} from '@moduix/react/popover';

export function PopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild>
        <Button>Open</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverCloseIcon />
          <PopoverHeader>
            <PopoverTitle>Project status</PopoverTitle>
            <PopoverDescription>Everything is on schedule.</PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}
```

`asChild` accepts one semantic child. The child must preserve the interaction semantics required by
the Ark part.

## Upstream feature coverage

- Basic explicit composition, `asChild`, controlled state, context reads through `PopoverContext`
  or `usePopoverContext`, arrow, placement, close
  behavior, lazy mounting, modal mode, initial focus, custom anchor, same-width positioning, dialog
  layering, nested popovers, and multiple trigger values are supported. Nested popovers render inline
  with `portalled={false}` to stay within their parent overlay.
- External state uses `usePopover` with `PopoverRootProvider`; do not render `Popover` for that same
  state instance. Configure `portalled` in `usePopover`, not on `PopoverRootProvider`.
- `lazyMount`, `unmountOnExit`, `present`, `skipAnimationOnMount`, `ids`, `portalled`,
  `onTriggerValueChange`, interaction callbacks, and focus callbacks pass through Ark unchanged.
- Ark has no popover backdrop, viewport, hover trigger, detached handle, or legacy popup part.
  Those legacy surfaces are intentionally absent.

## Accessibility and state

- Refs forward to the underlying Ark DOM parts. `PopoverTrigger` and `PopoverCloseTrigger` target buttons;
  `PopoverAnchor`, `PopoverPositioner`, `PopoverContent`, `PopoverArrow`, `PopoverArrowTip`, `PopoverTitle`, `PopoverDescription`, `PopoverIndicator`,
  `PopoverHeader`, `PopoverBody`, and `PopoverFooter` target their rendered elements.
- Ark wires `PopoverTrigger`, `PopoverContent`, `PopoverTitle`, `PopoverDescription`, and `PopoverCloseTrigger` IDs and ARIA
  relationships. Use `ids` when stable cross-part IDs are required.
- `modal` is a boolean. In modal mode Ark traps focus, blocks outside interaction and scrolling, and
  hides outside content from assistive technology.
- `initialFocusEl` is a function returning the element to focus. `autoFocus`, `closeOnEscape`, and
  `closeOnInteractOutside` retain Ark semantics.
- Escape, pointer-down-outside, focus-outside, interact-outside, and dismissal callbacks receive Ark
  event objects unchanged.
- `PopoverContext` and `usePopoverContext` read the same state as `PopoverRootProvider`; both remain
  available through the moduix package barrel.
- `PopoverTrigger` exposes `data-state`, `data-placement`, `data-side`, and, when triggers have `value`,
  `data-value` and `data-current` (plus the internal `data-ownedby` scope attribute). `PopoverContent` exposes
  `data-state`, `data-placement`, `data-side`, `data-nested`, `data-has-nested`, and
  `data-expanded`.
- When multiple triggers have `value`, Ark adds `data-current` only to the trigger that opened the
  popover; default trigger styling preserves that distinction.
- `PopoverPositioner` exposes `--reference-width`, `--reference-height`, `--available-width`,
  `--available-height`, `--x`, `--y`, `--z-index`, and `--transform-origin`.
- `PopoverContent` exposes `--layer-index` and `--nested-layer-count`; `PopoverArrow` exposes Ark arrow variables.

## Defaults and styling

Default popover and close controls use `--moduix-size-md` with `--moduix-spacing-1` block padding.

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-popover-*` motion variables
remain the more specific override.

The wrappers preserve Ark `data-scope` and `data-part` attributes and add stable `data-slot` hooks.
The content uses moduix colors, spacing, radii, shadow, typography, and motion tokens.

Open and closed animations target `[data-state='open']` and `[data-state='closed']`. Ark's presence
layer keeps exit animations mounted. Use `present` only for JavaScript-controlled animation
lifecycles.

Content wraps unbroken strings to remain within the available popup width. Animations and control
transitions respect `prefers-reduced-motion`.

The public `--moduix-popover-*` variables are declared in `variables-moduix.css`. Positioner sizing relies on Ark's
runtime available-size and reference-size variables rather than duplicate measurements.

When `PopoverBody` is present, `PopoverContent` uses it as the scroll region instead of allowing long content to
escape the available viewport. Consumers with custom content can use `Body` without introducing a
new component API.

## Intentional sugar and differences from upstream

- The recommended popup composition keeps `PopoverPositioner` and `PopoverContent` explicit so
  overlay structure matches other popup components across the library.
- `PopoverArrow` supplies `PopoverArrowTip` when children are omitted.
- `PopoverCloseIcon` supplies an icon-only close button without hiding `PopoverCloseTrigger`.
- `PopoverHeader`, `PopoverBody`, and `PopoverFooter` provide only moduix layout and slots.
- Trigger and close-trigger default visuals are omitted with `asChild`, leaving the composed child
  responsible for its own appearance.
- No legacy aliases, flat part exports, adapter callbacks, hidden content composition, or legacy
  compatibility layers are retained.

## Agent notes

- Keep `PopoverPositioner` and `PopoverContent` explicit in public examples.
- Keep positioning options on `Root`/`usePopover`.
- Do not add `Backdrop`, `Popup`, `Viewport`, `openOnHover`, `render`, `handle`, or `showArrow`.
- Mirror any future Ark provider, context, hook, part, or public type additions through the package
  barrel unless intentionally documented otherwise.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-31: Kept `RootProvider` portalling aligned with its `usePopover` state; configure
  `portalled` in the hook and pass only `portalRef` to the provider.

- 2026-08-11: Kept modal popovers portalled when `portalled={false}`, added focused portal and
  close-icon regression coverage, and made default content resilient to reduced motion and long
  unbroken strings.

- 2026-08-11: Made the recommended popup composition arrowless and kept `PopoverArrow` as an
  explicit visual-anchor option.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-29: Styled only the current valued trigger while a shared popover is open.

- 2026-07-29: Documented the existing Context exports, made direct `Body` content scroll at the
  popup height limit, and aligned runnable examples with the standalone preview contract.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Reduced default popover and close controls to `--moduix-size-md` and compacted their block padding.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-10: Nested examples now render inline, `Header` reserves close-icon space only when needed,
  and the public CSS-variable reference includes the `CloseIcon` styling contract.
- 2026-07-05: Added `PopoverCloseIcon` and documented the close-icon plus layout-helper popup composition path.
- 2026-07-03: Simplified the public surface to match `Combobox`: kept `RootProvider` and
  `usePopover` and removed moduix re-exports for Ark context APIs and duplicate type aliases.
- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-26: Synced public docs and stories with current Ark Popover examples for context reads,
  lazy mounting, multiple trigger values, default props, and anatomy roles.
- 2026-06-26: Tightened docs-workflow alignment for anatomy, ref targets, and stable `data-slot`
  hooks.
- 2026-06-19: Updated layering to keep Ark `--z-index` on `PopoverPositioner` and apply
  `calc(var(--moduix-z-popup) + var(--layer-index))` on `PopoverContent` so nested popovers render above parent layers.
- 2026-06-19: Replaced the previous implementation and legacy API with the full Ark UI React
  contract, namespace composition, provider/context hooks, Ark state selectors, positioning
  variables, examples, and documentation.
- 2026-06-10: Added phase-specific popup motion variables.