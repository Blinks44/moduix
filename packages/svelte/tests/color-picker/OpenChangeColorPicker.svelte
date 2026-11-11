<script lang="ts">
  import {
    ColorPicker,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerTrigger,
    parseColor,
    type ColorPickerOpenChangeDetails,
  } from '@/components/color-picker';

  let { onOpenChange }: { onOpenChange?: (details: ColorPickerOpenChangeDetails) => void } =
    $props();
</script>

<ColorPicker defaultValue={parseColor('#eb5e41')} {onOpenChange}>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>Content</ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>