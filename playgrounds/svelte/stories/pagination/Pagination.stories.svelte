<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Pagination,
    PaginationContext,
    PaginationEllipsis,
    PaginationFirstTrigger,
    PaginationItem,
    PaginationItems,
    PaginationLastTrigger,
    PaginationNextTrigger,
    PaginationPrevTrigger,
    PaginationRootProvider,
    usePagination,
  } from '@/components/pagination';
  import PaginationPreview from './PaginationPreview.svelte';

  const { Story } = defineMeta({
    title: 'Components/Pagination',
    component: PaginationPreview,
    parameters: { layout: 'centered' },
  });

  const getPageUrl = (details: { page: number }) => `?page=${details.page}`;
</script>

<script lang="ts">
  let page = $state(5);
  const pagination = usePagination({
    id: 'pagination-root-provider',
    count: 200,
    pageSize: 10,
    siblingCount: 2,
  });
</script>

<Story name="Default" asChild>
  <PaginationPreview count={200} defaultPage={5} pageSize={10} />
</Story>

<Story name="Start" asChild>
  <PaginationPreview count={200} defaultPage={1} pageSize={10} />
</Story>

<Story name="End" asChild>
  <PaginationPreview count={200} defaultPage={20} pageSize={10} />
</Story>

<Story name="Numeric Content" exportName="NumericContent" asChild>
  <PaginationPreview count={120} defaultPage={10} pageSize={1} siblingCount={2} />
</Story>

<Story name="Controlled" asChild>
  <Pagination bind:page count={200} pageSize={10}>
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</Story>

<Story name="Link" asChild>
  <Pagination count={200} defaultPage={5} pageSize={10} type="link" {getPageUrl}>
    <PaginationPrevTrigger>
      {#snippet asChild(props)}<a {...props()}>Previous</a>{/snippet}
    </PaginationPrevTrigger>
    <PaginationContext>
      {#snippet render(context)}
        {#each context().pages as item, index (index)}
          {#if item.type === 'page'}
            <PaginationItem type={item.type} value={item.value}>
              {#snippet asChild(props)}<a {...props()}>{item.value}</a>{/snippet}
            </PaginationItem>
          {:else}
            <PaginationEllipsis {index} />
          {/if}
        {/each}
      {/snippet}
    </PaginationContext>
    <PaginationNextTrigger>
      {#snippet asChild(props)}<a {...props()}>Next</a>{/snippet}
    </PaginationNextTrigger>
  </Pagination>
</Story>

<Story name="With Edges" exportName="WithEdges" asChild>
  <Pagination count={400} pageSize={20} siblingCount={2}>
    <PaginationFirstTrigger />
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
    <PaginationLastTrigger />
  </Pagination>
</Story>

<Story name="Right To Left" exportName="RightToLeft" asChild>
  <Pagination dir="rtl" count={200} defaultPage={5} pageSize={10} siblingCount={1}>
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div style="display: grid; gap: var(--moduix-spacing-3); justify-items: center">
    <button type="button" onclick={() => pagination().goToNextPage()}>Next page</button>
    <PaginationRootProvider value={pagination}>
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRootProvider>
  </div>
</Story>

<Story name="Custom Styles" exportName="CustomStyles" asChild>
  <Pagination
    count={200}
    defaultPage={5}
    pageSize={10}
    style="--moduix-pagination-item-size: var(--moduix-size-lg)"
  >
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
</Story>