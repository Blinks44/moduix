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
</script>

<ColorPicker class="w-72" defaultValue={parseColor('#eb5e41')}>
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
      <div class="flex items-center gap-3">
        <ColorPickerEyeDropperTrigger aria-label="Pick color from screen" />
        <ColorPickerSliders />
      </div>
    </ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>