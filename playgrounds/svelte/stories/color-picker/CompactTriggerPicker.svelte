<script lang="ts">
  import {
    ColorPicker,
    ColorPickerArea,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerEyeDropperTrigger,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerSliders,
    ColorPickerTrigger,
    ColorPickerValueSwatch,
    ColorPickerValueText,
    parseColor,
  } from '@/components/color-picker';
  import styles from './ColorPicker.stories.module.css';
</script>

<ColorPicker class={styles.demoRoot} defaultValue={parseColor('#eb5e41')}>
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
      <div class={styles.sliderGroup}>
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </div>
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>