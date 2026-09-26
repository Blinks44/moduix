<script setup lang="ts">
import { Field, FieldErrorText, FieldHelperText } from '@ark-ui/vue/field';
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
import styles from '@/components/examples/color-picker/color-picker-field-state.module.css';
</script>

<template>
  <Field :class="styles.root">
    <ColorPicker name="accent" required invalid :default-value="parseColor('#eb5e41')">
      <ColorPickerLabel>Accent color</ColorPickerLabel>
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
    <FieldHelperText>Used for generated charts and callouts.</FieldHelperText>
    <FieldErrorText>Choose an accent color.</FieldErrorText>
  </Field>
</template>