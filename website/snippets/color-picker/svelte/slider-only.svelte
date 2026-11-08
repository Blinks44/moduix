<script lang="ts">
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerArea,
    ColorPickerSliders,
  } from '@moduix/svelte/color-picker';
</script>

<ColorPicker inline defaultValue={parseColor('#2563eb')}>
  <ColorPickerLabel>Channels</ColorPickerLabel>
  <ColorPickerArea />
  <ColorPickerSliders />
</ColorPicker>