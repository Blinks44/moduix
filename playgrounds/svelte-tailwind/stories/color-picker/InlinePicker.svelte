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
</script>

<ColorPicker class="w-[17rem]" inline defaultValue={parseColor('#2563eb')}>
  <div class="flex items-center justify-between gap-3">
    <ColorPickerLabel>Inline color</ColorPickerLabel>
    <ColorPickerValueText format="hex" />
  </div>
  <ColorPickerArea />
  <div class="flex items-center gap-3">
    <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
    <ColorPickerSliders />
  </div>
  <ColorPickerView format="rgba">
    <div class="flex min-w-0 gap-2">
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerChannelInput channel="alpha" />
    </div>
  </ColorPickerView>
</ColorPicker>