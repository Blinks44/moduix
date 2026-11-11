<script lang="ts">
  import { PaginationItem, type PaginationItemProps } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import styles from './Pagination.module.css';

  let {
    asChild,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationItemProps = $props();
</script>

<PaginationItem
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.item, className)}
  data-slot="pagination-item"
/>