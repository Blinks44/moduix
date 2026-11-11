<script lang="ts">
  import {
    ColorPicker,
    ColorPickerArea,
    ColorPickerChannelInput,
    ColorPickerEyeDropperTrigger,
    ColorPickerLabel,
    ColorPickerSliders,
    ColorPickerValueText,
    ColorPickerView,
    parseColor,
  } from '@/components/color-picker';
  import styles from './ColorPicker.stories.module.css';
</script>

<ColorPicker inline class={styles.inlineRoot} defaultValue={parseColor('#2563eb')}>
  <div class={styles.valueRow}>
    <ColorPickerLabel>Inline color</ColorPickerLabel>
    <ColorPickerValueText format="hex" />
  </div>
  <ColorPickerArea />
  <div class={styles.sliderGroup}>
    <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
    <ColorPickerSliders />
  </div>
  <ColorPickerView format="rgba">
    <div class={styles.inputRow}>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerChannelInput channel="alpha" />
    </div>
  </ColorPickerView>
</ColorPicker>