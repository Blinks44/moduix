<script lang="ts">
  import { ColorPickerView, type ColorPickerViewProps } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import styles from './ColorPicker.module.css';
  let { class: className, ref = $bindable(null), ...props }: ColorPickerViewProps = $props();
</script>

<ColorPickerView
  {...props}
  bind:ref
  class={clsx(styles.view, className)}
  data-slot="color-picker-view"
/>