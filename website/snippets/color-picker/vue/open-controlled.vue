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
import { ref } from 'vue';
import styles from '@/components/examples/color-picker/color-picker-open-controlled.module.css';

const open = ref(false);
</script>

<template>
  <div :class="styles.root">
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
    <output>Open: {{ String(open) }}</output>
    <Button type="button" size="sm" @click="open = !open">
      {{ open ? 'Close' : 'Open' }}
    </Button>
  </div>
</template>