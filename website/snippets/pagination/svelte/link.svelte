<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationEllipsis,
    PaginationItem,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';

  const getPageUrl = (details: { page: number }) => '?page=' + details.page;
</script>

<Pagination count={200} pageSize={10} siblingCount={2} type="link" {getPageUrl}>
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