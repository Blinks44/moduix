<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';
</script>

<Pagination id="pagination-ssr" count={30} defaultPage={2} pageSize={10}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
</Pagination>