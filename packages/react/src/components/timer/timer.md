# Timer

## Upstream docs

- Ark UI: https://ark-ui.com/docs/components/timer
- Zag machine API: https://zagjs.com/api/mdx/components/react/timer

## Purpose

`Timer` displays elapsed or remaining time and exposes Ark controls for starting, pausing,
resuming, resetting, and restarting the timer.

## Upstream model to preserve

The component is a thin wrapper over `@ark-ui/react/timer`. Preserve Ark's root/provider model,
part names, timer machine semantics, and action callbacks. The wrapper must not add its own timer
state or duplicate Ark's interval logic.

Ark anatomy:

```tsx
<Timer>
  <TimerArea>
    <TimerItem />
    <TimerSeparator />
  </TimerArea>
  <TimerControl>
    <TimerActionTrigger />
  </TimerControl>
</Timer>
```

## Current behavior contract

- `Timer` owns Ark timer state and accepts the full set of Ark timer props.
- `Timer` accepts Ark timer props including `autoStart`, `countdown`, `startMs`,
  `targetMs`, `interval`, `ids`, `translations`, `onTick`, and `onComplete`.
- `TimerRootProvider` accepts a `value` from Ark `useTimer()` for externally created timer state.
- `TimerActionTrigger` requires Ark's `action` prop: `start`, `pause`, `resume`, `reset`, or
  `restart`.
- `TimerItem` requires `type`, matching Ark time parts such as `days`, `hours`, `minutes`,
  `seconds`, and `milliseconds`.
- `TimerSegments` renders hours, minutes, and seconds by default, or standard `TimerItem` and
  `TimerSeparator` composition from `types`. It forwards `TimerArea` attributes and its ref,
  except `children` and `asChild`, because it owns the generated part tree.
- moduix re-exports `useTimer` and `useTimerContext`; `TimerContext` provides the corresponding
  Ark context surface for normal advanced composition.

## Anatomy and exported parts

```tsx
Timer
├─ TimerArea
│  ├─ TimerItem
│  └─ TimerSeparator
└─ TimerControl
   └─ TimerActionTrigger

TimerRootProvider
└─ same part tree connected to Ark useTimer()

TimerSegments
└─ TimerArea with TimerItem and TimerSeparator parts
```

| Export                 | `data-slot`            | Notes                                                      |
| ---------------------- | ---------------------- | ---------------------------------------------------------- |
| `Timer` | `timer-root`           | Owns Ark timer state and ids.                              |
| `TimerRootProvider`   | `timer-root-provider`  | Connects parts to Ark `useTimer()` state.                  |
| `TimerSegments`       | `timer-area`           | Composes standard items and separators from `types`.       |
| `TimerArea`           | `timer-area`           | Groups visible time parts.                                 |
| `TimerItem`           | `timer-item`           | Renders one formatted time unit and keeps Ark `data-type`. |
| `TimerSeparator`      | `timer-separator`      | Visual separator between items.                            |
| `TimerControl`        | `timer-control`        | Groups action triggers.                                    |
| `TimerActionTrigger`  | `timer-action-trigger` | Button that dispatches an Ark timer action.                |
| `TimerContext`        | -                      | Reads the current Ark timer API in the rendered subtree.   |
| `useTimer`             | -                      | Creates Ark timer state for `TimerRootProvider`.          |
| `useTimerContext`      | -                      | Reads the current Ark timer API from context.              |

## Composition

```tsx
<Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
  <TimerSegments types={['hours', 'minutes', 'seconds']} />
  <TimerControl>
    <TimerActionTrigger action="start">Start</TimerActionTrigger>
    <TimerActionTrigger action="pause">Pause</TimerActionTrigger>
    <TimerActionTrigger action="reset">Reset</TimerActionTrigger>
  </TimerControl>
</Timer>
```

## Upstream feature coverage

- Basic elapsed timer is supported through `targetMs` and optional `startMs`.
- Countdown is supported with `countdown` and `startMs`.
- Sub-second rendering is supported with `interval` and `TimerItem type="milliseconds"`.
- Events are supported through Ark `onTick(details)` and `onComplete()`.
- Pomodoro-style flows are supported by remounting/changing timer props or controlling state
  outside the component.
- Root provider usage is supported with moduix `useTimer()` and `TimerRootProvider`.
- Programmatic controls and state reads stay available through `TimerContext` and
  `useTimerContext()` from moduix.

Timer does not expose a separate controlled `value` prop because Ark Timer is action-driven rather
than controlled by a React value. Use `RootProvider` when state must be created outside the tree.

## Accessibility and state

Ark owns the timer machine, button props, ids, callbacks, and formatted values. `ActionTrigger`
renders a button by default, so keyboard activation follows native button behavior. Ark applies
`hidden` to actions that do not match the current machine state; the wrapper preserves that
visibility contract. There is no roving focus or composite keyboard navigation in the timer
primitive.

`TimerItem` preserves Ark `data-scope="timer"`, `data-part="item"`, `data-type`, and `--value`.
Labels such as `days`, `hours`, or `seconds` are ordinary composition around `TimerItem`, not a
separate Ark part. All wrapped parts preserve Ark `asChild`, refs, and primitive attributes. Keep
semantic replacement children compatible when using `asChild`. Use `translations.areaLabel` when
the default accessible timer label is not appropriate.

## Defaults and styling

The wrapper adds CSS Modules defaults and stable `data-slot` hooks. `Timer` centers its
children with `place-items: center` by default. Runtime styling is controlled with component CSS
variables such as `--moduix-timer-gap`, `--moduix-timer-area-font-size`, `--moduix-timer-item-min-width`,
`--moduix-timer-action-trigger-bg`, and `--moduix-timer-action-trigger-icon-size`.

`className` is normalized and merged with the default part class on every wrapped part.

## Intentional sugar and differences from upstream

moduix adds styled button defaults for `TimerActionTrigger`, default SVG icon sizing inside
actions, centered root layout, tabular numeric display for `TimerArea`, stable `data-slot`
selectors, and `TimerSegments` for the common display shape. It does not rename Ark props, add
hidden controls, or add state outside Ark.

`TimerSegments` defaults to `hours`, `minutes`, and `seconds`, and accepts `types`, `separator`,
and `TimerArea` attributes such as `className`, `id`, and ARIA attributes. It forwards its ref but
does not support `asChild` because it owns the generated children; use `TimerArea` when replacing
the host or controlling children. Use the exported lower-level parts when unit labels or per-item
customization are required.

The root and area cap their inline size to the available container. The area wraps time parts when
needed, while the control row already wraps actions.

## Agent notes

Do not implement a custom interval, pause/resume state, or progress calculation in the wrapper.
Keep future additions as explicit parts or style hooks unless Ark adds new timer primitives.

## Local changelog

- 2026-09-22: Replaced the compound Timer API with flat Timer, TimerRootProvider, TimerArea,
  TimerItem, TimerSeparator, TimerControl, TimerActionTrigger, TimerContext, and TimerSegments
  exports.
- 2026-08-13: Made `TimerSegments` forward the available `TimerArea` attributes and its ref,
  while intentionally retaining ownership of its generated children.
- 2026-07-31: Added default `TimerSegments` units, responsive time-area wrapping, focused tests,
  and centered docs previews with semantic interaction output.
- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-12: Added `TimerSegments` and moduix-owned `useTimer`, `useTimerContext`, and
  `TimerContext` exports for the documented advanced composition path.
- 2026-06-29: Preserved Ark's action-trigger `hidden` state, aligned typography and focus styling,
  exported Ark part/context types, and completed public API and CSS-variable documentation.
- 2026-07-03: Removed duplicate hook, context, and type re-exports from the moduix surface while
  keeping `TimerRootProvider` for Ark-owned external state.
- 2026-06-23: Added `Timer` as an Ark UI wrapper with CSS Modules, Storybook examples, docs, and
  registry support.
- 2026-06-23: Aligned examples with Ark's icon action triggers and labeled time item composition;
  centered root layout by default.
