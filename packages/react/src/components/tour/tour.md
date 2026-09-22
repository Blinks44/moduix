# Tour

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tour
- Zag API: https://zagjs.com/api/mdx/components/react/tour

## Purpose

`Tour` renders a guided product walkthrough with dialog, tooltip, floating, and wait-style steps powered by Ark UI.

## Upstream model to preserve

The wrapper follows Ark UI `Tour`. State is created with `useTour()` and passed to `Tour` through the required `tour` prop. Preserve Ark step objects, action objects, callback detail shapes, focus management, keyboard navigation, wait helpers, and the explicit overlay part tree.

## Current behavior contract

`Tour` portals `TourBackdrop`, `TourSpotlight`, and `TourPositioner` automatically by default. Set `portalled={false}` to render them inline, or pass `portalRef` to target a custom container. These structural parts remain explicit and independently styleable.

`Tour` is a thin styled wrapper over Ark parts. It exposes `TourContext`, `TourBackdrop`, `TourSpotlight`, `TourPositioner`, `TourContent`, `TourArrow`, `TourArrowTip`, `TourTitle`, `TourDescription`, `TourProgressText`, `TourBody`, `TourCloseTrigger`, `TourCloseIcon`, `TourControl`, `TourActions`, `TourActionList`, and `TourActionTrigger`. The wrapper adds CSS Modules styling, stable `data-slot` hooks, a scrollable `TourBody` sugar, bottom-aligned progress text, and a default `TourArrowTip` when `TourArrow` has no children. It does not add local tour state or convert Ark callbacks.
`TourCloseIcon` is a thin helper for the common icon-only dismiss control.

The package keeps `TourContext`, `useTour`, `useTourContext`, and the Ark wait helpers because ordinary tour usage needs them. Duplicate Ark types remain direct imports from `@ark-ui/react/tour`.

## Anatomy and exported parts

```tsx
const tour = useTour({ steps });

<Tour tour={tour}>
  <TourBackdrop />
  <TourSpotlight />
  <TourPositioner>
    <TourContent>
      <TourCloseIcon />
      <TourBody>
        <TourTitle />
        <TourDescription />
        <TourProgressText />
      </TourBody>
      <TourControl>
        <TourActionList />
      </TourControl>
    </TourContent>
  </TourPositioner>
</Tour>;
```

- `Tour`: Ark root. Requires the `tour` object returned by `useTour`.
- `TourBackdrop`: optional overlay layer. `data-slot="tour-backdrop"`.
- `TourSpotlight`: target highlight layer. `data-slot="tour-spotlight"`.
- `TourPositioner`: positioned wrapper for dialog, tooltip, and floating layouts. `data-slot="tour-positioner"`.
- `TourContent`: alert dialog surface with title and description wiring. `data-slot="tour-content"`.
- `TourArrow` / `TourArrowTip`: tooltip arrow. `TourArrow` renders a default `TourArrowTip` when empty.
- `TourTitle`, `TourDescription`, `TourProgressText`: current step content from Ark state.
- `TourBody`: moduix scrollable wrapper for the title, description, and progress content. `data-slot="tour-body"`.
- `TourCloseTrigger`: dismiss button primitive. Consumers provide visible content or use `asChild`.
- `TourCloseIcon`: icon-only close-button helper for the common dismiss affordance.
- `TourControl`, `TourActionList`: recommended action rendering path from the current step.
- `TourActions`, `TourActionTrigger`: explicit Ark action rendering path for custom action UI.

## Composition

```tsx
import type { TourStepDetails } from '@ark-ui/react/tour';
import {
  Tour,
  TourBackdrop,
  TourSpotlight,
  TourPositioner,
  TourContent,
  TourTitle,
  TourDescription,
  TourProgressText,
  TourBody,
  TourCloseIcon,
  TourControl,
  TourActionList,
  useTour,
} from '@moduix/react/tour';

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
        <TourBackdrop />
        <TourSpotlight />
        <TourPositioner>
          <TourContent>
            <TourCloseIcon />
            <TourBody>
              <TourTitle />
              <TourDescription />
              <TourProgressText />
            </TourBody>
            <TourControl>
              <TourActionList />
            </TourControl>
          </TourContent>
        </TourPositioner>
      </Tour>
    </>
  );
}
```

## Upstream feature coverage

The wrapper supports the Ark examples and guides for basic tours, mixed step types, progress UI, events, keyboard navigation, dismiss-based skip UI, async step effects, waiting for clicks, waiting for elements, and wait helpers such as `waitForEvent`, `waitForElement`, `waitForElementValue`, and `waitForPromise`. Controlled scenarios use `stepId`, `steps`, `onStepChange`, `onStepsChange`, and `onStatusChange` on `useTour`.

## Accessibility and state

Ark owns `role="alertdialog"`, `aria-modal`, live-region attributes, title and description IDs, dismissal, Escape handling, outside interaction, focus movement, and left/right keyboard navigation. `keyboardNavigation` defaults to enabled. `TourActionTrigger` preserves Ark `StepAction` objects and sets disabled state for unavailable `prev` and `next` actions. Use `action: 'dismiss'` for the skip button pattern shown in the Ark examples. `Tour` has no `RootProvider`; use the `tour` object from `useTour` as the external state handle. No `HiddenInput` or Field context is involved.

Styled DOM parts forward refs to their Ark-rendered elements and preserve Ark `asChild`. `TourCloseTrigger` and `TourActionTrigger` omit moduix button visuals when `asChild` is used so the semantic child owns its styling.

Relevant attributes include `data-scope="tour"`, `data-part`, `data-state="open|closed"`, `data-type="dialog|tooltip|floating|wait"`, `data-placement`, `data-side`, `data-step`, and `data-disabled` on disabled action triggers. Runtime CSS variables include `--tour-layer`, `--tour-z-index`, `--reference-width`, `--reference-height`, `--available-width`, `--available-height`, `--x`, `--y`, `--z-index`, `--transform-origin`, `--arrow-size`, `--arrow-size-half`, `--arrow-background`, and `--arrow-offset`.

## Defaults and styling

Content motion falls back to the shared `--moduix-popup-motion-*` tokens; `--moduix-tour-*` content-motion
variables remain the more specific override. Backdrop motion remains separate.

The CSS module provides visual defaults for backdrop, spotlight, positioner, content, arrow, title, description, progress text, close trigger, control, and action triggers. Progress text is visually ordered below the title and description so it does not compete with the absolute close trigger. It styles dialog and floating positioners via `data-type`, and tooltip content through Ark popper positioning. Content animations fall back to the `--moduix-popup-motion-*` cascade, matching the popup overlay family; reduced-motion preferences shorten presence animations while preserving Ark's exit lifecycle and remove action-button transitions. Public theme variables are declared in `variables-moduix.css` with `--moduix-tour-*` names, while Ark runtime variables are initialized to avoid unresolved custom property diagnostics.

## Intentional sugar and differences from upstream

Moduix adds only styling, `data-slot` hooks, the default `TourArrowTip` inside `TourArrow`, the optional `TourCloseIcon` helper, `TourBody` for scroll-safe step content, and `TourActionList` for the ordinary action mapping. `TourActionList` passes each Ark action object straight to `TourActionTrigger`, and its `className` styles every generated trigger; use `TourActions` and `TourActionTrigger` when action UI needs custom composition. It does not add bundled content sugar, local progress components, or a local state provider.

## Agent notes

Keep `Tour` as a required-`tour` root until Ark exposes a real `RootProvider`. Keep
`TourPositioner` and `TourContent` explicit; only portal transport is automatic. Use `TourBody` in the
recommended path whenever step content can exceed the available height. If action styling changes,
update `variables-moduix.css`, docs CSS properties, stories, and registry artifacts together.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-09-20: Exported the `TourRootProps` and `TourCloseIconProps` types, aligned spotlight
  layering with the backdrop/content `--layer-index` term, documented the popup-motion fallback
  as the `--moduix-tour-transition` default, removed dead arrow declarations from `.content`, and
  dropped the `--layer-index`/`--nested-layer-count` claims from the runtime-variable list.

- 2026-08-14: Initialize Ark's tooltip positioner layer so it remains above the backdrop.

- 2026-08-14: Respect reduced-motion preferences for overlay presence and action transitions.

- 2026-08-11: Made the recommended tour composition arrowless and kept `TourArrow` as an explicit
  visual-anchor option for tooltip steps.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-08-01: Added `TourBody` for scroll-safe step content, fixed Ark layer ordering and floating placements, and restored the moduix context-hook exports in the public documentation.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for content motion; backdrop motion remains separate.
- 2026-07-05: Added `TourCloseIcon` so guided-tour examples can use the same close-button helper pattern as the other overlay families.
- 2026-07-12: Aligned `TourCloseIcon` fallback geometry and focus ring with `CloseButton` and the dialog overlay family.
- 2026-07-12: Added `TourActionList` as the recommended, stylable mapping for ordinary step actions; `TourActions` and `TourActionTrigger` remain available for custom action UI.
- 2026-07-03: Removed moduix re-exports for `TourContext`, `useTourContext`, and duplicate Ark
  types. Keep `useTour` and wait helpers in `moduix`; import advanced Ark state/types directly
  from `@ark-ui/react/tour`.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.

- 2026-06-29: Completed the Ark migration audit, restored the missing `TourActionsProps` export, aligned spotlight and progress defaults with the public theme contract, and clarified refs, `asChild`, and presence behavior.
- 2026-06-23: Moved progress text and progress examples to the lower content area to avoid overlap with the close trigger.
- 2026-06-23: Aligned skip examples with Ark's `action: 'dismiss'` pattern, documented click/element wait examples, and matched tour content animation fallback to `--moduix-transition-default`.
- 2026-06-23: Added the Ark-backed `Tour` component with CSS Modules styling, stories, local docs, public exports, docs examples, and registry metadata.
