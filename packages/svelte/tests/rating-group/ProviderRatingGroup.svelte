<script lang="ts">
  import {
    RatingGroupContext,
    RatingGroupControl,
    RatingGroupItem,
    RatingGroupItemIndicator,
    RatingGroupRootProvider,
    useRatingGroup,
  } from '@/components/rating-group';
  import ItemState from './ItemState.svelte';
  import RootState from './RootState.svelte';

  const ratingGroup = useRatingGroup({ count: 5, defaultValue: 3 });
</script>

<RatingGroupRootProvider value={ratingGroup}>
  <RatingGroupContext>
    {#snippet render(context)}
      <output>Value {context().value}</output>
    {/snippet}
  </RatingGroupContext>
  <RootState />
  <RatingGroupControl>
    <RatingGroupItem index={1}>
      <RatingGroupItemIndicator><ItemState /></RatingGroupItemIndicator>
    </RatingGroupItem>
    <RatingGroupItem index={2}><RatingGroupItemIndicator /></RatingGroupItem>
    <RatingGroupItem index={3}><RatingGroupItemIndicator /></RatingGroupItem>
    <RatingGroupItem index={4}><RatingGroupItemIndicator /></RatingGroupItem>
    <RatingGroupItem index={5}><RatingGroupItemIndicator /></RatingGroupItem>
  </RatingGroupControl>
</RatingGroupRootProvider>