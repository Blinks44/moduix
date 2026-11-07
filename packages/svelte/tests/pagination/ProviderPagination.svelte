<script lang="ts">
  import {
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRootProvider,
    usePagination,
  } from '@/components/pagination';
  import PageValue from './PageValue.svelte';

  const pagination = usePagination({
    id: 'provider-pagination',
    count: 30,
    defaultPage: 2,
    pageSize: 10,
  });
</script>

<PaginationRootProvider value={pagination}>
  <PaginationPrevTrigger />
  <PaginationItems />
  <PaginationNextTrigger />
  <PageValue />
  <PaginationContext>
    {#snippet render(api)}
      <output>Range {api().pageRange.start}-{api().pageRange.end}</output>
    {/snippet}
  </PaginationContext>
</PaginationRootProvider>