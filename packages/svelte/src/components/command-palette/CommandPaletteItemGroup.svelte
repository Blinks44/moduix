<script lang="ts">
  import { ComboboxItemGroup, type ComboboxItemGroupProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './CommandPalette.module.css';
  let { class: className, ref = $bindable(null), ...props }: ComboboxItemGroupProps = $props();
</script>

<ComboboxItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="command-palette-item-group"
/>