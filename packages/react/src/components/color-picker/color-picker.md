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
- Keeps popup structure explicit through `Positioner` and `Content`; the root owns portalling.
- Keeps `HiddenInput` as the native form integration point.

## Current behavior contract

`Root` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- Public composition is `ColorPicker.Root`, `RootProvider`, `Label`, `Control`, `Trigger`,
  `Positioner`, `Content`, `Area`, `AreaBackground`, `AreaThumb`, channel slider parts,
  `ChannelInput`, `EyeDropperTrigger`, format parts, swatch parts, `TransparencyGrid`,
  `ValueSwatch`, `ValueText`, `View`, and `HiddenInput`.
- `parseColor` is re-exported for the common string-to-`Color` workflow.
- Advanced Ark state hooks, context APIs, and type exports are intentionally not mirrored from
  `moduix`; import them from `@ark-ui/react/color-picker` when needed.
- `Trigger` renders the current value swatch by default when children are omitted.
- `EyeDropperTrigger` and `SwatchIndicator` provide default moduix icons when children are omitted.
- `onValueChange`, `onValueChangeEnd`, `onFormatChange`, and `onOpenChange` preserve Ark detail
  objects without remapping.

## Anatomy and exported parts

```text
ColorPicker.Root
├─ ColorPicker.Label
├─ ColorPicker.Control
│  ├─ ColorPicker.ChannelInput[channel]
│  └─ ColorPicker.Trigger
│     ├─ ColorPicker.TransparencyGrid
│     └─ ColorPicker.ValueSwatch
├─ Overlay subtree (automatically portalled)
│  └─ ColorPicker.Positioner
│     └─ ColorPicker.Content
│        ├─ ColorPicker.Area
│        │  ├─ ColorPicker.AreaBackground
│        │  └─ ColorPicker.AreaThumb
│        ├─ ColorPicker.ChannelSlider[channel]
│        │  ├─ ColorPicker.TransparencyGrid
│        │  ├─ ColorPicker.ChannelSliderTrack
│        │  └─ ColorPicker.ChannelSliderThumb
│        ├─ ColorPicker.SwatchGroup
│        │  └─ ColorPicker.SwatchTrigger[value]
│        │     └─ ColorPicker.Swatch[value]
│        │        └─ ColorPicker.SwatchIndicator
│        └─ ColorPicker.View[format]
│           └─ ColorPicker.ChannelInput[channel]
└─ ColorPicker.HiddenInput
```

All styled DOM parts expose matching kebab-case `data-slot` hooks. `RootProvider` accepts a state
object from Ark `useColorPicker`.

## Composition

```tsx
import { ColorPicker, parseColor } from '@moduix/react';

export function ColorPickerExample() {
  return (
    <ColorPicker.Root defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area>
            <ColorPicker.AreaBackground />
            <ColorPicker.AreaThumb />
          </ColorPicker.Area>
          <ColorPicker.ChannelSlider channel="hue">
            <ColorPicker.ChannelSliderTrack />
            <ColorPicker.ChannelSliderThumb />
          </ColorPicker.ChannelSlider>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
      <ColorPicker.HiddenInput />
    </ColorPicker.Root>
  );
}
```

## Upstream feature coverage

- Basic popup composition with `Control`, `Trigger`, `Positioner`, and `Content`.
- Controlled state through `value`, `format`, `open`, and Ark detail callbacks.
- Inline mode through `inline` on `Root`, where `Area`, sliders, inputs, and swatches can render
  directly inside the root.
- Form usage through `HiddenInput` plus `name` or form-library registration.
- Field integration through Ark `Field.Root` context for disabled, invalid, required, and read-only
  state.
- Provider state through Ark `useColorPicker` plus `RootProvider`.
- Swatch-only, popup swatches, slider-only, input-only, value-swatch, eyedropper, inside-dialog,
  and format-view compositions.
- Public docs intentionally cover all Ark React examples for this primitive plus moduix styling
  sugar, with `Code`, `Styles`, and `Data` tabs on every preview.

## Accessibility and state

- Ark owns color area, slider, input, popover, focus, keyboard, outside interaction, and ARIA
  behavior.
- Keep `HiddenInput` when native form submission or reset synchronization is required.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-readonly`, `data-required`, `data-channel`, `data-orientation`, `data-value`,
  `data-placement`, and `data-side`.
- Runtime variables include `--value`, `--color`, `--reference-width`, `--available-width`,
  `--available-height`, `--transform-origin`, `--layer-index`, and transparency grid `--size`.
- All Ark DOM parts preserve `asChild`.

## Defaults and styling

- moduix applies field, popup, color area, slider, swatch, focus ring, shadow, and motion defaults.
- `className` is accepted on every visual part.
- `Content` defaults to `16rem` wide and uses Ark `--available-height` and `--transform-origin`;
  do not default it to `--reference-width`, because the trigger swatch is intentionally narrow.
- `Trigger` supports `data-fit-content` for content-sized button compositions with custom children.
- `AreaThumb`, `ChannelSliderThumb`, `Swatch`, `SwatchTrigger`, and `ValueSwatch` preserve Ark
  color variables such as `--color`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `EyeDropperTrigger` and `SwatchIndicator`.
- moduix renders `TransparencyGrid` and `ValueSwatch` inside `Trigger` when children are omitted.
- moduix re-exports `parseColor`.
- Advanced Ark state hooks, renderless context access, and Ark type exports stay upstream-only.
- The wrapper hides only the portal transport; `Positioner`, `Content`, and the input/slider/view structure
  behind convenience components.
- No local color parsing, value conversion, or callback reshaping is added.

## Agent notes

- Do not render both `Root` and `RootProvider` for the same state instance.
- Import `useColorPicker`, `useColorPickerContext`, and Ark type helpers directly from
  `@ark-ui/react/color-picker` when an advanced workflow needs them.
- Do not hide popup structure behind a `Content` convenience wrapper.
- Preserve Ark `Color` objects and callback detail shapes.
- Keep `HiddenInput` explicit so consumers decide when the picker participates in forms.

## Local changelog

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.
- 2026-07-02: Removed mirrored Ark context hooks and type re-exports from `moduix`; keep `RootProvider`, visual parts, `parseColor`, and portal/icon sugar as the supported wrapper surface.
- 2026-07-08: Made `Trigger` render the current swatch by default, documented `data-fit-content` for compact button compositions, and simplified the recommended field recipe to one channel input plus trigger.

- 2026-06-18: Added the Ark UI Color Picker wrapper with styled parts, default eyedropper and swatch
  indicator icons, stories, local documentation, and registry/docs integration.
- 2026-06-18: Changed popup content sizing to default to `16rem` instead of the trigger
  `--reference-width`, matching Ark's color picker composition expectations.
- 2026-06-18: Expanded public docs to cover the full Ark example set, added required preview
  `Code`/`Styles`/`Data` tabs, and re-exported Ark part prop types.
- 2026-06-24: Replaced ad hoc fractional CSS fallbacks with existing spacing/border tokens,
  fixed native form examples to pass `name`, and corrected the RootProvider docs snippet.