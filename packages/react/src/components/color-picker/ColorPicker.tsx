import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/react/color-picker';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef, ReactElement, ReactNode } from 'react';
import { Children, cloneElement, forwardRef } from 'react';
import { CheckIcon, PipetteIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
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
>(function ColorPickerRoot({ asChild, children, className, portalled, portalRef, ...props }, ref) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ColorPickerPrimitive.Root
        ref={ref}
        asChild={asChild}
        data-slot="color-picker-root"
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      >
        {withHiddenInput(children, asChild)}
      </ColorPickerPrimitive.Root>
    </OverlayPortalProvider>
  );
});

const ColorPickerRootProvider = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.RootProvider>,
  ColorPickerRootProviderProps
>(function ColorPickerRootProvider(
  { asChild, children, className, portalled, portalRef, ...props },
  ref,
) {
  return (
    <OverlayPortalProvider portalled={portalled} portalRef={portalRef}>
      <ColorPickerPrimitive.RootProvider
        ref={ref}
        asChild={asChild}
        data-slot="color-picker-root-provider"
        className={clsx(styles.root, normalizeClassName(className))}
        {...props}
      >
        {withHiddenInput(children, asChild)}
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
      data-slot="color-picker-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-control"
      className={clsx(styles.control, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-trigger"
      className={clsx(styles.trigger, normalizeClassName(className))}
      {...props}
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
        data-slot="color-picker-positioner"
        className={clsx(styles.positioner, normalizeClassName(className))}
        {...props}
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
      data-slot="color-picker-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-area"
      className={clsx(styles.area, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-area-background"
      className={clsx(styles.areaBackground, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-area-thumb"
      className={clsx(styles.thumb, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-channel-slider"
      className={clsx(styles.channelSlider, normalizeClassName(className))}
      channel={channel}
      {...props}
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
        data-slot="color-picker-sliders"
        className={clsx(styles.sliders, normalizeClassName(className))}
        {...props}
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
      data-slot="color-picker-channel-slider-track"
      className={clsx(styles.channelSliderTrack, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-channel-slider-thumb"
      className={clsx(styles.thumb, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-channel-slider-label"
      className={clsx(styles.channelSliderLabel, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-channel-slider-value-text"
      className={clsx(styles.channelSliderValueText, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-channel-input"
      className={clsx(styles.channelInput, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-eye-dropper-trigger"
      className={clsx(styles.eyeDropperTrigger, normalizeClassName(className))}
      {...props}
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
    <ColorPickerPrimitive.FormatSelect
      ref={ref}
      data-slot="color-picker-format-select"
      className={clsx(styles.formatSelect, normalizeClassName(className))}
      {...props}
    />
  );
});

const ColorPickerFormatTrigger = forwardRef<
  ComponentRef<typeof ColorPickerPrimitive.FormatTrigger>,
  ComponentProps<typeof ColorPickerPrimitive.FormatTrigger>
>(function ColorPickerFormatTrigger({ className, ...props }, ref) {
  return (
    <ColorPickerPrimitive.FormatTrigger
      ref={ref}
      data-slot="color-picker-format-trigger"
      className={clsx(styles.formatTrigger, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-swatch-group"
      className={clsx(styles.swatchGroup, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-swatch-trigger"
      className={clsx(styles.swatchTrigger, normalizeClassName(className))}
      value={value}
      {...props}
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
      data-slot="color-picker-swatch"
      className={clsx(styles.swatch, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-swatch-indicator"
      className={clsx(styles.swatchIndicator, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-transparency-grid"
      className={clsx(styles.transparencyGrid, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-value-swatch"
      className={clsx(styles.valueSwatch, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-value-text"
      className={clsx(styles.valueText, normalizeClassName(className))}
      {...props}
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
      data-slot="color-picker-view"
      className={clsx(styles.view, normalizeClassName(className))}
      {...props}
    />
  );
});

function withHiddenInput(children: ReactNode, asChild?: boolean) {
  const hiddenInput = <ColorPickerPrimitive.HiddenInput data-slot="color-picker-hidden-input" />;

  if (!asChild) {
    return (
      <>
        {children}
        {hiddenInput}
      </>
    );
  }

  const child = Children.only(children) as ReactElement<{ children?: ReactNode }>;

  return cloneElement(child, {}, child.props.children, hiddenInput);
}

const ColorPicker = Object.assign(ColorPickerRoot, {
  Root: ColorPickerRoot,
  RootProvider: ColorPickerRootProvider,
  Context: ColorPickerPrimitive.Context,
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