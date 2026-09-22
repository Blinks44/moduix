# Tour (Solid)

`Tour` is a styled Ark UI guided walkthrough. The Solid adapter preserves the React component's
explicit anatomy, wait helpers, callbacks, focus behavior, lifecycle, portal placement, runtime
state, and CSS hooks.

## Composition

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

`Tour` is the root. `TourBackdrop`, `TourSpotlight`, and `TourPositioner` are portalled by
default; use `portalled={false}` or `portalRef` on the root to control overlay
placement. `lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Tour`, `TourContext`, `TourBackdrop`, `TourSpotlight`, `TourPositioner`,
`TourContent`, `TourArrow`, `TourArrowTip`, `TourTitle`, `TourDescription`, `TourProgressText`,
`TourBody`, `TourCloseTrigger`, `TourCloseIcon`, `TourControl`, `TourActions`, `TourActionList`,
`TourActionTrigger`, `useTour`, `useTourContext`, `waitForElement`, `waitForElementValue`,
`waitForEvent`, and `waitForPromise`.

`Tour` requires the accessor returned by `useTour`:

```tsx
const tour = useTour({
  steps: [
    {
      id: 'welcome',
      type: 'dialog',
      title: 'Welcome',
      description: 'Start the walkthrough.',
      actions: [{ label: 'Next', action: 'next' }],
    },
  ],
});

<button type="button" onClick={() => tour().start()}>
  Start tour
</button>;
```

Ark owns step state, focus management, dismissal, keyboard navigation, IDs, state attributes,
positioning, and runtime CSS variables. Callback handlers receive Ark detail objects. `TourActionList`
maps the current step actions to styled `TourActionTrigger` parts while preserving duplicate labels and
Ark disabled state.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward refs
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `TourCloseIcon` composes `CloseButton` through the same native render-function
contract and defaults its accessible label to `Close tour`.

`TourArrow` renders `TourArrowTip` when no child is supplied. `TourBody` is a scroll-safe layout
helper, and `TourActions` remains available for custom action composition.
