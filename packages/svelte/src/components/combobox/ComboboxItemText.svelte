<script lang="ts">
  import { ComboboxItemText, type ComboboxItemTextProps } from '@ark-ui/svelte/combobox';
  import { clsx } from 'clsx';
  import styles from './Combobox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ComboboxItemTextProps = $props();
</script>

<ComboboxItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="combobox-item-text"
/>