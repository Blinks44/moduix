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
import { Stack } from '@moduix/vue/stack';
import { ref } from 'vue';

const open = ref(false);
</script>

<template>
  <Stack align="center" gap="2">
    <ColorPicker :default-value="parseColor('#14b8a6')" v-model:open="open">
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
      <output>Open: {{ String(open) }}</output>
      <Button type="button" size="sm" @click="open = !open">
        {{ open ? 'Close' : 'Open' }}
      </Button>
    </div>
  </Stack>
</template>