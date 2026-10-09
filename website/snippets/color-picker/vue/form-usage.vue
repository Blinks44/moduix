<script setup lang="ts">
import { Button } from '@moduix/vue/button';
import {
  ColorPicker,
  parseColor,
  ColorPickerHiddenInput,
  ColorPickerLabel,
  ColorPickerControl,
  ColorPickerTrigger,
  ColorPickerPositioner,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerChannelInput,
} from '@moduix/vue/color-picker';
import { ref } from 'vue';

const submitted = ref('Nothing submitted');

const handleSubmit = (event: SubmitEvent) => {
  event.preventDefault();
  const form = event.currentTarget as HTMLFormElement;
  submitted.value = String(new FormData(form).get('accent') ?? '');
};
</script>

<template>
  <form @submit="handleSubmit">
    <ColorPicker name="accent" :default-value="parseColor('#eb5e41')">
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
      <ColorPickerHiddenInput />
    </ColorPicker>
    <output>Submitted: {{ submitted }}</output>
    <Button type="submit" size="sm">Submit</Button>
  </form>
</template>