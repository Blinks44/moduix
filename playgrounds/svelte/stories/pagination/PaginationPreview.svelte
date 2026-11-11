<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@/components/pagination';

  let {
    count = 200,
    defaultPage = 5,
    pageSize = 10,
    siblingCount = 1,
  }: { count?: number; defaultPage?: number; pageSize?: number; siblingCount?: number } = $props();
</script>

<Pagination {count} {defaultPage} {pageSize} {siblingCount}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
</Pagination>