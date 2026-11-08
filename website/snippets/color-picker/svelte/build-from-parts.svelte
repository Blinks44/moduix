<script lang="ts">
  import CheckIcon from '@lucide/svelte/icons/check';
  import PipetteIcon from '@lucide/svelte/icons/pipette';
  import {
    ColorPicker,
    parseColor,
    ColorPickerArea,
    ColorPickerAreaBackground,
    ColorPickerAreaThumb,
    ColorPickerChannelInput,
    ColorPickerChannelSlider,
    ColorPickerChannelSliderThumb,
    ColorPickerChannelSliderTrack,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerEyeDropperTrigger,
    ColorPickerHiddenInput,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerSwatch,
    ColorPickerSwatchGroup,
    ColorPickerSwatchIndicator,
    ColorPickerSwatchTrigger,
    ColorPickerTransparencyGrid,
    ColorPickerTrigger,
    ColorPickerValueSwatch,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/color-picker/color-picker-build-from-parts.module.css';

  const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<ColorPicker defaultValue={parseColor('#eb5e41')}>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerChannelInput channel="alpha" />
    <ColorPickerTrigger aria-label="Open color picker">
      <ColorPickerValueSwatch />
    </ColorPickerTrigger>
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea>
        <ColorPickerAreaBackground />
        <ColorPickerAreaThumb />
      </ColorPickerArea>
      <Stack direction="row" align="center" gap="3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen">
          <PipetteIcon strokeWidth={2.5} />
        </ColorPickerEyeDropperTrigger>
        <div class={styles.sliders}>
          <ColorPickerChannelSlider channel="hue">
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>
          <ColorPickerChannelSlider channel="alpha">
            <ColorPickerTransparencyGrid />
            <ColorPickerChannelSliderTrack />
            <ColorPickerChannelSliderThumb />
          </ColorPickerChannelSlider>
        </div>
      </Stack>
      <ColorPickerSwatchGroup>
        {#each swatches as color (color)}
          <ColorPickerSwatchTrigger value={color}>
            <ColorPickerSwatch value={color}>
              <ColorPickerSwatchIndicator><CheckIcon strokeWidth={3} /></ColorPickerSwatchIndicator>
            </ColorPickerSwatch>
          </ColorPickerSwatchTrigger>
        {/each}
      </ColorPickerSwatchGroup>
    </ColorPickerContent>
  </ColorPickerPositioner>
  <ColorPickerHiddenInput />
</ColorPicker>