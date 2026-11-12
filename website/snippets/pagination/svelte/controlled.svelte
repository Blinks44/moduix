<script lang="ts">
  import {
    Pagination,
    PaginationItems,
    PaginationNextTrigger,
    PaginationPrevTrigger,
  } from '@moduix/svelte/pagination';
  import styles from '@/components/examples/pagination/pagination-controlled.module.css';

  let page = $state(5);
</script>

<div class={styles.stack}>
  <Pagination bind:page count={200} pageSize={10} siblingCount={2}>
    <PaginationPrevTrigger />
    <PaginationItems />
    <PaginationNextTrigger />
  </Pagination>
  <div data-preview-meta>
    <output>Current page: {page}</output>
  </div>
</div>