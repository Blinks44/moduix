<script lang="ts">
  import { PaginationRoot, type PaginationRootProps } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import styles from './Pagination.module.css';

  let {
    class: className,
    page = $bindable(),
    pageSize = $bindable(),
    ref = $bindable(null),
    ...props
  }: PaginationRootProps = $props();
</script>

<PaginationRoot
  {...props}
  bind:ref
  bind:page
  bind:pageSize
  class={clsx(styles.root, className)}
  data-slot="pagination-root"
/>