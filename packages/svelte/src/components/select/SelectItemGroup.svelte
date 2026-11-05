<script lang="ts">
  import { SelectItemGroup, type SelectItemGroupProps } from '@ark-ui/svelte/select';
  import { clsx } from 'clsx';
  import styles from './Select.module.css';

  let { class: className, ref = $bindable(null), ...props }: SelectItemGroupProps = $props();
</script>

<SelectItemGroup
  {...props}
  bind:ref
  class={clsx(styles.itemGroup, className)}
  data-slot="select-item-group"
/>