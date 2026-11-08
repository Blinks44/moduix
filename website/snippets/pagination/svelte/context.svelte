<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Pagination, PaginationContext } from '@moduix/svelte/pagination';
</script>

<Pagination count={200} pageSize={10}>
  <PaginationContext>
    {#snippet render(pagination)}
      <output>Page {pagination().page} of {pagination().totalPages}</output>
      <Button size="sm" onclick={() => pagination().goToFirstPage()}>First</Button>
      <Button size="sm" onclick={() => pagination().goToPrevPage()}>Prev</Button>
      <Button size="sm" onclick={() => pagination().goToNextPage()}>Next</Button>
      <Button size="sm" onclick={() => pagination().goToLastPage()}>Last</Button>
    {/snippet}
  </PaginationContext>
</Pagination>