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
    ColorPickerSwatchGroup,
    ColorPickerSwatchTrigger,
  } from '@moduix/svelte/color-picker';

  const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<ColorPicker defaultValue={parseColor('#f97316')} closeOnSelect>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea />
      <ColorPickerSwatchGroup>
        {#each swatches as color (color)}
          <ColorPickerSwatchTrigger value={color} />
        {/each}
      </ColorPickerSwatchGroup>
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>