<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
</script>

<Pagination count={200} pageSize={10} siblingCount={2}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
</Pagination>