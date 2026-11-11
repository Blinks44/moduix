<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';

  let page = $state(1);
  let pageSize = $state(10);

  export const write = (key: 'page' | 'pageSize') => {
    if (key === 'page') page = 3;
    if (key === 'pageSize') pageSize = 5;
  };
  export const read = () => ({ page, pageSize });
</script>

<Pagination bind:page bind:pageSize count={50}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
  <PaginationContext>
    {#snippet render(pagination)}
      <button type="button" onclick={() => pagination().setPageSize(20)}>Change page size</button>
      <output>Page {pagination().page} of {pagination().totalPages}</output>
    {/snippet}
  </PaginationContext>
</Pagination>