<script lang="ts">
  import {
    PaginationRootProvider,
    type PaginationRootProviderProps,
  } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import styles from './Pagination.module.css';

  let { class: className, ref = $bindable(null), ...props }: PaginationRootProviderProps = $props();
</script>

<PaginationRootProvider
  {...props}
  bind:ref
  class={clsx(styles.root, className)}
  data-slot="pagination-root-provider"
/>