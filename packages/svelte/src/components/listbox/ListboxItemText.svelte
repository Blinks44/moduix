<script lang="ts">
  import { ListboxItemText, type ListboxItemTextProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemTextProps = $props();
</script>

<ListboxItemText
  {...props}
  bind:ref
  class={clsx(styles.itemText, className)}
  data-slot="listbox-item-text"
/>