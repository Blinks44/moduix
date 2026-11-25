<script lang="ts">
  import {
    PaginationNextTrigger,
    type PaginationNextTriggerProps,
  } from '@ark-ui/svelte/pagination';
  import { clsx } from 'clsx';
  import { UiIcon } from '@/lib/moduix/icons/ui';
  import styles from './Pagination.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: PaginationNextTriggerProps = $props();
</script>

<PaginationNextTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, !children && !asChild && styles.iconTrigger, className)}
  data-slot="pagination-next-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <UiIcon icon="chevron-right" />
  {/if}
</PaginationNextTrigger>