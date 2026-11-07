<script lang="ts">
  import {
    PaginationLastTrigger,
    type PaginationLastTriggerProps,
  } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import { ChevronRightIcon } from '@/lib/moduix/icons/ui';
  import styles from './Pagination.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationLastTriggerProps = $props();
</script>

<PaginationLastTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, !children && !asChild && styles.iconTrigger, className)}
  data-slot="pagination-last-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <span class={styles.edgeIcon} aria-hidden="true">
      <ChevronRightIcon />
      <ChevronRightIcon />
    </span>
  {/if}
</PaginationLastTrigger>