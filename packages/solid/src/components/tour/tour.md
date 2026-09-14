# Tour (Solid)

`Tour` is a styled Ark UI guided walkthrough. The Solid adapter preserves the React component's
explicit anatomy, wait helpers, callbacks, focus behavior, lifecycle, portal placement, runtime
state, and CSS hooks.

## Composition

```tsx
const tour = useTour({ steps });

<Tour tour={tour}>
  <Tour.Backdrop />
  <Tour.Spotlight />
  <Tour.Positioner>
    <Tour.Content>
      <Tour.CloseIcon />
      <Tour.Body>
        <Tour.Title />
        <Tour.Description />
        <Tour.ProgressText />
      </Tour.Body>
      <Tour.Control>
        <Tour.ActionList />
      </Tour.Control>
    </Tour.Content>
  </Tour.Positioner>
</Tour>;
```

`Tour` and `Tour.Root` are equivalent roots. `Backdrop`, `Spotlight`, and `Positioner` are
portalled by default; use `portalled={false}` or `portalRef` on the root to control overlay
placement. `lazyMount` and `unmountOnExit` default to `true`.

## API surface

The adapter exports `Tour`, `useTour`, `useTourContext`, `waitForElement`, `waitForElementValue`,
`waitForEvent`, and `waitForPromise`. `Tour` exposes `Root`, `Context`, `Backdrop`, `Spotlight`,
`Positioner`, `Content`, `Arrow`, `ArrowTip`, `Title`, `Description`, `ProgressText`, `Body`,
`CloseTrigger`, `CloseIcon`, `Control`, `Actions`, `ActionList`, and `ActionTrigger`.

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
positioning, and runtime CSS variables. Callback handlers receive Ark detail objects. `ActionList`
maps the current step actions to styled `ActionTrigger` parts while preserving duplicate labels and
Ark disabled state.

## Solid composition notes

Ark Solid uses render-function `asChild`:
`asChild={(props) => <button {...props()} type="button" />}`. Its factory does not forward refs
through `asChild`, so ordinary refs and custom-host composition are supported as separate native
paths. `Tour.CloseIcon` composes `CloseButton.Root` through the same native render-function
contract and defaults its accessible label to `Close tour`.

`Tour.Arrow` renders `Tour.ArrowTip` when no child is supplied. `Tour.Body` is a scroll-safe layout
helper, and `Tour.Actions` remains available for custom action composition.