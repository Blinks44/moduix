<script module lang="ts">
  import type { Snippet } from 'svelte';

  export interface RatingGroupItemsProps {
    children?: Snippet;
  }
</script>

<script lang="ts">
  import { useRatingGroupContext } from '@ark-ui/svelte/rating-group';
  import RatingGroupItem from './RatingGroupItem.svelte';
  import RatingGroupItemIndicator from './RatingGroupItemIndicator.svelte';

  let { children }: RatingGroupItemsProps = $props();
  const ratingGroup = useRatingGroupContext();
</script>

{#each ratingGroup().items as item (item)}
  <RatingGroupItem index={item}>
    {#if children}
      {@render children()}
    {:else}
      <RatingGroupItemIndicator />
    {/if}
  </RatingGroupItem>
{/each}