<script lang="ts">
  import {
    PaginationPrevTrigger,
    type PaginationPrevTriggerProps,
  } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
  import styles from './Pagination.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationPrevTriggerProps = $props();
</script>

<PaginationPrevTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, !children && !asChild && styles.iconTrigger, className)}
  data-slot="pagination-prev-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <ChevronLeftIcon />
  {/if}
</PaginationPrevTrigger>