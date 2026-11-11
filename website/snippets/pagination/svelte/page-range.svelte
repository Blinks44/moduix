<script lang="ts">
  import {
    Pagination,
    PaginationContext,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
  import styles from '@/components/examples/pagination/pagination-page-range.module.css';
</script>

<Pagination count={200} pageSize={10}>
  <PaginationContext>
    {#snippet render(pagination)}
      <div class={styles.stack}>
        <div class={styles.row}>
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </div>
        <div data-preview-meta>
          <output>
            Showing {pagination().pageRange.start + 1}-{pagination().pageRange.end} of
            {pagination().count} results
          </output>
        </div>
      </div>
    {/snippet}
  </PaginationContext>
</Pagination>