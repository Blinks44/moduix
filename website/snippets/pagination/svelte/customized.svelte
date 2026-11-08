<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
  import type { PaginationItemLabelDetails } from '@moduix/svelte/pagination';

  const translations = {
    nextTriggerLabel: 'Next page',
    prevTriggerLabel: 'Previous page',
    itemLabel: (details: PaginationItemLabelDetails) => 'Page ' + details.page,
  };
</script>

<Pagination count={400} pageSize={20} siblingCount={3} {translations}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
</Pagination>