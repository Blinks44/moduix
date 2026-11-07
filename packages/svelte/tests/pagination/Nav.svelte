<script lang="ts">
  import {
    Pagination,
    PaginationFirstTrigger,
    PaginationItems,
    PaginationLastTrigger,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    type PaginationRootProps,
  } from '@/components/pagination';

  let {
    edges = false,
    prevLabel,
    ...props
  }: PaginationRootProps & { edges?: boolean; prevLabel?: string } = $props();
  let root: Element | null = $state(null);
  let trigger: Element | null = $state(null);

  export const getRefs = () => ({ root, trigger });
</script>

<Pagination {...props} bind:ref={root}>
  {#if edges}<PaginationFirstTrigger />{/if}
  <PaginationPrevTrigger bind:ref={trigger} aria-label={prevLabel} />
  <PaginationItems />
  <PaginationNextTrigger />
  {#if edges}<PaginationLastTrigger />{/if}
</Pagination>