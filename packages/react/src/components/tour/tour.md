# Tour

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/tour
- Zag API: https://zagjs.com/api/mdx/components/react/tour

## Purpose

`Tour` renders a guided product walkthrough with dialog, tooltip, floating, and wait steps powered by
Ark UI.

## Upstream model to preserve

State is created with `useTour()` and passed to `Tour` through the required `tour` prop. Ark has no
`RootProvider` for Tour. Preserve Ark step objects, action objects, callback detail shapes, focus
management, keyboard navigation, wait helpers, and the explicit overlay part tree.

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

- `Tour`: Ark root. Requires the object returned by `useTour`.
- `TourBackdrop`, `TourSpotlight`, `TourPositioner`: overlay layers, portalled by default.
- `TourContent`: Ark `alertdialog` surface with title and description wiring.
- `TourArrow` / `TourArrowTip`: tooltip arrow. `TourArrow` renders a default `TourArrowTip` when empty.
- `TourTitle`, `TourDescription`, `TourProgressText`: current step content from Ark state.
- `TourBody`: moduix wrapper that scrolls long step copy within the content height limit.
- `TourCloseTrigger`: unstyled Ark dismiss button. Consumers provide content or use `asChild`.
- `TourCloseIcon`: styled icon-only close button, labelled `Close tour` by default.
- `TourControl`: action row.
- `TourActionList`: renders a styled `TourActionTrigger` for every action of the current step; its
  `className` styles each trigger.
- `TourActions`, `TourActionTrigger`: Ark action rendering for custom action UI. `TourActionTrigger`
  drops its button styles under `asChild`.

The package exports `TourContext`, `useTour`, `useTourContext`, the wait helpers (`waitForElement`,
`waitForElementValue`, `waitForEvent`, `waitForPromise`), `TourRootProps`, `TourCloseIconProps`,
`TourActionListProps`, and the Ark part props, step, callback detail, and hook types.

## Defaults that differ from Ark

- `lazyMount` and `unmountOnExit` default to `true`: overlay content is absent until the first start
  and is removed after its exit animation.
- `portalled` defaults to `true`. Set `portalled={false}` to render overlay parts inline, or pass
  `portalRef` to target a custom container.

## Styling contract

- Overlay layers stack from the `--moduix-z-tour` token (65: above dialogs and popovers at
  `--moduix-z-popup`, below toasts) plus Ark's `--tour-layer` (backdrop 0, spotlight 1,
  positioner 2). The positioner also sets `--tour-z-index`, which Ark uses for the inline z-index of
  tooltip steps.
- Ark positions only tooltip steps. Dialog steps are centered in a fixed, scrollable positioner;
  floating steps are placed 1.5rem from the viewport edge named by `placement`, or in the viewport
  center for `placement: 'center'`. Top and bottom placements are centered with physical `left`, so
  they stay centered in RTL.
- `TourContent` is a flex column 20rem wide for tooltip steps, 26rem for dialog steps, and 22rem for
  floating steps, capped by the viewport and Ark's available size, with a 24rem height limit.
  `TourBody` shrinks inside it and scrolls.
- `TourTitle` reserves inline-end space for `TourCloseIcon`.
- `next` and `close` action triggers use the primary colors; other actions are outlined.
- Content motion uses the shared `moduix-popup-in` / `moduix-popup-out` keyframes and the
  `--moduix-popup-motion-*` variables; the backdrop uses the dialog backdrop keyframes. Both are
  disabled for reduced motion.
- CSS Modules have no `--moduix-tour-*` variables; override parts with a class or a `data-slot`
  selector. The backdrop reads the shared `--moduix-backdrop-bg` and `--moduix-backdrop-filter`.

## Accessibility and state

Ark owns `role="alertdialog"`, `aria-modal`, live-region attributes, title and description IDs,
dismissal, Escape handling, outside interaction, focus movement, and left/right keyboard navigation.
`TourActionTrigger` keeps Ark `StepAction` objects and the disabled state of unavailable `prev` and
`next` actions. Use `action: 'dismiss'` for a skip button.

Relevant attributes include `data-scope="tour"`, `data-part`, `data-state`, `data-type`,
`data-placement`, `data-side`, `data-step`, and `data-disabled`. Runtime CSS variables include
`--tour-layer`, `--available-width`, `--available-height`, `--x`, `--y`, `--z-index`,
`--transform-origin`, and the arrow variables.

## Agent notes

Keep `Tour` as a required-`tour` root until Ark exposes a real `RootProvider`. Keep `TourPositioner`
and `TourContent` explicit; only portal transport is automatic. The docs "Advanced customization"
example builds the tour without `TourCloseIcon`, `TourBody`, and `TourActionList`; keep it free of
sugar.