<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    type PaginationPageChangeDetails,
  } from '@/components/pagination';

  let { changes }: { changes: number[] } = $props();
  let currentPage = $state(1);
  let pageSize = $state(10);

  export const read = () => ({ page: currentPage, pageSize });
</script>

<Pagination
  bind:page={currentPage}
  bind:pageSize
  count={30}
  onPageChange={(details: PaginationPageChangeDetails) => changes.push(details.page)}
>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
  <PaginationContext>
    {#snippet render(pagination)}
      <button type="button" onclick={() => pagination().setPageSize(5)}>Change page size</button>
      <output>Page {pagination().page} of {pagination().totalPages}</output>
    {/snippet}
  </PaginationContext>
</Pagination>