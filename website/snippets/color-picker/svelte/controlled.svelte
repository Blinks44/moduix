<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerPositioner,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerSliders,
  } from '@moduix/svelte/color-picker';

  let value = $state(parseColor('#16a34a'));
</script>

<ColorPicker bind:value>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerChannelInput channel="alpha" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea />
      <ColorPickerSliders />
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>