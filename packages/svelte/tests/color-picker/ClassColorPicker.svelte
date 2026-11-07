<script lang="ts">
  import {
    ColorPicker,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerTrigger,
    parseColor,
  } from '@/components/color-picker';
</script>

<ColorPicker portalled={false} class="consumer-root" defaultValue={parseColor('#eb5e41')}>
  <ColorPickerLabel class="consumer-label">Color</ColorPickerLabel>
  <ColorPickerControl class="consumer-control">
    <ColorPickerTrigger class="consumer-trigger" aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner class="consumer-positioner">
    <ColorPickerContent class="consumer-content">Content</ColorPickerContent>
  </ColorPickerPositioner>
</ColorPicker>