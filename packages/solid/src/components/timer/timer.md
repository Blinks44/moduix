# Timer (Solid)

`Timer` is the styled Solid wrapper around Ark UI Solid Timer. It displays elapsed or remaining
time and keeps Ark's timer machine, controls, callbacks, ids, and context API intact.

## Public API

`Timer` is equivalent to `Timer.Root` and exposes `RootProvider`, `Area`, `Item`, `Separator`,
`Control`, `ActionTrigger`, `Context`, and `Segments`. The package also exports `useTimer` and
`useTimerContext`.

`Timer.Segments` renders `hours`, `minutes`, and `seconds` by default. Pass `types` and
`separator` to customize the generated `Timer.Item` and `Timer.Separator` parts. It forwards
`Timer.Area` attributes and refs, while owning its generated children and therefore not accepting
`asChild`.

```tsx
import { Timer } from '@moduix/solid/timer';

export function Example() {
  return (
    <Timer targetMs={60 * 60 * 1000}>
      <Timer.Segments />
      <Timer.Control>
        <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
        <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
        <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
      </Timer.Control>
    </Timer>
  );
}
```

## Provider and context

`useTimer()` returns a Solid accessor. Pass it to `Timer.RootProvider` when timer state is created
outside the rendered root. `useTimerContext()` and `Timer.Context` expose the current Ark API;
read the API through `timer()` or `api()`.

```tsx
const timer = useTimer({ targetMs: 60_000 });

<Timer.RootProvider value={timer}>
  <Timer.Context>{(api) => <output>{api().progressPercent}%</output>}</Timer.Context>
</Timer.RootProvider>;
```

## Accessibility and styling

Ark preserves the timer semantics, action visibility, native button keyboard behavior, formatted
time values, `data-scope="timer"`, `data-part`, `data-type`, ids, and callback detail objects.
The wrapper adds the same CSS Module defaults and `data-slot` hooks as the React component. Use
the `--moduix-timer-*` custom properties to adjust spacing, typography, colors, focus ring, and
action dimensions.

## Ark Solid composition

Ark Solid uses a render-function `asChild` prop, for example
`asChild={(props) => <section {...props()} />}`. The installed Ark Solid factory does not forward
refs through `asChild`; ordinary refs and custom-host composition are supported as separate native
paths. The Solid tests cover both paths independently.

## Local changelog

- 2026-09-04: Added the Solid Timer wrapper, tests, playground story, and registry entry in parity
  with the React component.