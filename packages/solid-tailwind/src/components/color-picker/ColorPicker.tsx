import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/solid/color-picker';
import { children, type ComponentProps, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronDownIcon, PipetteIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type ColorPickerRootProps = ComponentProps<typeof ColorPickerPrimitive.Root> & OverlayPortalProps;
type ColorPickerRootProviderProps = ComponentProps<typeof ColorPickerPrimitive.RootProvider> &
  OverlayPortalProps;

// Ark paints swatches with an inline background color; ::before repaints it over a checkerboard.
const colorPickerSwatchClass =
  'relative isolate grid size-control-sm shrink-0 place-items-center rounded-sm before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] before:[background:linear-gradient(var(--color),var(--color)),repeating-conic-gradient(var(--color-muted)_0_25%,var(--color-background)_0_50%)_0_0/0.5rem_0.5rem]';

const colorPickerRootClass =
  'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100';

function ColorPicker(props: ColorPickerRootProps) {
  const [local, others] = splitProps(props, [
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <ColorPickerPrimitive.Root
        class={cn(colorPickerRootClass, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="color-picker-root"
      />
    </OverlayPortalProvider>
  );
}

function ColorPickerRootProvider(props: ColorPickerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <ColorPickerPrimitive.RootProvider
        class={cn(colorPickerRootClass, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="color-picker-root-provider"
      />
    </OverlayPortalProvider>
  );
}

function ColorPickerLabel(props: ComponentProps<typeof ColorPickerPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Label
      class={cn('inline-flex items-center text-sm font-medium select-none', local.class)}
      {...others}
      data-slot="color-picker-label"
    />
  );
}

function ColorPickerControl(props: ComponentProps<typeof ColorPickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Control
      class={cn('flex min-w-0 items-center gap-2', local.class)}
      {...others}
      data-slot="color-picker-control"
    />
  );
}

function ColorPickerTrigger(props: ComponentProps<typeof ColorPickerPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.Trigger
      class={cn(
        'box-border grid size-control-md shrink-0 cursor-pointer place-items-center overflow-hidden rounded-md border border-border bg-background p-1 text-sm outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-normal ease-in-out select-none focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[fit-content]:inline-flex data-[fit-content]:w-auto data-[fit-content]:min-w-control-md data-[fit-content]:gap-2 data-[fit-content]:px-3 data-[state=open]:border-ring data-[state=open]:outline-ring [&>[data-slot=color-picker-value-swatch]]:size-full [&>[data-slot=color-picker-value-swatch]]:rounded-[inherit] [&>[data-slot=color-picker-value-swatch]]:[grid-area:1/1/2/2] data-[fit-content]:[&>[data-slot=color-picker-value-swatch]]:size-4 data-[fit-content]:[&>[data-slot=color-picker-value-swatch]]:rounded-sm',
        local.class,
      )}
      {...others}
      data-slot="color-picker-trigger"
    >
      {resolvedChildren() ?? <ColorPickerValueSwatch />}
    </ColorPickerPrimitive.Trigger>
  );
}

function ColorPickerPositioner(props: ComponentProps<typeof ColorPickerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <ColorPickerPrimitive.Positioner
        class={cn('z-[var(--z-index)] outline-0', local.class)}
        {...others}
        data-slot="color-picker-positioner"
      />
    </OverlayPortal>
  );
}

function ColorPickerContent(props: ComponentProps<typeof ColorPickerPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Content
      class={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border flex max-h-[min(32rem,var(--available-height))] w-64 max-w-[var(--available-width)] origin-[var(--transform-origin)] flex-col gap-3 overflow-auto overscroll-contain rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-popup-out data-[state=open]:animate-moduix-popup-in motion-reduce:data-[state]:animate-none',
        local.class,
      )}
      {...others}
      data-slot="color-picker-content"
    />
  );
}

function ColorPickerArea(props: ComponentProps<typeof ColorPickerPrimitive.Area>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.Area
      class={cn(
        'box-border h-40 w-full overflow-hidden rounded-md shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] select-none',
        local.class,
      )}
      {...others}
      data-slot="color-picker-area"
    >
      {resolvedChildren() ?? (
        <>
          <ColorPickerAreaBackground />
          <ColorPickerAreaThumb />
        </>
      )}
    </ColorPickerPrimitive.Area>
  );
}

function ColorPickerAreaBackground(
  props: ComponentProps<typeof ColorPickerPrimitive.AreaBackground>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.AreaBackground
      class={cn('size-full rounded-[inherit]', local.class)}
      {...others}
      data-slot="color-picker-area-background"
    />
  );
}

function ColorPickerAreaThumb(props: ComponentProps<typeof ColorPickerPrimitive.AreaThumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.AreaThumb
      class={cn(
        'box-border size-4 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,black_18%,transparent),var(--moduix-shadow-sm)] ring-2 ring-background outline-0 focus-visible:shadow-[0_0_0_4px_var(--color-ring),var(--moduix-shadow-sm)]',
        local.class,
      )}
      {...others}
      data-slot="color-picker-area-thumb"
    />
  );
}

function ColorPickerChannelSlider(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSlider>,
) {
  const [local, others] = splitProps(props, ['channel', 'children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.ChannelSlider
      channel={local.channel}
      class={cn(
        'box-border flex h-3 items-center rounded-full select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-3 data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-center',
        local.class,
      )}
      {...others}
      data-slot="color-picker-channel-slider"
    >
      {resolvedChildren() ?? (
        <>
          {local.channel === 'alpha' && <ColorPickerTransparencyGrid />}
          <ColorPickerChannelSliderTrack />
          <ColorPickerChannelSliderThumb />
        </>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  );
}

function ColorPickerSliders(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <div
      class={cn('flex min-w-0 flex-1 flex-col gap-2', local.class)}
      {...others}
      data-slot="color-picker-sliders"
    >
      <ColorPickerChannelSlider channel="hue" />
      <ColorPickerChannelSlider channel="alpha" />
    </div>
  );
}

function ColorPickerChannelSliderTrack(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderTrack>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderTrack
      class={cn(
        'size-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]',
        local.class,
      )}
      {...others}
      data-slot="color-picker-channel-slider-track"
    />
  );
}

function ColorPickerChannelSliderThumb(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderThumb>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderThumb
      class={cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_0_4px_color-mix(in_oklab,black_18%,transparent),var(--moduix-shadow-sm)] ring-2 ring-background outline-0 focus-visible:shadow-[0_0_0_4px_var(--color-ring),var(--moduix-shadow-sm)]',
        local.class,
      )}
      {...others}
      data-slot="color-picker-channel-slider-thumb"
    />
  );
}

function ColorPickerChannelSliderLabel(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderLabel>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderLabel
      class={cn('text-sm font-medium', local.class)}
      {...others}
      data-slot="color-picker-channel-slider-label"
    />
  );
}

function ColorPickerChannelSliderValueText(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderValueText>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderValueText
      class={cn('min-w-0 text-sm text-muted-foreground', local.class)}
      {...others}
      data-slot="color-picker-channel-slider-value-text"
    />
  );
}

function ColorPickerChannelInput(props: ComponentProps<typeof ColorPickerPrimitive.ChannelInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelInput
      class={cn(
        'box-border h-control-md w-full min-w-0 flex-1 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[channel=alpha]:w-16 data-[channel=alpha]:flex-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
        local.class,
      )}
      {...others}
      data-slot="color-picker-channel-input"
    />
  );
}

function ColorPickerEyeDropperTrigger(
  props: ComponentProps<typeof ColorPickerPrimitive.EyeDropperTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.EyeDropperTrigger
      class={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-normal ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-readonly:cursor-default [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:text-foreground',
        local.class,
      )}
      {...others}
      data-slot="color-picker-eye-dropper-trigger"
    >
      {resolvedChildren() ?? <PipetteIcon />}
    </ColorPickerPrimitive.EyeDropperTrigger>
  );
}

function ColorPickerFormatSelect(props: ComponentProps<typeof ColorPickerPrimitive.FormatSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <span class="relative inline-grid w-fit max-w-full min-w-0 shrink-0">
      <ColorPickerPrimitive.FormatSelect
        class={cn(
          'peer/format-select box-border h-control-md w-auto min-w-0 cursor-pointer appearance-none rounded-md border border-border bg-background px-3 pe-8 text-sm text-foreground uppercase outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3',
          local.class,
        )}
        {...others}
        data-slot="color-picker-format-select"
      />
      <span
        aria-hidden="true"
        class="pointer-events-none absolute end-3 top-1/2 inline-flex size-4 -translate-y-1/2 rounded-sm text-muted-foreground transition-[background-color,color] duration-normal ease-in-out forced-colors:hidden [&>svg]:size-full [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:bg-muted [@media(hover:hover)]:peer-[:not(:disabled):hover]/format-select:text-foreground"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
}

function ColorPickerFormatTrigger(
  props: ComponentProps<typeof ColorPickerPrimitive.FormatTrigger>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.FormatTrigger
      class={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-normal ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-readonly:cursor-default [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:bg-muted [@media(hover:hover)]:[&:not(:disabled):not([data-readonly]):hover]:text-foreground',
        local.class,
      )}
      {...others}
      data-slot="color-picker-format-trigger"
    />
  );
}

function ColorPickerSwatchGroup(props: ComponentProps<typeof ColorPickerPrimitive.SwatchGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.SwatchGroup
      class={cn('flex flex-wrap gap-2', local.class)}
      {...others}
      data-slot="color-picker-swatch-group"
    />
  );
}

function ColorPickerSwatchTrigger(
  props: ComponentProps<typeof ColorPickerPrimitive.SwatchTrigger>,
) {
  const [local, others] = splitProps(props, ['children', 'class', 'value']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.SwatchTrigger
      class={cn(
        'inline-flex cursor-pointer rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50 [:is([data-slot=color-picker-root],[data-slot=color-picker-root-provider])[data-disabled]_&]:opacity-100',
        local.class,
      )}
      value={local.value}
      {...others}
      data-slot="color-picker-swatch-trigger"
    >
      {resolvedChildren() ?? (
        <ColorPickerSwatch value={local.value}>
          <ColorPickerSwatchIndicator />
        </ColorPickerSwatch>
      )}
    </ColorPickerPrimitive.SwatchTrigger>
  );
}

function ColorPickerSwatch(props: ComponentProps<typeof ColorPickerPrimitive.Swatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Swatch
      class={cn(colorPickerSwatchClass, local.class)}
      {...others}
      data-slot="color-picker-swatch"
    />
  );
}

function ColorPickerSwatchIndicator(
  props: ComponentProps<typeof ColorPickerPrimitive.SwatchIndicator>,
) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.SwatchIndicator
      class={cn(
        'inline-flex text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] [&>svg]:size-4 [&[hidden]]:hidden',
        local.class,
      )}
      {...others}
      data-slot="color-picker-swatch-indicator"
    >
      {resolvedChildren() ?? <CheckIcon />}
    </ColorPickerPrimitive.SwatchIndicator>
  );
}

function ColorPickerTransparencyGrid(
  props: ComponentProps<typeof ColorPickerPrimitive.TransparencyGrid>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.TransparencyGrid
      class={cn('size-full rounded-[inherit] [grid-area:1/1/2/2]', local.class)}
      {...others}
      data-slot="color-picker-transparency-grid"
    />
  );
}

function ColorPickerValueSwatch(props: ComponentProps<typeof ColorPickerPrimitive.ValueSwatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueSwatch
      class={cn(colorPickerSwatchClass, local.class)}
      {...others}
      data-slot="color-picker-value-swatch"
    />
  );
}

function ColorPickerValueText(props: ComponentProps<typeof ColorPickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueText
      class={cn('min-w-0 text-sm', local.class)}
      {...others}
      data-slot="color-picker-value-text"
    />
  );
}

function ColorPickerView(props: ComponentProps<typeof ColorPickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.View
      class={cn(
        'flex min-w-0 flex-col gap-2 [&[hidden]:not([hidden="until-found"])]:hidden',
        local.class,
      )}
      {...others}
      data-slot="color-picker-view"
    />
  );
}

const ColorPickerContext = ColorPickerPrimitive.Context;
const ColorPickerHiddenInput = ColorPickerPrimitive.HiddenInput;

export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaBackground,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerChannelSlider,
  ColorPickerChannelSliderLabel,
  ColorPickerChannelSliderThumb,
  ColorPickerChannelSliderTrack,
  ColorPickerChannelSliderValueText,
  ColorPickerContext,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropperTrigger,
  ColorPickerFormatSelect,
  ColorPickerFormatTrigger,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerPositioner,
  ColorPickerRootProvider,
  ColorPickerSliders,
  ColorPickerSwatch,
  ColorPickerSwatchGroup,
  ColorPickerSwatchIndicator,
  ColorPickerSwatchTrigger,
  ColorPickerTransparencyGrid,
  ColorPickerTrigger,
  ColorPickerValueSwatch,
  ColorPickerValueText,
  ColorPickerView,
  parseColor,
  useColorPicker,
  useColorPickerContext,
};

export type { ColorPickerRootProps, ColorPickerRootProviderProps };

export type {
  Color,
  ColorPickerAreaBackgroundBaseProps,
  ColorPickerAreaBackgroundProps,
  ColorPickerAreaBaseProps,
  ColorPickerAreaProps,
  ColorPickerAreaThumbBaseProps,
  ColorPickerAreaThumbProps,
  ColorPickerChannelInputBaseProps,
  ColorPickerChannelInputProps,
  ColorPickerChannelSliderBaseProps,
  ColorPickerChannelSliderLabelBaseProps,
  ColorPickerChannelSliderLabelProps,
  ColorPickerChannelSliderProps,
  ColorPickerChannelSliderThumbBaseProps,
  ColorPickerChannelSliderThumbProps,
  ColorPickerChannelSliderTrackBaseProps,
  ColorPickerChannelSliderTrackProps,
  ColorPickerChannelSliderValueTextBaseProps,
  ColorPickerChannelSliderValueTextProps,
  ColorPickerColorFormat,
  ColorPickerContentBaseProps,
  ColorPickerContentProps,
  ColorPickerContextProps,
  ColorPickerControlBaseProps,
  ColorPickerControlProps,
  ColorPickerEyeDropperTriggerBaseProps,
  ColorPickerEyeDropperTriggerProps,
  ColorPickerFocusOutsideEvent,
  ColorPickerFormatChangeDetails,
  ColorPickerFormatSelectBaseProps,
  ColorPickerFormatSelectProps,
  ColorPickerFormatTriggerBaseProps,
  ColorPickerFormatTriggerProps,
  ColorPickerInteractOutsideEvent,
  ColorPickerLabelBaseProps,
  ColorPickerLabelProps,
  ColorPickerOpenChangeDetails,
  ColorPickerPointerDownOutsideEvent,
  ColorPickerPositionerBaseProps,
  ColorPickerPositionerProps,
  ColorPickerRootProviderBaseProps,
  ColorPickerSwatchBaseProps,
  ColorPickerSwatchGroupBaseProps,
  ColorPickerSwatchGroupProps,
  ColorPickerSwatchIndicatorBaseProps,
  ColorPickerSwatchIndicatorProps,
  ColorPickerSwatchProps,
  ColorPickerSwatchTriggerBaseProps,
  ColorPickerSwatchTriggerProps,
  ColorPickerTransparencyGridBaseProps,
  ColorPickerTransparencyGridProps,
  ColorPickerTriggerBaseProps,
  ColorPickerTriggerProps,
  ColorPickerValueChangeDetails,
  ColorPickerValueSwatchBaseProps,
  ColorPickerValueSwatchProps,
  ColorPickerValueTextBaseProps,
  ColorPickerValueTextProps,
  ColorPickerViewBaseProps,
  ColorPickerViewProps,
  UseColorPickerContext,
  UseColorPickerProps,
  UseColorPickerReturn,
} from '@ark-ui/solid/color-picker';