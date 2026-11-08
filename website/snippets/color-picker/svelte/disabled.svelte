<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerChannelInput,
  } from '@moduix/svelte/color-picker';
</script>

<ColorPicker disabled defaultValue={parseColor('#64748b')}>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
</ColorPicker>