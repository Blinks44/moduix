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
  import styles from './ColorPicker.stories.module.css';
  import { swatches } from './swatches';

  let { swatchList = swatches }: { swatchList?: string[] } = $props();
</script>

<ColorPickerLabel>Color</ColorPickerLabel>
<ColorPickerControl>
  <ColorPickerChannelInput channel="hex" />
  <ColorPickerChannelInput channel="alpha" />
  <ColorPickerTrigger aria-label="Open color picker" />
</ColorPickerControl>
<ColorPickerPositioner>
  <ColorPickerContent>
    <ColorPickerArea />
    <div class={styles.sliderGroup}>
      <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
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