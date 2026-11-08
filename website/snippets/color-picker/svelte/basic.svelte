<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerHiddenInput,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerPositioner,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerEyeDropperTrigger,
    ColorPickerSwatchGroup,
    ColorPickerSwatchTrigger,
    ColorPickerSliders,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';

  const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<ColorPicker defaultValue={parseColor('#eb5e41')}>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerChannelInput channel="alpha" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea />
      <Stack direction="row" align="center" gap="3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </Stack>
      <ColorPickerSwatchGroup>
        {#each swatches as color (color)}
          <ColorPickerSwatchTrigger value={color} />
        {/each}
      </ColorPickerSwatchGroup>
    </ColorPickerContent>
  </ColorPickerPositioner>
  <ColorPickerHiddenInput />
</ColorPicker>