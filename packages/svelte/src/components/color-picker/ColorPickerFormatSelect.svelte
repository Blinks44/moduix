<script lang="ts">
  import {
    ColorPickerFormatSelect,
    type ColorPickerFormatSelectProps,
  } from '@ark-ui/svelte/color-picker';
  import { clsx } from 'clsx';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import styles from './ColorPicker.module.css';

  let {
    class: className,
    ref = $bindable(null),
    ...props
  }: ColorPickerFormatSelectProps = $props();
</script>

<span class={styles.formatSelectControl}>
  <ColorPickerFormatSelect
    {...props}
    bind:ref
    class={clsx(styles.formatSelect, className)}
    data-slot="color-picker-format-select"
  />
  <span aria-hidden="true" class={styles.formatSelectIndicator}>
    <ChevronDownIcon />
  </span>
</span>