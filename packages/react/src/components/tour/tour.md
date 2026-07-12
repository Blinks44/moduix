# Tour

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tour
- Zag API: https://zagjs.com/api/mdx/components/react/tour

## Purpose

`Tour` renders a guided product walkthrough with dialog, tooltip, floating, and wait-style steps powered by Ark UI.

## Upstream model to preserve

The wrapper follows Ark UI `Tour`. State is created with `useTour()` and passed to `Tour` / `Tour.Root` through the required `tour` prop. Preserve Ark step objects, action objects, callback detail shapes, focus management, keyboard navigation, wait helpers, and the explicit overlay part tree.

## Current behavior contract

`Tour.Root` portals `Backdrop`, `Spotlight`, and `Positioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. These structural parts remain explicit and independently styleable.

`Tour` is a thin styled wrapper over Ark parts. It exposes `Root`, `Backdrop`, `Spotlight`, `Positioner`, `Content`, `Arrow`, `ArrowTip`, `Title`, `Description`, `ProgressText`, `CloseTrigger`, `CloseIcon`, `Control`, `Actions`, `ActionList`, and `ActionTrigger`. The wrapper adds CSS Modules styling, stable `data-slot` hooks, bottom-aligned progress text, and a default `ArrowTip` when `Tour.Arrow` has no children. It does not add local tour state or convert Ark callbacks.
`Tour.CloseIcon` is a thin helper for the common icon-only dismiss control.

The package keeps `useTour` and the Ark wait helpers because ordinary tour usage needs them. Import advanced context hooks and duplicate Ark types directly from `@ark-ui/react/tour`.

## Anatomy and exported parts

```tsx
const tour = useTour({ steps });

<Tour tour={tour}>
  <Tour.Backdrop />
  <Tour.Spotlight />
  <Tour.Positioner>
    <Tour.Content>
      <Tour.Arrow />
      <Tour.CloseIcon />
      <Tour.Title />
      <Tour.Description />
      <Tour.ProgressText />
      <Tour.Control>
        <Tour.ActionList />
      </Tour.Control>
    </Tour.Content>
  </Tour.Positioner>
</Tour>;
```

- `Tour` / `Tour.Root`: Ark root. Requires the `tour` object returned by `useTour`.
- `Tour.Backdrop`: optional overlay layer. `data-slot="tour-backdrop"`.
- `Tour.Spotlight`: target highlight layer. `data-slot="tour-spotlight"`.
- `Tour.Positioner`: positioned wrapper for dialog, tooltip, and floating layouts. `data-slot="tour-positioner"`.
- `Tour.Content`: alert dialog surface with title and description wiring. `data-slot="tour-content"`.
- `Tour.Arrow` / `Tour.ArrowTip`: tooltip arrow. `Tour.Arrow` renders a default `ArrowTip` when empty.
- `Tour.Title`, `Tour.Description`, `Tour.ProgressText`: current step content from Ark state.
- `Tour.CloseTrigger`: dismiss button primitive. Consumers provide visible content or use `asChild`.
- `Tour.CloseIcon`: icon-only close-button helper for the common dismiss affordance.
- `Tour.Control`, `Tour.ActionList`: recommended action rendering path from the current step.
- `Tour.Actions`, `Tour.ActionTrigger`: explicit Ark action rendering path for custom action UI.

## Composition

```tsx
import type { TourStepDetails } from '@ark-ui/react/tour';
import { Tour, useTour } from '@moduix/react';

const steps = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome',
    description: 'Start the walkthrough.',
    actions: [{ label: 'Next', action: 'next' }],
    backdrop: true,
  },
] satisfies TourStepDetails[];

function Example() {
  const tour = useTour({ steps });

  return (
    <>
      <button type="button" onClick={() => tour.start()}>
        Start tour
      </button>
      <Tour tour={tour} lazyMount unmountOnExit>
        <Tour.Backdrop />
        <Tour.Spotlight />
        <Tour.Positioner>
          <Tour.Content>
            <Tour.Arrow />
            <Tour.CloseIcon />
            <Tour.Title />
            <Tour.Description />
            <Tour.ProgressText />
            <Tour.Control>
              <Tour.ActionList />
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Tour>
    </>
  );
}
```

## Upstream feature coverage

The wrapper supports the Ark examples and guides for basic tours, mixed step types, progress UI, events, keyboard navigation, dismiss-based skip UI, async step effects, waiting for clicks, waiting for elements, and wait helpers such as `waitForEvent`, `waitForElement`, `waitForElementValue`, and `waitForPromise`. Controlled scenarios use `stepId`, `steps`, `onStepChange`, `onStepsChange`, and `onStatusChange` on `useTour`.

## Accessibility and state

Ark owns `role="alertdialog"`, `aria-modal`, live-region attributes, title and description IDs, dismissal, Escape handling, outside interaction, focus movement, and left/right keyboard navigation. `keyboardNavigation` defaults to enabled. `Tour.ActionTrigger` preserves Ark `StepAction` objects and sets disabled state for unavailable `prev` and `next` actions. Use `action: 'dismiss'` for the skip button pattern shown in the Ark examples. `Tour.Root` has no `RootProvider`; use the `tour` object from `useTour` as the external state handle. No `HiddenInput` or Field context is involved.

Styled DOM parts forward refs to their Ark-rendered elements and preserve Ark `asChild`. `CloseTrigger` and `ActionTrigger` omit moduix button visuals when `asChild` is used so the semantic child owns its styling.

Relevant attributes include `data-scope="tour"`, `data-part`, `data-state="open|closed"`, `data-type="dialog|tooltip|floating|wait"`, `data-placement`, `data-side`, `data-step`, and `data-disabled` on disabled action triggers. Runtime CSS variables include `--tour-layer`, `--reference-width`, `--reference-height`, `--available-width`, `--available-height`, `--x`, `--y`, `--z-index`, `--transform-origin`, `--arrow-size`, `--arrow-size-half`, `--arrow-background`, `--arrow-offset`, `--layer-index`, and `--nested-layer-count`.

## Defaults and styling

The CSS module provides visual defaults for backdrop, spotlight, positioner, content, arrow, title, description, progress text, close trigger, control, and action triggers. Progress text is visually ordered below the title and description so it does not compete with the absolute close trigger. It styles dialog and floating positioners via `data-type`, and tooltip content through Ark popper positioning. Content animations use the shared `--transition-default` fallback, matching the dialog-like overlay family. Public theme variables are declared in `theme.css` with `--tour-*` names, while Ark runtime variables are initialized to avoid unresolved custom property diagnostics.

## Intentional sugar and differences from upstream

Moduix adds only styling, `data-slot` hooks, the default `ArrowTip` inside `Tour.Arrow`, the optional `Tour.CloseIcon` helper, and `Tour.ActionList` for the ordinary action mapping. `ActionList` passes each Ark action object straight to `ActionTrigger`, and its `className` styles every generated trigger; use `Actions` and `ActionTrigger` when action UI needs custom composition. It does not add bundled content sugar, local progress components, or a local state provider.

## Agent notes

Keep `Tour.Root` as a required-`tour` root until Ark exposes a real `RootProvider`. Keep
`Positioner` and `Content` explicit; only portal transport is automatic. If action styling changes,
update `theme.css`, docs CSS properties, stories, and registry artifacts together.

## Local changelog

- 2026-07-05: Added `Tour.CloseIcon` so guided-tour examples can use the same close-button helper pattern as the other overlay families.
- 2026-07-12: Aligned `Tour.CloseIcon` fallback geometry and focus ring with `CloseButton` and the dialog overlay family.
- 2026-07-12: Added `Tour.ActionList` as the recommended, stylable mapping for ordinary step actions; `Tour.Actions` and `Tour.ActionTrigger` remain available for custom action UI.
- 2026-07-03: Removed moduix re-exports for `Tour.Context`, `useTourContext`, and duplicate Ark
  types. Keep `useTour` and wait helpers in `moduix`; import advanced Ark state/types directly
  from `@ark-ui/react/tour`.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-29: Completed the Ark migration audit, restored the missing `TourActionsProps` export, aligned spotlight and progress defaults with the public theme contract, and clarified refs, `asChild`, and presence behavior.
- 2026-06-23: Moved progress text and progress examples to the lower content area to avoid overlap with the close trigger.
- 2026-06-23: Aligned skip examples with Ark's `action: 'dismiss'` pattern, documented click/element wait examples, and matched tour content animation fallback to `--transition-default`.
- 2026-06-23: Added the Ark-backed `Tour` component with CSS Modules styling, stories, local docs, public exports, docs examples, and registry metadata.