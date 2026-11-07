<script lang="ts">
  import { ColorPickerContent, type ColorPickerContentProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerContentProps = $props();
</script>

<ColorPickerContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="color-picker-content"
/>