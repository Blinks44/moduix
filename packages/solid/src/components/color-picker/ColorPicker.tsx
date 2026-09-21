import {
  ColorPicker as ColorPickerPrimitive,
  parseColor,
  useColorPicker,
  useColorPickerContext,
} from '@ark-ui/solid/color-picker';
import { clsx } from 'clsx';
import { children, type ComponentProps, splitProps } from 'solid-js';
import { CheckIcon, ChevronDownIcon, PipetteIcon } from '@/lib/moduix/icons/ui/Icons';
import {
  OverlayPortal,
  OverlayPortalProvider,
  type OverlayPortalProps,
} from '@/lib/moduix/overlayPortal';
import styles from './ColorPicker.module.css';

type ColorPickerRootProps = ComponentProps<typeof ColorPickerPrimitive.Root> & OverlayPortalProps;
type ColorPickerRootProviderProps = ComponentProps<typeof ColorPickerPrimitive.RootProvider> &
  OverlayPortalProps;

function ColorPicker(props: ColorPickerRootProps) {
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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="color-picker-root"
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
        class={clsx(styles.root, local.class)}
        lazyMount={local.lazyMount ?? true}
        unmountOnExit={local.unmountOnExit ?? true}
        {...others}
        data-slot="color-picker-root-provider"
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="color-picker-label"
    />
  );
}

function ColorPickerControl(props: ComponentProps<typeof ColorPickerPrimitive.Control>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.Control
      class={clsx(styles.control, local.class)}
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
      class={clsx(styles.trigger, local.class)}
      {...others}
      data-slot="color-picker-trigger"
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
        class={clsx(styles.positioner, local.class)}
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
      class={clsx(styles.content, local.class)}
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
      class={clsx(styles.area, local.class)}
      {...others}
      data-slot="color-picker-area"
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
      class={clsx(styles.areaBackground, local.class)}
      {...others}
      data-slot="color-picker-area-background"
    />
  );
}

function ColorPickerAreaThumb(props: ComponentProps<typeof ColorPickerPrimitive.AreaThumb>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.AreaThumb
      class={clsx(styles.thumb, local.class)}
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
      class={clsx(styles.channelSlider, local.class)}
      {...others}
      data-slot="color-picker-channel-slider"
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
    <div class={clsx(styles.sliders, local.class)} {...others} data-slot="color-picker-sliders">
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
      class={clsx(styles.channelSliderTrack, local.class)}
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
      class={clsx(styles.thumb, local.class)}
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
      class={clsx(styles.channelSliderLabel, local.class)}
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
      class={clsx(styles.channelSliderValueText, local.class)}
      {...others}
      data-slot="color-picker-channel-slider-value-text"
    />
  );
}

function ColorPickerChannelInput(props: ComponentProps<typeof ColorPickerPrimitive.ChannelInput>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ChannelInput
      class={clsx(styles.channelInput, local.class)}
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
      class={clsx(styles.eyeDropperTrigger, local.class)}
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
    <span class={styles.formatSelectControl}>
      <ColorPickerPrimitive.FormatSelect
        class={clsx(styles.formatSelect, local.class)}
        {...others}
        data-slot="color-picker-format-select"
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
      class={clsx(styles.formatTrigger, local.class)}
      {...others}
      data-slot="color-picker-format-trigger"
    />
  );
}

function ColorPickerSwatchGroup(props: ComponentProps<typeof ColorPickerPrimitive.SwatchGroup>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.SwatchGroup
      class={clsx(styles.swatchGroup, local.class)}
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
      class={clsx(styles.swatchTrigger, local.class)}
      value={local.value}
      {...others}
      data-slot="color-picker-swatch-trigger"
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
      class={clsx(styles.swatch, local.class)}
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
      class={clsx(styles.swatchIndicator, local.class)}
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
      class={clsx(styles.transparencyGrid, local.class)}
      {...others}
      data-slot="color-picker-transparency-grid"
    />
  );
}

function ColorPickerValueSwatch(props: ComponentProps<typeof ColorPickerPrimitive.ValueSwatch>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueSwatch
      class={clsx(styles.valueSwatch, local.class)}
      {...others}
      data-slot="color-picker-value-swatch"
    />
  );
}

function ColorPickerValueText(props: ComponentProps<typeof ColorPickerPrimitive.ValueText>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.ValueText
      class={clsx(styles.valueText, local.class)}
      {...others}
      data-slot="color-picker-value-text"
    />
  );
}

function ColorPickerView(props: ComponentProps<typeof ColorPickerPrimitive.View>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ColorPickerPrimitive.View
      class={clsx(styles.view, local.class)}
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