<script lang="ts">
  import {
    ComboboxItemGroupLabel,
    type ComboboxItemGroupLabelProps,
  } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxItemGroupLabelProps = $props();
</script>

<ComboboxItemGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.itemGroupLabel, className)}
  data-slot="combobox-item-group-label"
/>