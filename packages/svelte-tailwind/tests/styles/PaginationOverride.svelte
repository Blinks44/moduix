<script lang="ts">
  import {
    Pagination,
    PaginationFirstTrigger,
    PaginationItems,
    PaginationLastTrigger,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';

  let { edges = false }: { edges?: boolean } = $props();
</script>

{#if edges}
  <Pagination count={200} defaultPage={10} pageSize={10} siblingCount={1}>
    <PaginationFirstTrigger />
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
    <PaginationLastTrigger />
  </Pagination>
{:else}
  <Pagination count={20} pageSize={10}>
    <PaginationPrevTrigger class="rounded-none px-0" />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
{/if}