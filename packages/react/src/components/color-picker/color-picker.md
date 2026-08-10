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
- `ColorPicker` and `RootProvider` render the native form input internally for native form integration.

## Current behavior contract

`ColorPicker` and `RootProvider` portal `Positioner` automatically by default. Set `portalled={false}` to render it inline, or pass `portalRef` to target a custom container. The structural parts remain explicit and independently styleable.

- Public composition is `ColorPicker`, `RootProvider`, `Label`, `Control`, `Trigger`,
  `Positioner`, `Content`, `Area`, `AreaBackground`, `AreaThumb`, channel slider parts,
  `Sliders`, `ChannelInput`, `EyeDropperTrigger`, format parts, swatch parts, `TransparencyGrid`,
  `ValueSwatch`, `ValueText`, and `View`.
- `ColorPicker` and `RootProvider` append the native form input automatically; it is not a public moduix
  part.
- `parseColor`, `useColorPicker`, and `useColorPickerContext` are re-exported for common
  string-to-`Color` and advanced state workflows.
- `Trigger` renders the current value swatch by default when children are omitted.
- `Area`, `ChannelSlider`, and `SwatchTrigger` render their common visual children by default when
  children are omitted.
- `EyeDropperTrigger` and `SwatchIndicator` provide default moduix icons when children are omitted.
- `onValueChange`, `onValueChangeEnd`, `onFormatChange`, and `onOpenChange` preserve Ark detail
  objects without remapping.

## Anatomy and exported parts

```text
ColorPicker
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
└─ native input (automatic)
```

All styled DOM parts expose matching kebab-case `data-slot` hooks. `RootProvider` accepts a state
object from Ark `useColorPicker`.

## Composition

```tsx
import { ColorPicker, parseColor } from '@moduix/react/color-picker';

export function ColorPickerExample() {
  return (
    <ColorPicker defaultValue={parseColor('#eb5e41')}>
      <ColorPicker.Label>Color</ColorPicker.Label>
      <ColorPicker.Control>
        <ColorPicker.ChannelInput channel="hex" />
        <ColorPicker.Trigger aria-label="Open color picker" />
      </ColorPicker.Control>
      <ColorPicker.Positioner>
        <ColorPicker.Content>
          <ColorPicker.Area />
          <ColorPicker.Sliders />
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </ColorPicker>
  );
}
```

## Upstream feature coverage

- Basic popup composition with `Control`, `Trigger`, `Positioner`, and `Content`.
- Controlled state through `value`, `format`, `open`, and Ark detail callbacks.
- Inline mode through `inline` on `ColorPicker`, where `Area`, sliders, inputs, and swatches can render
  directly inside the root.
- Form usage through `name` on `ColorPicker`; the native form input is automatic and stays in sync
  with native submission and reset.
- Field integration through Ark `Field.Root` context for disabled, invalid, required, and read-only
  state.
- Provider state through moduix `useColorPicker` plus `RootProvider`.
- Swatch-only, popup swatches, slider-only, input-only, value-swatch, eyedropper, inside-dialog,
  and format-view compositions.
- Public docs intentionally cover all Ark React examples for this primitive plus moduix styling
  sugar, with `Code`, `Styles`, and `Data` tabs on every preview.

## Accessibility and state

- Ark owns color area, slider, input, popover, focus, keyboard, outside interaction, and ARIA
  behavior.
- The root always renders the native form input. `name` and related root props configure form
  submission and reset synchronization.
- Important hooks include `data-state`, `data-focus`, `data-invalid`, `data-disabled`,
  `data-readonly`, `data-required`, `data-channel`, `data-orientation`, `data-value`,
  `data-placement`, and `data-side`.
- Runtime variables include `--value`, `--color`, `--reference-width`, `--available-width`,
  `--available-height`, `--transform-origin`, `--z-index`, `--layer-index`, and transparency grid
  `--size`.
- All Ark DOM parts preserve `asChild`.

## Defaults and styling

The square trigger, channel inputs, format select, and adjacent action triggers share `--moduix-size-md`; color swatches use `--moduix-size-sm`.

- Content motion falls back to the shared `--moduix-popup-motion-*` tokens. `--moduix-color-picker-transition`
  and closed-state variables remain the more specific override.
- `Positioner` preserves Ark `--z-index`, and `Content` adds `--layer-index` to the moduix popup
  layer so nested pickers remain above their parent overlay.
- moduix applies field, popup, color area, slider, swatch, focus ring, shadow, and motion defaults.
- `--moduix-color-picker-swatch-indicator-shadow` exposes the contrast shadow behind the selected-swatch
  glyph; its default remains a compact `drop-shadow(...)` because it follows the swatch color rather
  than the rectangular surface shadow scale.
- `className` is accepted on every visual part.
- `Content` defaults to `16rem` wide and uses Ark `--available-height` and `--transform-origin`;
  do not default it to `--reference-width`, because the trigger swatch is intentionally narrow.
- `Trigger` supports `data-fit-content` for content-sized button compositions with custom children.
- `AreaThumb`, `ChannelSliderThumb`, `Swatch`, `SwatchTrigger`, and `ValueSwatch` preserve Ark
  color variables such as `--color`.
- When `prefers-reduced-motion` is enabled, popup entry and exit animations use a 1ms duration so
  Ark can complete its exit lifecycle without visible motion.

### Public CSS variables

The public documentation provides the defaults and descriptions for this exact contract. Keep its
`colorPickerOverrideCssProperties` list synchronized with the variables below.

- Root, controls, and shared states: `--moduix-color-picker-width`,
  `--moduix-color-picker-max-width`, `--moduix-color-picker-root-gap`,
  `--moduix-color-picker-color`, `--moduix-color-picker-disabled-opacity`,
  `--moduix-color-picker-label-color`, `--moduix-color-picker-label-font-size`,
  `--moduix-color-picker-label-font-weight`, `--moduix-color-picker-label-line-height`,
  `--moduix-color-picker-control-gap`, `--moduix-color-picker-trigger-size`,
  `--moduix-color-picker-border-width`, `--moduix-color-picker-border-color`,
  `--moduix-color-picker-radius`, `--moduix-color-picker-trigger-padding`,
  `--moduix-color-picker-control-bg`, `--moduix-color-picker-focus-ring-width`,
  `--moduix-color-picker-transition`, `--moduix-color-picker-focus-ring-color`,
  `--moduix-color-picker-invalid-color`, and `--moduix-color-picker-icon-size`.
- Popup, motion, and compact triggers: `--moduix-color-picker-content-closed-opacity`,
  `--moduix-color-picker-content-closed-scale`,
  `--moduix-color-picker-trigger-fit-content-padding-x`,
  `--moduix-color-picker-trigger-fit-content-gap`,
  `--moduix-color-picker-trigger-fit-content-swatch-size`,
  `--moduix-color-picker-content-width`, `--moduix-color-picker-content-max-height`,
  `--moduix-color-picker-content-gap`, `--moduix-color-picker-content-border-width`,
  `--moduix-color-picker-content-border-color`, `--moduix-color-picker-content-radius`,
  `--moduix-color-picker-content-padding`, `--moduix-color-picker-content-bg`,
  `--moduix-color-picker-content-shadow`, and `--moduix-color-picker-content-color`.
- Color area and thumbs: `--moduix-color-picker-area-height`,
  `--moduix-color-picker-area-radius`, `--moduix-color-picker-area-border-width`,
  `--moduix-color-picker-area-border-color`, `--moduix-color-picker-thumb-size`,
  `--moduix-color-picker-thumb-radius`, `--moduix-color-picker-thumb-bg`,
  `--moduix-color-picker-thumb-inner-ring-width`,
  `--moduix-color-picker-thumb-inner-ring-color`,
  `--moduix-color-picker-thumb-outer-ring-width`,
  `--moduix-color-picker-thumb-outer-ring-color`, `--moduix-color-picker-thumb-shadow`, and
  `--moduix-color-picker-thumb-focus-ring-width`.
- Channel sliders: `--moduix-color-picker-channel-slider-height`,
  `--moduix-color-picker-channel-slider-radius`,
  `--moduix-color-picker-channel-slider-vertical-height`, `--moduix-color-picker-sliders-gap`,
  `--moduix-color-picker-channel-slider-track-size`,
  `--moduix-color-picker-channel-slider-border-width`,
  `--moduix-color-picker-channel-slider-border-color`,
  `--moduix-color-picker-channel-slider-label-color`,
  `--moduix-color-picker-channel-slider-label-font-size`,
  `--moduix-color-picker-channel-slider-label-font-weight`,
  `--moduix-color-picker-channel-slider-label-line-height`,
  `--moduix-color-picker-channel-slider-value-color`,
  `--moduix-color-picker-channel-slider-value-font-size`, and
  `--moduix-color-picker-channel-slider-value-line-height`.
- Inputs and actions: `--moduix-color-picker-input-height`,
  `--moduix-color-picker-input-padding-x`, `--moduix-color-picker-input-font-size`,
  `--moduix-color-picker-input-line-height`, `--moduix-color-picker-alpha-input-width`,
  `--moduix-color-picker-action-size`, `--moduix-color-picker-action-gap`,
  `--moduix-color-picker-action-padding-x`, `--moduix-color-picker-action-bg`,
  `--moduix-color-picker-action-color`, `--moduix-color-picker-action-font-size`,
  `--moduix-color-picker-action-line-height`, `--moduix-color-picker-action-bg-hover`, and
  `--moduix-color-picker-action-color-hover`.
- Swatches and value display: `--moduix-color-picker-swatch-gap`,
  `--moduix-color-picker-swatch-radius`, `--moduix-color-picker-swatch-size`,
  `--moduix-color-picker-swatch-border-width`, `--moduix-color-picker-swatch-border-color`,
  `--moduix-color-picker-swatch-indicator-color`,
  `--moduix-color-picker-swatch-indicator-shadow`,
  `--moduix-color-picker-swatch-indicator-size`, `--moduix-color-picker-value-text-color`,
  `--moduix-color-picker-value-text-font-size`,
  `--moduix-color-picker-value-text-line-height`, and `--moduix-color-picker-view-gap`.

## Intentional sugar and differences from upstream

- moduix ships default icons for `EyeDropperTrigger` and `SwatchIndicator`.
- moduix renders `TransparencyGrid` and `ValueSwatch` inside `Trigger` when children are omitted.
- moduix renders `AreaBackground` and `AreaThumb` inside `Area` when children are omitted.
- moduix renders `ChannelSliderTrack`, `ChannelSliderThumb`, and an alpha `TransparencyGrid` inside
  `ChannelSlider` when children are omitted.
- moduix renders the standard hue and alpha pair in `Sliders`; style each channel through
  `data-channel` and CSS variables, or use the lower-level parts for custom structure.
- moduix renders `Swatch` and `SwatchIndicator` inside `SwatchTrigger` when children are omitted.
- moduix re-exports `parseColor`, `useColorPicker`, and `useColorPickerContext`.
- Ark type exports stay upstream-only as escape hatches.
- The wrapper hides only portal transport and repetitive visual children; `Positioner`, `Content`,
  and the input/view structure remain explicit.
- No local color parsing, value conversion, or callback reshaping is added.

## Agent notes

- Do not render both `Root` and `RootProvider` for the same state instance.
- Prefer moduix `useColorPicker` and `useColorPickerContext` for normal advanced workflows; import
  Ark-only type helpers directly only when needed.
- Do not hide popup structure behind a `Content` convenience wrapper.
- Preserve Ark `Color` objects and callback detail shapes.
- Form participation is controlled through root props; the root renders the native form input
  automatically.
- Upstream review, 2026-08-10: Ark's
  [`Color Picker`](https://ark-ui.com/docs/components/color-picker) defines the preserved behavior
  and lifecycle; [Chakra's Color Picker](https://chakra-ui.com/docs/components/color-picker)
  confirms the part anatomy and styled composition; [shadcn/ui](https://ui.shadcn.com/llms.txt)
  does not ship a Color Picker, so moduix intentionally retains an explicit Ark-shaped composition
  instead of presenting a pseudo-native color input.

## Mount lifecycle

The portalled overlay content defaults to `lazyMount` and `unmountOnExit`. It is absent from the
DOM until first open and is removed after its exit animation. Set `unmountOnExit={false}` to retain
content after the first open; set both props to `false` only when eager initial rendering is needed.

## Local changelog

- 2026-08-10: Added motion-safe popup transitions, documented the complete public CSS-variable
  contract, and covered `asChild`, refs, and native form reset behavior.

- 2026-08-01: Defaulted portalled overlay presence to lazy mounting and unmounting after exit.

- 2026-07-26: Preserved Ark popup stacking through `--z-index` and `--layer-index`, added focused
  form and interaction regressions, and clarified native form and presence documentation.

- 2026-07-21: Routed shared dimensions, spacing, icon geometry, and focus-ring fallbacks through foundation tokens so density and theme presets can retune the component consistently.
- 2026-07-21: Aligned the square trigger, channel controls, and actions to `--moduix-size-md`; swatches now use `--moduix-size-sm`.

- 2026-07-16: Added shared `--moduix-popup-motion-*` fallbacks for project-wide popup content motion.
- 2026-07-13: Native form controls are now rendered automatically; the former public form-control part was removed.

- 2026-07-10: Added `Sliders` and moduix state-hook re-exports; recommended them in docs.

- 2026-07-01: Made overlay portalling automatic by default, added `portalled` and `portalRef`, and removed explicit `Portal` wrappers from recommended composition.
- 2026-07-02: Removed mirrored Ark context hooks and type re-exports from `moduix`; keep `RootProvider`, visual parts, `parseColor`, and portal/icon sugar as the supported wrapper surface.
- 2026-07-08: Made `Trigger` render the current swatch by default, documented `data-fit-content` for compact button compositions, and simplified the recommended field recipe to one channel input plus trigger.
- 2026-07-08: Added default children for `Area`, `ChannelSlider`, and `SwatchTrigger` so common
  examples stay short while custom children still expose the full Ark anatomy.

- 2026-06-18: Added the Ark UI Color Picker wrapper with styled parts, default eyedropper and swatch
  indicator icons, stories, local documentation, and registry/docs integration.
- 2026-06-18: Changed popup content sizing to default to `16rem` instead of the trigger
  `--reference-width`, matching Ark's color picker composition expectations.
- 2026-06-18: Expanded public docs to cover the full Ark example set, added required preview
  `Code`/`Styles`/`Data` tabs, and re-exported Ark part prop types.
- 2026-06-24: Replaced ad hoc fractional CSS fallbacks with existing spacing/border tokens,
  fixed native form examples to pass `name`, and corrected the RootProvider docs snippet.