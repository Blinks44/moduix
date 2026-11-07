<script lang="ts">
  import {
    ColorPicker,
    ColorPickerContent,
    ColorPickerControl,
    ColorPickerPositioner,
    ColorPickerTrigger,
    parseColor,
    type ColorPickerOpenChangeDetails,
  } from '@/components/color-picker';

  let { onOpenChange }: { onOpenChange?: (details: ColorPickerOpenChangeDetails) => void } =
    $props();

  let open = $state(false);
</script>

<div>
  <output>{open ? 'Open' : 'Closed'}</output>
  <ColorPicker bind:open portalled={false} defaultValue={parseColor('#eb5e41')} {onOpenChange}>
    <ColorPickerControl>
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>Content</ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPicker>
</div>