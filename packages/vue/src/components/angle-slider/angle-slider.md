# AngleSlider (Vue)

## Upstream reference

[Ark UI Angle Slider](https://ark-ui.com/docs/components/angle-slider). The React adapter's
`angle-slider.md` holds the full shared contract; this file records the Vue specifics. The Vue
Tailwind adapter shares this behavior contract.

## Purpose

A styled Ark UI angle slider for selecting one value on a circular 0-360-degree dial.

## Composition

```vue
<AngleSlider v-model="angle" name="rotation">
  <AngleSliderLabel>Rotation</AngleSliderLabel>
  <AngleSliderDial>
    <AngleSliderMarks :values="[0, 90, 180, 270]" />
  </AngleSliderDial>
  <AngleSliderHiddenInput />
</AngleSlider>
```

## Public contract

- Exports `AngleSlider`, `AngleSliderRootProvider`, `AngleSliderContext`, `AngleSliderLabel`,
  `AngleSliderControl`, `AngleSliderDial`, `AngleSliderThumb`, `AngleSliderMarkerGroup`,
  `AngleSliderMarker`, `AngleSliderMarks`, `AngleSliderValueText`, `AngleSliderHiddenInput`,
  `useAngleSlider`, and `useAngleSliderContext`, plus the Ark types `AngleSliderRootProps`,
  `UseAngleSliderProps`, and `UseAngleSliderReturn`.
- Ark props and emits pass through unchanged: `v-model`, `default-value`, `step`, `disabled`,
  `invalid`, `read-only`, `name`, `ids`, `dir`, `value-change`, and `value-change-end` with Ark
  detail objects.
- `AngleSliderDial` renders `AngleSliderControl`, its default slot, the centered
  `AngleSliderValueText`, and `AngleSliderThumb`. `AngleSliderMarks` renders a marker group from
  `values`. Neither accepts `as-child`.
- `AngleSliderControl` focuses the thumb synchronously on a left pointer down with
  `focus({ preventScroll: true, focusVisible: false })`. It emits `pointerdown` first and skips the
  focus when the listener calls `preventDefault()` or the control is disabled or read-only.
- `AngleSliderValueText` renders the value with a degree sign (`135°`) unless its default slot is
  filled; Ark's own default is `135deg`.
- `AngleSliderRootProvider` receives the store returned by `useAngleSlider()`.

## Preservation notes

- Props are declared only where moduix needs them (`class`, marker `value`, provider `value`,
  marks `values`), so Boolean props such as `disabled` and `as-child` keep Vue's Boolean casting
  through attrs.
- Keep consumer classes last and attrs on the rendered host. Refs on parts expose the rendered host
  through `$el`.
- Compose `AngleSliderHiddenInput` explicitly; set `form` on it for a form outside the tree.
- The SSR test renders the anatomy without browser globals, and the hydration test keeps server
  hosts and ids; keep both passing.

## Styling and accessibility

Ark owns the slider role, keyboard handling, and naming through `AngleSliderLabel`, `aria-label`,
or `aria-labelledby`.

The dial is `9rem` wide by default. The fill is sized from Ark's `--value` and flipped on
`Control[dir='rtl']`, so it follows the thumb that Ark mirrors in RTL. `AngleSliderValueText` is
centered only inside `AngleSliderControl`. The pressed thumb look comes from the native `:active`
state of the control, and thumb transitions use token durations that drop under reduced motion.