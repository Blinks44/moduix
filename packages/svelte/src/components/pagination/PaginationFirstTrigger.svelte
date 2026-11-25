<script lang="ts">
  import {
    PaginationFirstTrigger,
    type PaginationFirstTriggerProps,
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
  }: PaginationFirstTriggerProps = $props();
</script>

<PaginationFirstTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.trigger, !children && !asChild && styles.iconTrigger, className)}
  data-slot="pagination-first-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <span class={styles.edgeIcon} aria-hidden="true">
      <UiIcon icon="chevron-left" />
      <UiIcon icon="chevron-left" />
    </span>
  {/if}
</PaginationFirstTrigger>