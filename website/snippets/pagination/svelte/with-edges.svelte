<script lang="ts">
  import {
    Pagination,
    PaginationFirstTrigger,
    PaginationItems,
    PaginationLastTrigger,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
</script>

<Pagination count={400} pageSize={20} siblingCount={2}>
  <PaginationFirstTrigger />
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
  <PaginationLastTrigger />
</Pagination>