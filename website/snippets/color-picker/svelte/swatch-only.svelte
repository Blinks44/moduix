<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerSwatchGroup,
    ColorPickerSwatchTrigger,
  } from '@moduix/svelte/color-picker';
  import styles from '@/components/examples/color-picker/color-picker-swatch-only.module.css';

  const swatches = ['#0f172a', '#2563eb', '#16a34a', '#f97316'];
</script>

<ColorPicker class={styles.root} inline defaultValue={parseColor('#f97316')}>
  <ColorPickerLabel>Brand color</ColorPickerLabel>
  <ColorPickerSwatchGroup>
    {#each swatches as color (color)}
      <ColorPickerSwatchTrigger value={color} />
    {/each}
  </ColorPickerSwatchGroup>
</ColorPicker>