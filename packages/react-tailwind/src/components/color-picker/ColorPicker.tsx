'use client';

import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/react/color-picker';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
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

const ColorPickerRoot = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Root>,
  ColorPickerRootProps
>(function ColorPickerRoot(
  {
    asChild,
    children,
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ColorPickerPrimitive.Root
        ref={ref}
        asChild={asChild}
        className={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
          className,
        )}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="color-picker-root"
      >
        {children}
      </ColorPickerPrimitive.Root>
    </OverlayPortalProvider>
  );
});

const ColorPickerRootProvider = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.RootProvider>,
  ColorPickerRootProviderProps
>(function ColorPickerRootProvider(
  {
    asChild,
    children,
    className,
    lazyMount = true,
    portalled,
    portalRef,
    unmountOnExit = true,
    ...props
  },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ColorPickerPrimitive.RootProvider
        ref={ref}
        asChild={asChild}
        className={cn(
          'box-border flex w-64 max-w-full min-w-0 flex-col gap-2 text-foreground data-disabled:opacity-50',
          className,
        )}
        lazyMount={lazyMount}
        unmountOnExit={unmountOnExit}
        {...props}
        data-slot="color-picker-root-provider"
      >
        {children}
      </ColorPickerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
});

const ColorPickerLabel = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Label>,
  ComponentProps<typeof ColorPickerPrimitive.Label>
>(function ColorPickerLabel({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Label
      ref={ref}
      className={cn(
        'inline-flex items-center text-sm font-medium text-foreground select-none',
        className,
      )}
      {...props}
      data-slot="color-picker-label"
    />
  );
});

const ColorPickerControl = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Control>,
  ComponentProps<typeof ColorPickerPrimitive.Control>
>(function ColorPickerControl({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Control
      ref={ref}
      className={cn('flex min-w-0 items-center gap-2 data-disabled:opacity-50', className)}
      {...props}
      data-slot="color-picker-control"
    />
  );
});

const ColorPickerTrigger = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Trigger>,
  ComponentProps<typeof ColorPickerPrimitive.Trigger>
>(function ColorPickerTrigger({ className, children, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Trigger
      ref={ref}
      className={cn(
        'group/trigger box-border grid size-control-md shrink-0 place-items-center overflow-hidden rounded-md border border-border bg-background p-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out select-none focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-invalid:border-destructive data-invalid:outline-destructive data-readonly:cursor-default data-[fit-content]:inline-flex data-[fit-content]:w-auto data-[fit-content]:min-w-control-md data-[fit-content]:gap-2 data-[fit-content]:px-3 data-[state=open]:border-ring data-[state=open]:outline-ring motion-reduce:transition-none',
        className,
      )}
      {...props}
      data-slot="color-picker-trigger"
    >
      {children ?? (
        <>
          <ColorPickerPrimitive.TransparencyGrid
            data-slot="color-picker-transparency-grid"
            className="col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
          />
          <ColorPickerPrimitive.ValueSwatch
            data-slot="color-picker-value-swatch"
            className="z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0"
          />
        </>
      )}
    </ColorPickerPrimitive.Trigger>
  );
});

const ColorPickerPositioner = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Positioner>,
  ComponentProps<typeof ColorPickerPrimitive.Positioner>
>(function ColorPickerPositioner({ className, ...props }, ref) {
  return (
    <OverlayPortal>
      <ColorPickerPrimitive.Positioner
        ref={ref}
        className={cn('z-[var(--z-index)] outline-0', className)}
        {...props}
        data-slot="color-picker-positioner"
      />
    </OverlayPortal>
  );
});

const ColorPickerContent = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Content>,
  ComponentProps<typeof ColorPickerPrimitive.Content>
>(function ColorPickerContent({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Content
      ref={ref}
      className={cn(
        'z-[calc(var(--moduix-z-popup)+var(--layer-index,0))] box-border flex max-h-[min(32rem,var(--available-height))] w-64 max-w-[var(--available-width)] origin-[var(--transform-origin)] flex-col gap-3 overflow-auto overscroll-contain rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-0 data-[state=closed]:animate-moduix-menu-closed data-[state=open]:animate-moduix-menu-open motion-reduce:[animation-delay:0ms] motion-reduce:[animation-duration:1ms]',
        className,
      )}
      {...props}
      data-slot="color-picker-content"
    />
  );
});

const ColorPickerArea = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Area>,
  ComponentProps<typeof ColorPickerPrimitive.Area>
>(function ColorPickerArea({ className, children, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Area
      ref={ref}
      className={cn(
        'relative box-border h-40 w-full touch-none overflow-hidden rounded-md shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] select-none data-disabled:cursor-default data-readonly:cursor-default',
        className,
      )}
      {...props}
      data-slot="color-picker-area"
    >
      {children ?? (
        <>
          <ColorPickerPrimitive.AreaBackground
            data-slot="color-picker-area-background"
            className="size-full rounded-[inherit]"
          />
          <ColorPickerPrimitive.AreaThumb
            data-slot="color-picker-area-thumb"
            className="box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none"
          />
        </>
      )}
    </ColorPickerPrimitive.Area>
  );
});

const ColorPickerAreaBackground = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.AreaBackground>,
  ComponentProps<typeof ColorPickerPrimitive.AreaBackground>
>(function ColorPickerAreaBackground({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.AreaBackground
      ref={ref}
      className={cn('size-full rounded-[inherit]', className)}
      {...props}
      data-slot="color-picker-area-background"
    />
  );
});

const ColorPickerAreaThumb = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.AreaThumb>,
  ComponentProps<typeof ColorPickerPrimitive.AreaThumb>
>(function ColorPickerAreaThumb({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.AreaThumb
      ref={ref}
      className={cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none',
        className,
      )}
      {...props}
      data-slot="color-picker-area-thumb"
    />
  );
});

const ColorPickerChannelSlider = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelSlider>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelSlider>
>(function ColorPickerChannelSlider({ className, children, channel, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelSlider
      ref={ref}
      className={cn(
        'relative box-border flex h-3 touch-none items-center rounded-full select-none data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-3 data-[orientation=vertical]:items-stretch data-[orientation=vertical]:justify-center',
        className,
      )}
      channel={channel}
      {...props}
      data-slot="color-picker-channel-slider"
    >
      {children ?? (
        <>
          {channel === 'alpha' && (
            <ColorPickerPrimitive.TransparencyGrid
              data-slot="color-picker-transparency-grid"
              className="size-full rounded-[inherit]"
            />
          )}
          <ColorPickerPrimitive.ChannelSliderTrack
            data-slot="color-picker-channel-slider-track"
            className="h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3"
          />
          <ColorPickerPrimitive.ChannelSliderThumb
            data-slot="color-picker-channel-slider-thumb"
            className="box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none"
          />
        </>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  );
});

const ColorPickerSliders = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  function ColorPickerSliders({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex min-w-0 flex-1 flex-col gap-2', className)}
        {...props}
        data-slot="color-picker-sliders"
      >
        <ColorPickerChannelSlider channel="hue" />
        <ColorPickerChannelSlider channel="alpha" />
      </div>
    );
  },
);

const ColorPickerChannelSliderTrack = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelSliderTrack>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelSliderTrack>
>(function ColorPickerChannelSliderTrack({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelSliderTrack
      ref={ref}
      className={cn(
        'h-3 w-full rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)] data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3',
        className,
      )}
      {...props}
      data-slot="color-picker-channel-slider-track"
    />
  );
});

const ColorPickerChannelSliderThumb = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelSliderThumb>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelSliderThumb>
>(function ColorPickerChannelSliderThumb({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelSliderThumb
      ref={ref}
      className={cn(
        'box-border size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-background shadow-[0_0_0_4px_rgb(0_0_0_/_18%),0_2px_4px_0_rgb(0_0_0_/_10%),0_1px_2px_-1px_rgb(0_0_0_/_10%)] ring-2 ring-background outline-0 focus-visible:ring-ring data-disabled:pointer-events-none',
        className,
      )}
      {...props}
      data-slot="color-picker-channel-slider-thumb"
    />
  );
});

const ColorPickerChannelSliderLabel = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelSliderLabel>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelSliderLabel>
>(function ColorPickerChannelSliderLabel({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelSliderLabel
      ref={ref}
      className={cn('text-sm font-medium text-foreground', className)}
      {...props}
      data-slot="color-picker-channel-slider-label"
    />
  );
});

const ColorPickerChannelSliderValueText = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelSliderValueText>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelSliderValueText>
>(function ColorPickerChannelSliderValueText({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelSliderValueText
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
      data-slot="color-picker-channel-slider-value-text"
    />
  );
});

const ColorPickerChannelInput = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ChannelInput>,
  ComponentProps<typeof ColorPickerPrimitive.ChannelInput>
>(function ColorPickerChannelInput({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ChannelInput
      ref={ref}
      className={cn(
        'box-border h-control-md w-full min-w-0 [appearance:textfield] rounded-md border border-border bg-background px-3 text-sm text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive data-[channel=alpha]:w-16 data-[channel=alpha]:flex-none motion-reduce:transition-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none',
        className,
      )}
      {...props}
      data-slot="color-picker-channel-input"
    />
  );
});

const ColorPickerEyeDropperTrigger = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.EyeDropperTrigger>,
  ComponentProps<typeof ColorPickerPrimitive.EyeDropperTrigger>
>(function ColorPickerEyeDropperTrigger({ className, children, ...props }, ref) {
  return (
    <ColorPickerPrimitive.EyeDropperTrigger
      ref={ref}
      className={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-focus:border-ring data-focus:outline-ring data-readonly:cursor-default motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:bg-muted [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:text-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
      data-slot="color-picker-eye-dropper-trigger"
    >
      {children ?? <PipetteIcon />}
    </ColorPickerPrimitive.EyeDropperTrigger>
  );
});

const ColorPickerFormatSelect = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.FormatSelect>,
  ComponentProps<typeof ColorPickerPrimitive.FormatSelect>
>(function ColorPickerFormatSelect({ className, ...props }, ref) {
  return (
    <span className="group/format-select relative inline-grid w-fit max-w-full min-w-0 shrink-0">
      <ColorPickerPrimitive.FormatSelect
        ref={ref}
        className={cn(
          'peer/format-select box-border h-control-md w-auto min-w-0 rounded-md border border-border bg-background px-3 pe-8 text-sm text-foreground uppercase outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color] duration-200 ease-in-out focus:border-ring focus:outline-ring disabled:cursor-default data-disabled:cursor-default data-disabled:opacity-50 data-invalid:border-destructive data-invalid:outline-destructive forced-colors:appearance-auto forced-colors:pe-3',
          className,
        )}
        {...props}
        data-slot="color-picker-format-select"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 inline-flex size-4 -translate-y-1/2 items-center justify-center rounded-sm bg-transparent leading-none text-muted-foreground transition-[background-color,color,opacity] duration-200 ease-in-out peer-disabled/format-select:opacity-50 peer-data-disabled/format-select:opacity-50 peer-[:not([disabled]):hover]/format-select:bg-muted peer-[:not([disabled]):hover]/format-select:text-foreground forced-colors:hidden [&>svg]:block [&>svg]:size-full"
      >
        <ChevronDownIcon />
      </span>
    </span>
  );
});

const ColorPickerFormatTrigger = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.FormatTrigger>,
  ComponentProps<typeof ColorPickerPrimitive.FormatTrigger>
>(function ColorPickerFormatTrigger({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.FormatTrigger
      ref={ref}
      className={cn(
        'box-border inline-flex h-control-md min-w-control-md shrink-0 items-center justify-center gap-2 rounded-md border border-border bg-transparent px-2 text-sm text-muted-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color,color] duration-200 ease-in-out focus-visible:border-ring focus-visible:outline-ring disabled:cursor-default data-disabled:cursor-default data-focus:border-ring data-focus:outline-ring data-readonly:cursor-default motion-reduce:transition-none [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:bg-muted [&:not([disabled]):not([data-disabled]):not([data-readonly]):hover]:text-foreground [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
      data-slot="color-picker-format-trigger"
    />
  );
});

const ColorPickerSwatchGroup = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.SwatchGroup>,
  ComponentProps<typeof ColorPickerPrimitive.SwatchGroup>
>(function ColorPickerSwatchGroup({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.SwatchGroup
      ref={ref}
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
      data-slot="color-picker-swatch-group"
    />
  );
});

const ColorPickerSwatchTrigger = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.SwatchTrigger>,
  ComponentProps<typeof ColorPickerPrimitive.SwatchTrigger>
>(function ColorPickerSwatchTrigger({ className, children, value, ...props }, ref) {
  return (
    <ColorPickerPrimitive.SwatchTrigger
      ref={ref}
      className={cn(
        'group/swatch inline-flex cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 outline-0 focus-visible:ring-2 focus-visible:ring-ring data-disabled:cursor-default data-disabled:opacity-50',
        className,
      )}
      value={value}
      {...props}
      data-slot="color-picker-swatch-trigger"
    >
      {children ?? (
        <ColorPickerPrimitive.Swatch
          data-slot="color-picker-swatch"
          className="relative grid size-control-sm shrink-0 place-items-center overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]"
          value={value}
        >
          <ColorPickerPrimitive.SwatchIndicator
            data-slot="color-picker-swatch-indicator"
            className="pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] group-data-[state=checked]/swatch:inline-flex data-[state=checked]:inline-flex [&>svg]:size-4"
          >
            <CheckIcon />
          </ColorPickerPrimitive.SwatchIndicator>
        </ColorPickerPrimitive.Swatch>
      )}
    </ColorPickerPrimitive.SwatchTrigger>
  );
});

const ColorPickerSwatch = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.Swatch>,
  ComponentProps<typeof ColorPickerPrimitive.Swatch>
>(function ColorPickerSwatch({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.Swatch
      ref={ref}
      className={cn(
        'relative grid size-control-sm shrink-0 place-items-center overflow-hidden rounded-[inherit] shadow-[inset_0_0_0_1px_color-mix(in_oklab,black_14%,transparent)]',
        className,
      )}
      {...props}
      data-slot="color-picker-swatch"
    />
  );
});

const ColorPickerSwatchIndicator = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.SwatchIndicator>,
  ComponentProps<typeof ColorPickerPrimitive.SwatchIndicator>
>(function ColorPickerSwatchIndicator({ className, children, ...props }, ref) {
  return (
    <ColorPickerPrimitive.SwatchIndicator
      ref={ref}
      className={cn(
        'pointer-events-none absolute inset-0 hidden items-center justify-center text-white [filter:drop-shadow(0_1px_1px_rgb(0_0_0_/_45%))] data-[state=checked]:inline-flex [&>svg]:size-4',
        className,
      )}
      {...props}
      data-slot="color-picker-swatch-indicator"
    >
      {children ?? <CheckIcon />}
    </ColorPickerPrimitive.SwatchIndicator>
  );
});

const ColorPickerTransparencyGrid = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.TransparencyGrid>,
  ComponentProps<typeof ColorPickerPrimitive.TransparencyGrid>
>(function ColorPickerTransparencyGrid({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.TransparencyGrid
      ref={ref}
      className={cn(
        'col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0',
        className,
      )}
      {...props}
      data-slot="color-picker-transparency-grid"
    />
  );
});

const ColorPickerValueSwatch = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ValueSwatch>,
  ComponentProps<typeof ColorPickerPrimitive.ValueSwatch>
>(function ColorPickerValueSwatch({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ValueSwatch
      ref={ref}
      className={cn(
        'z-1 col-start-1 row-start-1 size-full rounded-[inherit] group-data-[fit-content]/trigger:col-auto group-data-[fit-content]/trigger:row-auto group-data-[fit-content]/trigger:size-4 group-data-[fit-content]/trigger:shrink-0',
        className,
      )}
      {...props}
      data-slot="color-picker-value-swatch"
    />
  );
});

const ColorPickerValueText = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.ValueText>,
  ComponentProps<typeof ColorPickerPrimitive.ValueText>
>(function ColorPickerValueText({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.ValueText
      ref={ref}
      className={cn('min-w-0 text-sm text-foreground', className)}
      {...props}
      data-slot="color-picker-value-text"
    />
  );
});

const ColorPickerView = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.View>,
  ComponentProps<typeof ColorPickerPrimitive.View>
>(function ColorPickerView({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.View
      ref={ref}
      className={cn(
        'flex min-w-0 flex-col gap-2 [&[hidden]:not([hidden="until-found"])]:hidden',
        className,
      )}
      {...props}
      data-slot="color-picker-view"
    />
  );
});

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