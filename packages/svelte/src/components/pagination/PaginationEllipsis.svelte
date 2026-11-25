<script lang="ts">
  import { PaginationEllipsis, type PaginationEllipsisProps } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Pagination.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationEllipsisProps = $props();
</script>

<PaginationEllipsis
  aria-hidden="true"
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.ellipsis, className)}
  data-slot="pagination-ellipsis"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <UiIcon icon="ellipsis" />
  {/if}
</PaginationEllipsis>