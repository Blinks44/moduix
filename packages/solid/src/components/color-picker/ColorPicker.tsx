import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/solid/color-picker';
import { clsx } from 'clsx';
import { children, type ComponentProps, splitProps } from 'solid-js';
import { CheckIcon, ChevronDownIcon, PipetteIcon } from '@/internal/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/internal/overlayPortal';
import styles from './ColorPicker.module.css';

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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
        <ColorPickerPrimitive.HiddenInput data-slot="color-picker-hidden-input" />
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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
      >
        {local.children}
        <ColorPickerPrimitive.HiddenInput data-slot="color-picker-hidden-input" />
      </ColorPickerPrimitive.RootProvider>
    </OverlayPortalProvider>
  );
}

function ColorPickerLabel(props: ComponentProps<typeof ColorPickerPrimitive.Label>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Label
      data-slot="color-picker-label"
      class={clsx(styles.label, local.class)}
      {...others}
    />
  );
}

function ColorPickerControl(props: ComponentProps<typeof ColorPickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Control
      data-slot="color-picker-control"
      class={clsx(styles.control, local.class)}
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
      class={clsx(styles.trigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          <ColorPickerPrimitive.TransparencyGrid
            data-slot="color-picker-transparency-grid"
            class={styles.transparencyGrid}
          />
          <ColorPickerPrimitive.ValueSwatch
            data-slot="color-picker-value-swatch"
            class={styles.valueSwatch}
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.area, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          <ColorPickerPrimitive.AreaBackground
            data-slot="color-picker-area-background"
            class={styles.areaBackground}
          />
          <ColorPickerPrimitive.AreaThumb
            data-slot="color-picker-area-thumb"
            class={styles.thumb}
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
      class={clsx(styles.areaBackground, local.class)}
      {...others}
    />
  );
}

function ColorPickerAreaThumb(props: ComponentProps<typeof ColorPickerPrimitive.AreaThumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.AreaThumb
      data-slot="color-picker-area-thumb"
      class={clsx(styles.thumb, local.class)}
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
      class={clsx(styles.channelSlider, local.class)}
      {...others}
    >
      {resolvedChildren() ?? (
        <>
          {local.channel === 'alpha' && (
            <ColorPickerPrimitive.TransparencyGrid
              data-slot="color-picker-transparency-grid"
              class={styles.transparencyGrid}
            />
          )}
          <ColorPickerPrimitive.ChannelSliderTrack
            data-slot="color-picker-channel-slider-track"
            class={styles.channelSliderTrack}
          />
          <ColorPickerPrimitive.ChannelSliderThumb
            data-slot="color-picker-channel-slider-thumb"
            class={styles.thumb}
          />
        </>
      )}
    </ColorPickerPrimitive.ChannelSlider>
  );
}

function ColorPickerSliders(props: ComponentProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <div data-slot="color-picker-sliders" class={clsx(styles.sliders, local.class)} {...others}>
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
      class={clsx(styles.channelSliderTrack, local.class)}
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
      class={clsx(styles.thumb, local.class)}
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
      class={clsx(styles.channelSliderLabel, local.class)}
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
      class={clsx(styles.channelSliderValueText, local.class)}
      {...others}
    />
  );
}

function ColorPickerChannelInput(props: ComponentProps<typeof ColorPickerPrimitive.ChannelInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelInput
      data-slot="color-picker-channel-input"
      class={clsx(styles.channelInput, local.class)}
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
      class={clsx(styles.eyeDropperTrigger, local.class)}
      {...others}
    >
      {resolvedChildren() ?? <PipetteIcon />}
    </ColorPickerPrimitive.EyeDropperTrigger>
  );
}

function ColorPickerFormatSelect(props: ComponentProps<typeof ColorPickerPrimitive.FormatSelect>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <span class={styles.formatSelectControl}>
      <ColorPickerPrimitive.FormatSelect
        data-slot="color-picker-format-select"
        class={clsx(styles.formatSelect, local.class)}
        {...others}
      />
      <span aria-hidden="true" class={styles.formatSelectIndicator}>
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
      class={clsx(styles.formatTrigger, local.class)}
      {...others}
    />
  );
}

function ColorPickerSwatchGroup(props: ComponentProps<typeof ColorPickerPrimitive.SwatchGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.SwatchGroup
      data-slot="color-picker-swatch-group"
      class={clsx(styles.swatchGroup, local.class)}
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
      class={clsx(styles.swatchTrigger, local.class)}
      value={local.value}
      {...others}
    >
      {resolvedChildren() ?? (
        <ColorPickerPrimitive.Swatch
          data-slot="color-picker-swatch"
          class={styles.swatch}
          value={local.value}
        >
          <ColorPickerPrimitive.SwatchIndicator
            data-slot="color-picker-swatch-indicator"
            class={styles.swatchIndicator}
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
      class={clsx(styles.swatch, local.class)}
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
      class={clsx(styles.swatchIndicator, local.class)}
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
      class={clsx(styles.transparencyGrid, local.class)}
      {...others}
    />
  );
}

function ColorPickerValueSwatch(props: ComponentProps<typeof ColorPickerPrimitive.ValueSwatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueSwatch
      data-slot="color-picker-value-swatch"
      class={clsx(styles.valueSwatch, local.class)}
      {...others}
    />
  );
}

function ColorPickerValueText(props: ComponentProps<typeof ColorPickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueText
      data-slot="color-picker-value-text"
      class={clsx(styles.valueText, local.class)}
      {...others}
    />
  );
}

function ColorPickerView(props: ComponentProps<typeof ColorPickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.View
      data-slot="color-picker-view"
      class={clsx(styles.view, local.class)}
      {...others}
    />
  );
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