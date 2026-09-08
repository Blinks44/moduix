import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/solid/color-picker';
import { children, type ComponentProps, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, ChevronDownIcon, PipetteIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';

type ColorPickerRootProps = ComponentProps<typeof ColorPickerPrimitive.Root> & OverlayPortalProps;
type ColorPickerRootProviderProps = ComponentProps<typeof ColorPickerPrimitive.RootProvider> &
  OverlayPortalProps;

function ColorPickerRoot(props: ColorPickerRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <ColorPickerPrimitive.Root
        asChild={local.asChild}
        data-slot="color-picker-root"
        class={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
          local.class,
        )}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </ColorPickerPrimitive.Root>
    </OverlayPortalProvider>
  );
}

function ColorPickerRootProvider(props: ColorPickerRootProviderProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'lazyMount',
    'portalled',
    'portalRef',
    'unmountOnExit',
  ]);

  return (
    <OverlayPortalProvider portalled={local.portalled} portalRef={local.portalRef}>
      <ColorPickerPrimitive.RootProvider
        asChild={local.asChild}
        data-slot="color-picker-root-provider"
        class={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
          local.class,
        )}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
      </ColorPickerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function ColorPickerLabel(props: ComponentProps<typeof ColorPickerPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Label
      data-slot="color-picker-label"
      class={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerControl(props: ComponentProps<typeof ColorPickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Control
      data-slot="color-picker-control"
      class={cn('flex min-w-0 items-center gap-2 data-disabled:opacity-50', local.class)}
      {...others}
    />
  );
}

function ColorPickerTrigger(props: ComponentProps<typeof ColorPickerPrimitive.Trigger>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.Trigger
      data-slot="color-picker-trigger"
      class={cn(
        'group/trigger box-border grid size-control-md shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background p-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out select-none focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[fit-content]:inline-flex data-[fit-content]:w-auto data-[fit-content]:min-w-control-md data-[fit-content]:gap-2 data-[fit-content]:px-3 data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          <ColorPickerPrimitive.TransparencyGrid
            data-slot="color-picker-transparency-grid"
            class="col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
          />
          <ColorPickerPrimitive.ValueSwatch
            data-slot="color-picker-value-swatch"
            class="z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
          />
        </>
      )}
    </ColorPickerPrimitive.Trigger>
  );
}

function ColorPickerPositioner(props: ComponentProps<typeof ColorPickerPrimitive.Positioner>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <OverlayPortal>
      <ColorPickerPrimitive.Positioner
        data-slot="color-picker-positioner"
        class={cn('z-[var(--z-index)] outline-0', local.class)}
        {...others}
      />
    </OverlayPortal>
  );
}

function ColorPickerContent(props: ComponentProps<typeof ColorPickerPrimitive.Content>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Content
      data-slot="color-picker-content"
      class={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border flex max-h-[min(32rem,var(--available-height))] w-64 max-w-[var(--available-width)] origin-[var(--transform-origin)] flex-col gap-3 overflow-auto overscroll-contain rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerArea(props: ComponentProps<typeof ColorPickerPrimitive.Area>) {
  const [local, others] = splitProps(props, ['children', 'class']);
  const resolvedChildren = children(() => local.children);

  return (
    <ColorPickerPrimitive.Area
      data-slot="color-picker-area"
      class={cn(
        'relative box-border h-40 w-full touch-none overflow-hidden rounded-md shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] select-none data-disabled:cursor-default data-readonly:cursor-default',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          <ColorPickerPrimitive.AreaBackground
            data-slot="color-picker-area-background"
            class="size-full rounded-[inherit]"
          />
          <ColorPickerPrimitive.AreaThumb
            data-slot="color-picker-area-thumb"
            class="box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none"
          />
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
      data-slot="color-picker-area-background"
      class={cn('size-full rounded-[inherit]', local.class)}
      {...others}
    />
  );
}

function ColorPickerAreaThumb(props: ComponentProps<typeof ColorPickerPrimitive.AreaThumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.AreaThumb
      data-slot="color-picker-area-thumb"
      class={cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none',
        local.class,
      )}
      {...others}
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
      data-slot="color-picker-channel-slider"
      class={cn(
        'relative box-border flex h-3 touch-none items-center rounded-full select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-3 data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-center',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          {local.channel === 'alpha' && (
            <ColorPickerPrimitive.TransparencyGrid
              data-slot="color-picker-transparency-grid"
              class="size-full rounded-[inherit]"
            />
          )}
          <ColorPickerPrimitive.ChannelSliderTrack
            data-slot="color-picker-channel-slider-track"
            class="h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
          />
          <ColorPickerPrimitive.ChannelSliderThumb
            data-slot="color-picker-channel-slider-thumb"
            class="box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none"
          />
        </>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  );
}

function ColorPickerSliders(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <div
      data-slot="color-picker-sliders"
      class={cn('flex min-w-0 flex-1 flex-col gap-2', local.class)}
      {...others}
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
      data-slot="color-picker-channel-slider-track"
      class={cn(
        'h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerChannelSliderThumb(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderThumb>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderThumb
      data-slot="color-picker-channel-slider-thumb"
      class={cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerChannelSliderLabel(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderLabel>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderLabel
      data-slot="color-picker-channel-slider-label"
      class={cn('text-sm font-medium text-foreground', local.class)}
      {...others}
    />
  );
}

function ColorPickerChannelSliderValueText(
  props: ComponentProps<typeof ColorPickerPrimitive.ChannelSliderValueText>,
) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelSliderValueText
      data-slot="color-picker-channel-slider-value-text"
      class={cn('text-sm text-muted-foreground', local.class)}
      {...others}
    />
  );
}

function ColorPickerChannelInput(props: ComponentProps<typeof ColorPickerPrimitive.ChannelInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelInput
      data-slot="color-picker-channel-input"
      class={cn(
        'box-border h-control-md w-full min-w-0 [appearance:textfield] rounded-md border border-border bg-background px-3 text-sm text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive data-[channel=alpha]:w-16 data-[channel=alpha]:flex-none motion-reduce:transition-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
        local.class,
      )}
      {...others}
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
      data-slot="color-picker-eye-dropper-trigger"
      class={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-focus:border-ring data-focus:outline-ring data-readonly:cursor-default motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:bg-muted [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:text-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...others}
    >
      {resolvedChildren() ?? <PipetteIcon />}
    </ColorPickerPrimitive.EyeDropperTrigger>
  );
}

function ColorPickerFormatSelect(props: ComponentProps<typeof ColorPickerPrimitive.FormatSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <span class="group/format-select relative inline-grid w-fit max-w-full min-w-0 shrink-0">
      <ColorPickerPrimitive.FormatSelect
        data-slot="color-picker-format-select"
        class={cn(
          'peer/format-select box-border h-control-md w-auto min-w-0 rounded-md border border-border bg-background px-3 pe-8 text-sm text-foreground uppercase outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-disabled:cursor-default data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3',
          local.class,
        )}
        {...others}
      />
      <span
        aria-hidden="true"
        class="pointer-events-none absolute top-1/2 right-3 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-disabled/format-select:opacity-50 peer-data-disabled/format-select:opacity-50 peer-[:not([disabled]):hover]/format-select:bg-muted peer-[:not([disabled]):hover]/format-select:text-foreground forced-colors:hidden [&>svg]:block [&>svg]:size-full"
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
      data-slot="color-picker-format-trigger"
      class={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-focus:border-ring data-focus:outline-ring data-readonly:cursor-default motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:bg-muted [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:text-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerSwatchGroup(props: ComponentProps<typeof ColorPickerPrimitive.SwatchGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.SwatchGroup
      data-slot="color-picker-swatch-group"
      class={cn('flex flex-wrap gap-2', local.class)}
      {...others}
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
      data-slot="color-picker-swatch-trigger"
      class={cn(
        'group/swatch inline-flex cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-disabled:opacity-50',
        local.class,
      )}
      value={local.value}
      {...others}
    >
      {resolvedChildren() ?? (
        <ColorPickerPrimitive.Swatch
          data-slot="color-picker-swatch"
          class="relative grid size-control-sm shrink-0 place-items-center overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]"
          value={local.value}
        >
          <ColorPickerPrimitive.SwatchIndicator
            data-slot="color-picker-swatch-indicator"
            class="pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] group-data-[state=checked]/swatch:inline-flex data-[state=checked]:inline-flex [&>svg]:size-4"
          >
            <CheckIcon />
          </ColorPickerPrimitive.SwatchIndicator>
        </ColorPickerPrimitive.Swatch>
      )}
    </ColorPickerPrimitive.SwatchTrigger>
  );
}

function ColorPickerSwatch(props: ComponentProps<typeof ColorPickerPrimitive.Swatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Swatch
      data-slot="color-picker-swatch"
      class={cn(
        'relative grid size-control-sm shrink-0 place-items-center overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]',
        local.class,
      )}
      {...others}
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
      data-slot="color-picker-swatch-indicator"
      class={cn(
        'pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] data-[state=checked]:inline-flex [&>svg]:size-4',
        local.class,
      )}
      {...others}
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
      data-slot="color-picker-transparency-grid"
      class={cn(
        'col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerValueSwatch(props: ComponentProps<typeof ColorPickerPrimitive.ValueSwatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueSwatch
      data-slot="color-picker-value-swatch"
      class={cn(
        'z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0',
        local.class,
      )}
      {...others}
    />
  );
}

function ColorPickerValueText(props: ComponentProps<typeof ColorPickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueText
      data-slot="color-picker-value-text"
      class={cn('min-w-0 text-sm text-foreground', local.class)}
      {...others}
    />
  );
}

function ColorPickerView(props: ComponentProps<typeof ColorPickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.View
      data-slot="color-picker-view"
      class={cn(
        'flex min-w-0 flex-col gap-2 [&[hidden]:not([hidden="until-found"])]:hidden',
        local.class,
      )}
      {...others}
    />
  );
}

const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  RootProvider: ColorPickerRootProvider,
  Context: ColorPickerPrimitive.Context,
  HiddenInput: ColorPickerPrimitive.HiddenInput,
  Label: ColorPickerLabel,
  Control: ColorPickerControl,
  Trigger: ColorPickerTrigger,
  Positioner: ColorPickerPositioner,
  Content: ColorPickerContent,
  Area: ColorPickerArea,
  AreaBackground: ColorPickerAreaBackground,
  AreaThumb: ColorPickerAreaThumb,
  ChannelSlider: ColorPickerChannelSlider,
  Sliders: ColorPickerSliders,
  ChannelSliderTrack: ColorPickerChannelSliderTrack,
  ChannelSliderThumb: ColorPickerChannelSliderThumb,
  ChannelSliderLabel: ColorPickerChannelSliderLabel,
  ChannelSliderValueText: ColorPickerChannelSliderValueText,
  ChannelInput: ColorPickerChannelInput,
  EyeDropperTrigger: ColorPickerEyeDropperTrigger,
  FormatSelect: ColorPickerFormatSelect,
  FormatTrigger: ColorPickerFormatTrigger,
  SwatchGroup: ColorPickerSwatchGroup,
  SwatchTrigger: ColorPickerSwatchTrigger,
  Swatch: ColorPickerSwatch,
  SwatchIndicator: ColorPickerSwatchIndicator,
  TransparencyGrid: ColorPickerTransparencyGrid,
  ValueSwatch: ColorPickerValueSwatch,
  ValueText: ColorPickerValueText,
  View: ColorPickerView,
});

export { ColorPicker, parseColor, useColorPicker, useColorPickerContext };