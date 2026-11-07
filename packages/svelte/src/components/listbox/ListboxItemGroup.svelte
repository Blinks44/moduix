<script lang="ts">
  import { ListboxItemGroup, type ListboxItemGroupProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemGroupProps = $props();
</script>

<ListboxItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="listbox-item-group"
/>