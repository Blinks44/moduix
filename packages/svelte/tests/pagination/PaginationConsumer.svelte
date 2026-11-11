<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRootProvider,
    usePagination,
  } from '@/components/pagination';

  let page = $state(2);
  let pageSize = $state(10);
  const pagination = usePagination({
    id: 'consumer-pagination',
    count: 30,
    defaultPage: 1,
    pageSize: 10,
  });
</script>

<Pagination bind:page bind:pageSize count={30}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
  <PaginationContext>
    {#snippet render(api)}
      <output>{api().page} of {api().totalPages}</output>
      <button type="button" onclick={() => api().setPageSize(5)}>Set page size</button>
    {/snippet}
  </PaginationContext>
</Pagination>

<PaginationRootProvider value={pagination}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
</PaginationRootProvider>