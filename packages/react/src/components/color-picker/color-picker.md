# ColorPicker

Upstream docs:

- Ark UI: https://ark-ui.com/docs/components/color-picker
- Chakra UI: https://chakra-ui.com/docs/components/color-picker

## Purpose

`ColorPicker` is the moduix wrapper around Ark UI Color Picker for selecting and editing colors by
field input, color area, channel sliders, eyedropper, and swatches.

## Upstream model to preserve

- Uses `@ark-ui/react/color-picker` directly.
- Keeps Ark parts, value objects from `parseColor`, format state, controlled/open state, provider
  state, and callback detail objects unchanged.
- Keeps popup structure explicit through `ColorPickerPositioner` and `ColorPickerContent`; the root owns portalling.
- `ColorPickerHiddenInput` provides explicit native form integration.

## Current behavior contract

`ColorPicker` and `ColorPickerRootProvider` portal `ColorPickerPositioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- Public composition is `ColorPicker`, `ColorPickerRootProvider`, `ColorPickerLabel`, `ColorPickerControl`, `ColorPickerTrigger`,
  `ColorPickerPositioner`, `ColorPickerContent`, `ColorPickerArea`, `ColorPickerAreaBackground`, `ColorPickerAreaThumb`,
  `ColorPickerChannelSlider`, `ColorPickerChannelSliderTrack`, `ColorPickerChannelSliderThumb`, `ColorPickerChannelSliderLabel`,
  `ColorPickerChannelSliderValueText`, `ColorPickerSliders`, `ColorPickerChannelInput`, `ColorPickerEyeDropperTrigger`,
  `ColorPickerFormatSelect`, `ColorPickerFormatTrigger`, `ColorPickerSwatchGroup`, `ColorPickerSwatchTrigger`,
  `ColorPickerSwatch`, `ColorPickerSwatchIndicator`, `ColorPickerTransparencyGrid`, `ColorPickerValueSwatch`,
  `ColorPickerValueText`, and `ColorPickerView`.
- `ColorPickerHiddenInput` exposes Ark's native form input. Compose it explicitly when the selected
  color should participate in a form.
- `parseColor`, `useColorPicker`, and `useColorPickerContext` are re-exported for common
  string-to-`Color` and advanced state workflows.
- `ColorPickerTrigger` renders the current value swatch by default when children are omitted.
- Channel input `hex` holds six digits without alpha, as in Ark; pair it with an `alpha` channel input when
  the picker edits alpha.
- `ColorPickerArea`, `ColorPickerChannelSlider`, and `ColorPickerSwatchTrigger` render their common visual children by default when
  children are omitted. Default children are the exported moduix parts, so they carry the same classes and
  `data-slot` hooks as an explicit composition.
- `ColorPickerEyeDropperTrigger` and `ColorPickerSwatchIndicator` provide default moduix icons when children are omitted.
- `onValueChange`, `onValueChangeEnd`, `onFormatChange`, and `onOpenChange` preserve Ark detail
  objects without remapping.

## Anatomy and exported parts

```text
ColorPicker
├─ ColorPickerLabel
├─ ColorPickerControl
│  ├─ ColorPickerChannelInput[channel]
│  └─ ColorPickerTrigger
│     └─ ColorPickerValueSwatch
├─ Overlay subtree (automatically portalled)
│  └─ ColorPickerPositioner
│     └─ ColorPickerContent
│        ├─ ColorPickerArea
│        │  ├─ ColorPickerAreaBackground
│        │  └─ ColorPickerAreaThumb
│        ├─ ColorPickerChannelSlider[channel]
│        │  ├─ ColorPickerTransparencyGrid
│        │  ├─ ColorPickerChannelSliderTrack
│        │  └─ ColorPickerChannelSliderThumb
│        ├─ ColorPickerSwatchGroup
│        │  └─ ColorPickerSwatchTrigger[value]
│        │     └─ ColorPickerSwatch[value]
│        │        └─ ColorPickerSwatchIndicator
│        └─ ColorPickerView[format]
│           └─ ColorPickerChannelInput[channel]
└─ ColorPickerHiddenInput (explicit)
```

All styled DOM parts expose matching kebab-case `data-slot` hooks. `ColorPickerRootProvider` accepts a state
object from Ark `useColorPicker`.

## Composition

```tsx
import {
  ColorPicker,
  parseColor,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerArea,
  ColorPickerChannelSliderTrack,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSlider,
  ColorPickerChannelInput,
  ColorPickerSwatchGroup,
  ColorPickerSwatchTrigger,
  ColorPickerSwatchIndicator,
  ColorPickerSwatch,
  ColorPickerTransparencyGrid,
  ColorPickerValueSwatch,
  ColorPickerView,
  ColorPickerSliders,
} from '@moduix/react/color-picker';

export function ColorPickerExample() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPickerLabel>Color</ColorPickerLabel>
      <ColorPickerControl>
        <ColorPickerChannelInput channel="hex" />
        <ColorPickerTrigger aria-label="Open color picker" />
      </ColorPickerControl>
      <ColorPickerPositioner>
        <ColorPickerContent>
          <ColorPickerArea />
          <ColorPickerSliders />
        </ColorPickerContent>
      </ColorPickerPositioner>
    </ColorPicker>
  );
}
```

## Upstream feature coverage

- Basic popup composition with `ColorPickerControl`, `ColorPickerTrigger`, `ColorPickerPositioner`, and `ColorPickerContent`.
- Controlled state through `value`, `format`, `open`, and Ark detail callbacks.
- Inline mode through `inline` on `ColorPicker`, where `ColorPickerArea`, `ColorPickerSliders`, inputs, and swatches can render
  directly inside the root.
- Form usage combines Ark form props with an explicit `ColorPickerHiddenInput`.
- Field integration through Ark `Field` context for disabled, invalid, required, and read-only
  state.
- Provider state through moduix `useColorPicker` plus `ColorPickerRootProvider`.
- Swatch-only, popup swatches, slider-only, input-only, value-swatch, eyedropper, inside-dialog,
  and format-view compositions.
- Public docs intentionally cover all Ark React examples for this primitive plus moduix styling
  sugar, with `Code`, `Styles`, and `Data` tabs on every preview.

## Accessibility and state

- Ark owns color area, slider, input, popover, focus, keyboard, outside interaction, and ARIA
  behavior.
- `ColorPickerHiddenInput` renders the native form input. `name` and related root props configure
  form submission and reset synchronization.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-readonly`, `data-required`, `data-channel`, `data-orientation`, `data-value`,
  `data-placement`, and `data-side`.
- Runtime variables include `--value`, `--color`, `--reference-width`, `--available-width`,
  `--available-height`, `--transform-origin`, `--z-index`, `--layer-index`, and transparency grid
  `--size`.
- All Ark DOM parts preserve `asChild`.

## Defaults and styling

The square trigger, channel inputs, format select, and adjacent action triggers share `--moduix-size-md`; color swatches use `--moduix-size-sm`.

- Content motion uses the shared `--moduix-popup-motion-*` tokens; Color Picker has no local motion
  variables.
- `ColorPickerPositioner` preserves Ark `--z-index`, and `ColorPickerContent` adds `--layer-index` to the moduix popup
  layer so nested pickers remain above their parent overlay.
- `ColorPickerFormatSelect` remains Ark's native select for format changes, with the same collapsed-control
  affordance as moduix `NativeSelect`; its options popup remains browser-native.
- `className` is accepted on every visual part.
- `ColorPickerContent` defaults to `16rem` wide and uses Ark `--available-height` and `--transform-origin`;
  do not default it to `--reference-width`, because the trigger swatch is intentionally narrow.
- `ColorPickerTrigger` supports `data-fit-content` for content-sized button compositions with custom children.
- `ColorPickerSwatch` and `ColorPickerValueSwatch` paint their own checkerboard: Ark sets the color as an
  inline background, and a `::before` layer repaints `--color` over the checkerboard. Both default to
  `--moduix-color-picker-swatch-size`; inside `ColorPickerTrigger` the value swatch fills the trigger, and in a
  `data-fit-content` trigger it is 1rem. `ColorPickerTransparencyGrid` is only needed behind a slider track.
- Ark paints both thumbs and every swatch with the current color through inline `background`; moduix only adds
  the rings and the shadow.
- `ColorPickerSwatchIndicator` follows Ark's `hidden` attribute, so it works inside any `ColorPickerSwatch`.
- The root owns disabled opacity. Swatch triggers dim on their own when disabled and reset inside a disabled
  root; a disabled Field or Fieldset owns the outer opacity instead.
- When `prefers-reduced-motion` is enabled, popup entry and exit animations are disabled; Ark
  presence completes the exit at once.

### Public CSS variables

The public documentation provides the defaults and descriptions for this exact contract. Keep its
`colorPickerOverrideCssProperties` list synchronized with the variables below.

`--moduix-color-picker-width`, `--moduix-color-picker-radius`, `--moduix-color-picker-trigger-size`,
`--moduix-color-picker-content-width`, `--moduix-color-picker-area-height`,
`--moduix-color-picker-thumb-size`, `--moduix-color-picker-channel-slider-height`, and
`--moduix-color-picker-swatch-size`.

Variables cover sizes shared by several parts or by default children. Colors, spacing, typography,
focus rings, and motion come from foundation tokens; change them with a class on the part. Popup
content is portalled, so set popup variables on `ColorPickerContent`, not on the root.

## Intentional sugar and differences from upstream

- moduix ships default icons for `ColorPickerEyeDropperTrigger` and `ColorPickerSwatchIndicator`.
- moduix renders `ColorPickerValueSwatch` inside `ColorPickerTrigger` when children are omitted.
- moduix renders `ColorPickerAreaBackground` and `ColorPickerAreaThumb` inside `ColorPickerArea` when children are omitted.
- moduix renders `ColorPickerChannelSliderTrack`, `ColorPickerChannelSliderThumb`, and an alpha `ColorPickerTransparencyGrid` inside
  `ColorPickerChannelSlider` when children are omitted.
- moduix renders the standard hue and alpha pair in `ColorPickerSliders`; style each channel through
  `data-channel` and CSS variables, or use the lower-level parts for custom structure.
- moduix renders `ColorPickerSwatch` and `ColorPickerSwatchIndicator` inside `ColorPickerSwatchTrigger` when children are omitted.
- moduix re-exports `parseColor`, `useColorPicker`, and `useColorPickerContext`.
- Ark types are re-exported, as in Vue; `ColorPickerRootProps` and `ColorPickerRootProviderProps` include
  `portalled` and `portalRef`.
- The wrapper hides only portal transport and repetitive visual children; `ColorPickerPositioner`, `ColorPickerContent`,
  and the input/view structure remain explicit.
- No local color parsing, value conversion, or callback reshaping is added.

## Agent notes

- Do not render both `Root` and `ColorPickerRootProvider` for the same state instance.
- Prefer moduix `useColorPicker`, `useColorPickerContext`, and the re-exported Ark types for advanced
  workflows.
- Do not hide popup structure behind a `ColorPickerContent` convenience wrapper.
- Preserve Ark `Color` objects and callback detail shapes.
- Form participation is controlled through root props and an explicit `ColorPickerHiddenInput`.
- Upstream review, 2026-08-10: Ark's
  [`Color Picker`](https://ark-ui.com/docs/components/color-picker) defines the preserved behavior
  and lifecycle; [Chakra's Color Picker](https://chakra-ui.com/docs/components/color-picker)
  confirms the part anatomy and styled composition; [shadcn/ui](https://ui.shadcn.com/llms.txt)
  does not ship a Color Picker, so moduix intentionally retains an explicit Ark-shaped composition
  instead of presenting a pseudo-native color input.
- Upstream review, 2026-10-14: the Chakra 3.37 recipe keeps thumbs, swatches, and sliders
  size-driven through a few size variables, which matches the short moduix variable list.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.