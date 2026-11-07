<script lang="ts">
  import { PaginationContext } from '@ark-ui/svelte/pagination';
  import PaginationEllipsis from './PaginationEllipsis.svelte';
  import PaginationItem from './PaginationItem.svelte';
</script>

<PaginationContext>
  {#snippet render(pagination)}
    {#each pagination().pages as page, index (page.type === 'page' ? page.value : `ellipsis-${index}`)}
      {#if page.type === 'page'}
        <PaginationItem type={page.type} value={page.value}>{page.value}</PaginationItem>
      {:else}
        <PaginationEllipsis {index} />
      {/if}
    {/each}
  {/snippet}
</PaginationContext>