<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    Pagination,
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
  import {
    Select,
    SelectContent,
    SelectControl,
    SelectIndicator,
    SelectLabel,
    SelectOption,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';
  import type { SelectValueChangeDetails } from '@moduix/svelte/select';
  import styles from '@/components/examples/pagination/pagination-page-size-control.module.css';

  const pageSizes = createListCollection({
    items: [
      { label: '5', value: '5' },
      { label: '10', value: '10' },
      { label: '20', value: '20' },
      { label: '50', value: '50' },
    ],
  });

  const handlePageSizeChange = (
    details: SelectValueChangeDetails,
    setPageSize: (size: number) => void,
  ) => {
    const nextValue = details.value[0];
    if (nextValue) setPageSize(Number(nextValue));
  };
</script>

<Pagination count={200} defaultPageSize={10}>
  <PaginationContext>
    {#snippet render(pagination)}
      <div class={styles.stack}>
        <div class={styles.row}>
          <Select
            class={styles.pageSizeSelect}
            collection={pageSizes}
            value={[String(pagination().pageSize)]}
            onValueChange={(details) => handlePageSizeChange(details, pagination().setPageSize)}
          >
            <SelectLabel>Items per page</SelectLabel>
            <SelectControl>
              <SelectTrigger>
                <SelectValueText placeholder="Page size" />
              </SelectTrigger>
              <SelectIndicator />
            </SelectControl>
            <SelectPositioner>
              <SelectContent>
                {#each pageSizes.items as item (item.value)}
                  <SelectOption {item}>{item.label}</SelectOption>
                {/each}
              </SelectContent>
            </SelectPositioner>
          </Select>
        </div>
        <div class={styles.row}>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </div>
        <div data-preview-meta>
          <output>Page {pagination().page} of {pagination().totalPages}</output>
        </div>
      </div>
    {/snippet}
  </PaginationContext>
</Pagination>