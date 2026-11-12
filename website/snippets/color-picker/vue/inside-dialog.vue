<script setup lang="ts">
import { Button } from '@moduix/vue/button';
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
} from '@moduix/vue/color-picker';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseIcon,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/vue/dialog';
import { Stack } from '@moduix/vue/stack';
</script>

<template>
  <Dialog>
    <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogCloseIcon />
        <DialogTitle>Choose a color</DialogTitle>
        <DialogDescription>
          The color picker stays inside the dialog stacking context.
        </DialogDescription>
        <Stack gap="1rem">
          <ColorPicker :portalled="false" :default-value="parseColor('#eb5e41')">
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
</template>