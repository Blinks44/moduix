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
<Timer.Root>
  <Timer.Area>
    <Timer.Item />
    <Timer.Separator />
  </Timer.Area>
  <Timer.Control>
    <Timer.ActionTrigger />
  </Timer.Control>
</Timer.Root>
```

## Current behavior contract

- `Timer` is the same component as `Timer.Root`.
- `Timer.Root` accepts Ark timer props including `autoStart`, `countdown`, `startMs`,
  `targetMs`, `interval`, `ids`, `translations`, `onTick`, and `onComplete`.
- `Timer.RootProvider` accepts a `value` from Ark `useTimer()` for externally created timer state.
- `Timer.ActionTrigger` requires Ark's `action` prop: `start`, `pause`, `resume`, `reset`, or
  `restart`.
- `Timer.Item` requires `type`, matching Ark time parts such as `days`, `hours`, `minutes`,
  `seconds`, and `milliseconds`.
- `Timer.Segments` renders standard `Timer.Item` and `Timer.Separator` composition from `types`.
- moduix re-exports `useTimer` and `useTimerContext`; `Timer.Context` provides the corresponding
  Ark context surface for normal advanced composition.

## Anatomy and exported parts

```tsx
Timer.Root
├─ Timer.Area
│  ├─ Timer.Item
│  └─ Timer.Separator
└─ Timer.Control
   └─ Timer.ActionTrigger

Timer.RootProvider
└─ same part tree connected to Ark useTimer()

Timer.Segments
└─ Timer.Area with Timer.Item and Timer.Separator parts
```

| Export                 | `data-slot`            | Notes                                                      |
| ---------------------- | ---------------------- | ---------------------------------------------------------- |
| `Timer` / `Timer.Root` | `timer-root`           | Owns Ark timer state and ids.                              |
| `Timer.RootProvider`   | `timer-root-provider`  | Connects parts to Ark `useTimer()` state.                  |
| `Timer.Segments`       | `timer-area`           | Composes standard items and separators from `types`.       |
| `Timer.Area`           | `timer-area`           | Groups visible time parts.                                 |
| `Timer.Item`           | `timer-item`           | Renders one formatted time unit and keeps Ark `data-type`. |
| `Timer.Separator`      | `timer-separator`      | Visual separator between items.                            |
| `Timer.Control`        | `timer-control`        | Groups action triggers.                                    |
| `Timer.ActionTrigger`  | `timer-action-trigger` | Button that dispatches an Ark timer action.                |
| `Timer.Context`        | —                      | Reads the current Ark timer API in the rendered subtree.   |
| `useTimer`             | —                      | Creates Ark timer state for `Timer.RootProvider`.          |
| `useTimerContext`      | —                      | Reads the current Ark timer API from context.              |

## Composition

```tsx
<Timer targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
  <Timer.Segments types={['hours', 'minutes', 'seconds']} />
  <Timer.Control>
    <Timer.ActionTrigger action="start">Start</Timer.ActionTrigger>
    <Timer.ActionTrigger action="pause">Pause</Timer.ActionTrigger>
    <Timer.ActionTrigger action="reset">Reset</Timer.ActionTrigger>
  </Timer.Control>
</Timer>
```

## Upstream feature coverage

- Basic elapsed timer is supported through `targetMs` and optional `startMs`.
- Countdown is supported with `countdown` and `startMs`.
- Sub-second rendering is supported with `interval` and `Timer.Item type="milliseconds"`.
- Events are supported through Ark `onTick(details)` and `onComplete()`.
- Pomodoro-style flows are supported by remounting/changing timer props or controlling state
  outside the component.
- Root provider usage is supported with moduix `useTimer()` and `Timer.RootProvider`.
- Programmatic controls and state reads stay available through `Timer.Context` and
  `useTimerContext()` from moduix.

Timer does not expose a separate controlled `value` prop because Ark Timer is action-driven rather
than controlled by a React value. Use `RootProvider` when state must be created outside the tree.

## Accessibility and state

Ark owns the timer machine, button props, ids, callbacks, and formatted values. `ActionTrigger`
renders a button by default, so keyboard activation follows native button behavior. Ark applies
`hidden` to actions that do not match the current machine state; the wrapper preserves that
visibility contract. There is no roving focus or composite keyboard navigation in the timer
primitive.

`Timer.Item` preserves Ark `data-scope="timer"`, `data-part="item"`, `data-type`, and `--value`.
Labels such as `days`, `hours`, or `seconds` are ordinary composition around `Timer.Item`, not a
separate Ark part. All wrapped parts preserve Ark `asChild`, refs, and primitive attributes. Keep
semantic replacement children compatible when using `asChild`. Use `translations.areaLabel` when
the default accessible timer label is not appropriate.

## Defaults and styling

The wrapper adds CSS Modules defaults and stable `data-slot` hooks. `Timer.Root` centers its
children with `place-items: center` by default. Runtime styling is controlled with component CSS
variables such as `--timer-gap`, `--timer-area-font-size`, `--timer-item-min-width`,
`--timer-action-trigger-bg`, and `--timer-action-trigger-icon-size`.

`className` is normalized and merged with the default part class on every wrapped part.

## Intentional sugar and differences from upstream

moduix adds styled button defaults for `Timer.ActionTrigger`, default SVG icon sizing inside
actions, centered root layout, tabular numeric display for `Timer.Area`, stable `data-slot`
selectors, and `Timer.Segments` for the common display shape. It does not rename Ark props, add
hidden controls, or add state outside Ark.

`Timer.Segments` accepts only `types`, `separator`, and `className`; use the exported lower-level
parts when unit labels or per-item customization are required.

## Agent notes

Do not implement a custom interval, pause/resume state, or progress calculation in the wrapper.
Keep future additions as explicit parts or style hooks unless Ark adds new timer primitives.

## Local changelog

- 2026-07-12: Added `Timer.Segments` and moduix-owned `useTimer`, `useTimerContext`, and
  `Timer.Context` exports for the documented advanced composition path.
- 2026-06-29: Preserved Ark's action-trigger `hidden` state, aligned typography and focus styling,
  exported Ark part/context types, and completed public API and CSS-variable documentation.
- 2026-07-03: Removed duplicate hook, context, and type re-exports from the moduix surface while
  keeping `Timer.RootProvider` for Ark-owned external state.
- 2026-06-23: Added `Timer` as an Ark UI wrapper with CSS Modules, Storybook examples, docs, and
  registry support.
- 2026-06-23: Aligned examples with Ark's icon action triggers and labeled time item composition;
  centered root layout by default.