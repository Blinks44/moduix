<script lang="ts">
  import {
    ColorPicker,
    ColorPickerChannelInput,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerHiddenInput,
    ColorPickerLabel,
    ColorPickerPositioner,
    ColorPickerTrigger,
    parseColor,
  } from '@/components/color-picker';

  const defaultColor = parseColor('#eb5e41');
</script>

<ColorPicker defaultValue={defaultColor} portalled={false} defaultOpen>
  <ColorPickerLabel>Color</ColorPickerLabel>
  <ColorPickerControl>
    <ColorPickerChannelInput channel="hex" />
    <ColorPickerTrigger aria-label="Open color picker" />
  </ColorPickerControl>
  <ColorPickerPositioner>
    <ColorPickerContent>Content</ColorPickerContent>
  </ColorPickerPositioner>
  <ColorPickerHiddenInput />
</ColorPicker>