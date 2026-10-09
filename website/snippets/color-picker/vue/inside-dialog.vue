<script setup lang="ts">
import {
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@ark-ui/vue/dialog';
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
import styles from '@/components/examples/color-picker/color-picker-inside-dialog.module.css';
</script>

<template>
  <DialogRoot>
    <DialogTrigger as-child><Button>Open dialog</Button></DialogTrigger>
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent>
        <DialogTitle>Choose a color</DialogTitle>
        <DialogDescription>
          The color picker stays inside the dialog stacking context.
        </DialogDescription>
        <div :class="styles.dialogBody">
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
        </div>
      </DialogContent>
    </DialogPositioner>
  </DialogRoot>
</template>