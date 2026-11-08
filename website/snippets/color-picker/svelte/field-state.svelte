<script lang="ts">
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
  } from '@moduix/svelte/color-picker';
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import styles from '@/components/examples/color-picker/color-picker-field-state.module.css';
</script>

<Field class={styles.root}>
  <ColorPicker name="accent" required invalid defaultValue={parseColor('#eb5e41')}>
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