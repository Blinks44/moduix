<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationEllipsis,
    PaginationItem,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';
</script>

<Pagination count={30} pageSize={10} type="link" getPageUrl={(details) => `?page=${details.page}`}>
  <PaginationPrevTrigger>
    {#snippet asChild(props)}<a {...props()}>Previous</a>{/snippet}
  </PaginationPrevTrigger>
  <PaginationContext>
    {#snippet render(pagination)}
      {#each pagination().pages as page, index (index)}
        {#if page.type === 'page'}
          <PaginationItem type={page.type} value={page.value}>
            {#snippet asChild(props)}<a {...props()}>{page.value}</a>{/snippet}
          </PaginationItem>
        {:else}
          <PaginationEllipsis {index} />
        {/if}
      {/each}
    {/snippet}
  </PaginationContext>
  <PaginationNextTrigger>
    {#snippet asChild(props)}<a {...props()}>Next</a>{/snippet}
  </PaginationNextTrigger>
</Pagination>