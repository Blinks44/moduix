<script lang="ts">
  import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
  import {
    Pagination,
    PaginationContext,
    PaginationEllipsis,
    PaginationItem,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
</script>

<Pagination count={200} pageSize={10} siblingCount={2}>
  <PaginationPrevTrigger />
  <PaginationContext>
    {#snippet render(pagination)}
      {#each pagination().pages as page, index (index)}
        {#if page.type === 'page'}
          <PaginationItem type={page.type} value={page.value}>
            {page.value}
          </PaginationItem>
        {:else}
          <PaginationEllipsis {index}><EllipsisIcon /></PaginationEllipsis>
        {/if}
      {/each}
    {/snippet}
  </PaginationContext>
  <PaginationNextTrigger />
</Pagination>