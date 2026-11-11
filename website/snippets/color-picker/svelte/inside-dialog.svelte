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
  import {
    Dialog,
    DialogBackdrop,
    DialogCloseIcon,
    DialogContent,
    DialogDescription,
    DialogPositioner,
    DialogTitle,
    DialogTrigger,
  } from '@moduix/svelte/dialog';
  import { Stack } from '@moduix/svelte/stack';
</script>

<Dialog>
  <DialogTrigger>
    {#snippet asChild(props)}<Button {...props()}>Open dialog</Button>{/snippet}
  </DialogTrigger>
  <DialogBackdrop />
  <DialogPositioner>
    <DialogContent>
      <DialogCloseIcon />
      <DialogTitle>Choose a color</DialogTitle>
      <DialogDescription
        >The color picker stays inside the dialog stacking context.</DialogDescription
      >
      <Stack gap="1rem">
        <ColorPicker portalled={false} defaultValue={parseColor('#eb5e41')}>
          <ColorPickerLabel>Color</ColorPickerLabel>
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
      </Stack>
    </DialogContent>
  </DialogPositioner>
</Dialog>