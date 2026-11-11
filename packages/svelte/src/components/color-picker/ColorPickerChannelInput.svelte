<script lang="ts">
  import {
    ColorPickerChannelInput,
    type ColorPickerChannelInputProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerChannelInputProps = $props();
</script>

<ColorPickerChannelInput
  {...props}
  bind:ref
  class={clsx(styles.channelInput, className)}
  data-slot="color-picker-channel-input"
/>