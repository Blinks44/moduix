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
    ColorPickerEyeDropperTrigger,
    ColorPickerValueSwatch,
    ColorPickerValueText,
    ColorPickerSliders,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/color-picker/color-picker-compact-trigger.module.css';
</script>

<ColorPicker class={styles.root} defaultValue={parseColor('#eb5e41')}>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerTrigger aria-label="Open color picker" data-fit-content>
      <ColorPickerValueSwatch />
      <ColorPickerValueText format="hex" />
    </ColorPickerTrigger>
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>
      <ColorPickerArea />
      <Stack direction="row" align="center" gap="3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </Stack>
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>