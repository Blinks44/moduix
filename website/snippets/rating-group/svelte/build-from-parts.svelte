<script lang="ts">
  import {
    RatingGroup,
    RatingGroupContext,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItem,
    RatingGroupItemIndicator,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
</script>

<RatingGroup defaultValue={4}>
  <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupContext>
      {#snippet render(context)}
        {#each context().items as item (item)}
          <RatingGroupItem index={item}>
            <RatingGroupItemIndicator />
          </RatingGroupItem>
        {/each}
      {/snippet}
    </RatingGroupContext>
  </RatingGroupControl>
  <RatingGroupHiddenInput />
</RatingGroup>