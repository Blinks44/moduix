<script lang="ts">
  import { ListboxItem, type ListboxItemProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemProps = $props();
</script>

<ListboxItem {...props} bind:ref class={clsx(styles.item, className)} data-slot="listbox-item" />