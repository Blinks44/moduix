<script lang="ts">
  import { ListboxItemGroupLabel, type ListboxItemGroupLabelProps } from '@ark-ui/svelte/listbox';
  import { clsx } from 'clsx';
  import styles from './Listbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: ListboxItemGroupLabelProps = $props();
</script>

<ListboxItemGroupLabel
  {...props}
  bind:ref
  class={clsx(styles.itemGroupLabel, className)}
  data-slot="listbox-item-group-label"
/>