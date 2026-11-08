<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerValueSwatch,
    ColorPickerValueText,
  } from '@moduix/svelte/color-picker';
  import styles from '@/components/examples/color-picker/color-picker-value-swatch.module.css';
</script>

<ColorPicker class={styles.root} defaultValue={parseColor('#dc2626')}>
  <ColorPickerLabel>Current color</ColorPickerLabel>
  <ColorPickerValueSwatch class={styles.valueSwatch} />
  <ColorPickerValueText format="hex" />
</ColorPicker>