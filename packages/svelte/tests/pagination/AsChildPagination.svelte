<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';

  let root: Element | null = $state(null);

  export const getRoot = () => root;
</script>

<Pagination bind:ref={root} count={20} pageSize={10}>
  {#snippet asChild(props)}
    <nav {...props()} aria-label="Custom page navigation">
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </nav>
  {/snippet}
</Pagination>