'use client';

import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/react/color-picker';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { CheckIcon, ChevronDownIcon, PipetteIcon } from '@/lib/moduix/icons/ui';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './ColorPicker.module.css';

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
        className={clsx(styles.root, className)}
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
        className={clsx(styles.root, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.control, className)}
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
      className={clsx(styles.trigger, className)}
      {...props}
      data-slot="color-picker-trigger"
    >
      {children ?? (
        <>
          <ColorPickerPrimitive.TransparencyGrid
            data-slot="color-picker-transparency-grid"
            className={styles.transparencyGrid}
          />
          <ColorPickerPrimitive.ValueSwatch
            data-slot="color-picker-value-swatch"
            className={styles.valueSwatch}
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
        className={clsx(styles.positioner, className)}
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.area, className)}
      {...props}
      data-slot="color-picker-area"
    >
      {children ?? (
        <>
          <ColorPickerPrimitive.AreaBackground
            data-slot="color-picker-area-background"
            className={styles.areaBackground}
          />
          <ColorPickerPrimitive.AreaThumb
            data-slot="color-picker-area-thumb"
            className={styles.thumb}
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
      className={clsx(styles.areaBackground, className)}
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
      className={clsx(styles.thumb, className)}
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
      className={clsx(styles.channelSlider, className)}
      channel={channel}
      {...props}
      data-slot="color-picker-channel-slider"
    >
      {children ?? (
        <>
          {channel === 'alpha' && (
            <ColorPickerPrimitive.TransparencyGrid
              data-slot="color-picker-transparency-grid"
              className={styles.transparencyGrid}
            />
          )}
          <ColorPickerPrimitive.ChannelSliderTrack
            data-slot="color-picker-channel-slider-track"
            className={styles.channelSliderTrack}
          />
          <ColorPickerPrimitive.ChannelSliderThumb
            data-slot="color-picker-channel-slider-thumb"
            className={styles.thumb}
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
        className={clsx(styles.sliders, className)}
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
      className={clsx(styles.channelSliderTrack, className)}
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
      className={clsx(styles.thumb, className)}
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
      className={clsx(styles.channelSliderLabel, className)}
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
      className={clsx(styles.channelSliderValueText, className)}
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
      className={clsx(styles.channelInput, className)}
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
      className={clsx(styles.eyeDropperTrigger, className)}
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
    <span className={styles.formatSelectControl}>
      <ColorPickerPrimitive.FormatSelect
        ref={ref}
        className={clsx(styles.formatSelect, className)}
        {...props}
        data-slot="color-picker-format-select"
      />
      <span aria-hidden="true" className={styles.formatSelectIndicator}>
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
      className={clsx(styles.formatTrigger, className)}
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
      className={clsx(styles.swatchGroup, className)}
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
      className={clsx(styles.swatchTrigger, className)}
      value={value}
      {...props}
      data-slot="color-picker-swatch-trigger"
    >
      {children ?? (
        <ColorPickerPrimitive.Swatch
          data-slot="color-picker-swatch"
          className={styles.swatch}
          value={value}
        >
          <ColorPickerPrimitive.SwatchIndicator
            data-slot="color-picker-swatch-indicator"
            className={styles.swatchIndicator}
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
      className={clsx(styles.swatch, className)}
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
      className={clsx(styles.swatchIndicator, className)}
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
      className={clsx(styles.transparencyGrid, className)}
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
      className={clsx(styles.valueSwatch, className)}
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
      className={clsx(styles.valueText, className)}
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
      className={clsx(styles.view, className)}
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