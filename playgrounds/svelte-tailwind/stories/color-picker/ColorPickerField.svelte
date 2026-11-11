<script lang="ts">
  import {
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerEyeDropperTrigger,
    ColorPickerHiddenInput,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerSliders,
    ColorPickerSwatchGroup,
    ColorPickerSwatchTrigger,
    ColorPickerTrigger,
  } from '@/components/color-picker';
  import { swatches } from './swatches';

  let {
    actionClassName,
    swatchList = swatches,
    triggerClassName,
  }: { actionClassName?: string; swatchList?: string[]; triggerClassName?: string } = $props();
</script>

<ColorPickerLabel>Color</ColorPickerLabel>
<ColorPickerControl>
  <ColorPickerChannelInput channel="hex" />
  <ColorPickerChannelInput channel="alpha" />
  <ColorPickerTrigger aria-label="Open color picker" class={triggerClassName} />
</ColorPickerControl>
<ColorPickerPositioner>
  <ColorPickerContent>
    <ColorPickerArea />
    <div class="flex items-center gap-3">
      <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" class={actionClassName} />
      <ColorPickerSliders />
    </div>
    <ColorPickerSwatchGroup>
      {#each swatchList as color (color)}
        <ColorPickerSwatchTrigger value={color} />
      {/each}
    </ColorPickerSwatchGroup>
  </ColorPickerContent>
</ColorPickerPositioner>
<ColorPickerHiddenInput />