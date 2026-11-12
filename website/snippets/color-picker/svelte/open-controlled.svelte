<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    ColorPicker,
    parseColor,
    ColorPickerLabel,
    ColorPickerControl,
    ColorPickerTrigger,
    ColorPickerPositioner,
    ColorPickerContent,
    ColorPickerArea,
    ColorPickerChannelInput,
  } from '@moduix/svelte/color-picker';
  import { Stack } from '@moduix/svelte/stack';

  let open = $state(false);
</script>

<Stack align="center" gap="2">
  <ColorPicker defaultValue={parseColor('#14b8a6')} bind:open>
    <ColorPickerLabel>Open controlled</ColorPickerLabel>
    <ColorPickerControl>
      <ColorPickerChannelInput channel="hex" />
      <ColorPickerTrigger aria-label="Open color picker" />
    </ColorPickerControl>
    <ColorPickerPositioner>
      <ColorPickerContent>
        <ColorPickerArea />
      </ColorPickerContent>
    </ColorPickerPositioner>
  </ColorPicker>
  <div data-preview-meta>
    <output>Open: {String(open)}</output>
    <Button type="button" size="sm" onclick={() => (open = !open)}>
      {open ? 'Close' : 'Open'}
    </Button>
  </div>
</Stack>