<script lang="ts">
  import {
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRootProvider,
    usePagination,
  } from '@moduix/svelte/pagination';
  import { Stack } from '@moduix/svelte/stack';

  const id = $props.id();
  const pagination = usePagination({
    id,
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });
</script>

<Stack align="flex-start" gap="3">
  <button type="button" onclick={() => pagination().goToNextPage()}>Next page</button>
  <PaginationRootProvider value={pagination}>
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </PaginationRootProvider>
</Stack>