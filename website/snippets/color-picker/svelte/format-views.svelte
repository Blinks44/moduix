<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerFormatSelect,
    ColorPickerView,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/color-picker/color-picker-format-views.module.css';

  let format = $state<'rgba' | 'hsla' | 'hsba'>('rgba');
</script>

<ColorPicker inline defaultValue={parseColor('#9333ea')} bind:format>
  <Stack direction="row" align="center" justify="space-between" gap="3">
    <ColorPickerLabel>Format</ColorPickerLabel>
    <ColorPickerFormatSelect aria-label="Color format" />
  </Stack>
  <ColorPickerArea />
  <ColorPickerView format="rgba">
    <div class={styles.inputRow}>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerChannelInput channel="alpha" />
    </div>
  </ColorPickerView>
  <ColorPickerView format="hsla">
    <div class={styles.inputRow}>
      <ColorPickerChannelInput channel="hue" />
      <ColorPickerChannelInput channel="saturation" />
      <ColorPickerChannelInput channel="lightness" />
    </div>
  </ColorPickerView>
  <ColorPickerView format="hsba">
    <div class={styles.inputRow}>
      <ColorPickerChannelInput channel="hue" />
      <ColorPickerChannelInput channel="saturation" />
      <ColorPickerChannelInput channel="brightness" />
    </div>
  </ColorPickerView>
</ColorPicker>