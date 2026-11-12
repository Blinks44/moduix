<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    RatingGroupContext,
    RatingGroupControl,
    RatingGroupItem,
    RatingGroupItemIndicator,
    RatingGroupLabel,
    RatingGroupRootProvider,
    useRatingGroup,
  } from '@moduix/svelte/rating-group';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/rating-group/component-root-provider.module.css';

  const id = $props.id();
  const ratingGroup = useRatingGroup({ id, count: 5, defaultValue: 3 });
</script>

<Stack align="center" gap="3">
  <RatingGroupRootProvider value={ratingGroup}>
    <RatingGroupLabel>Product quality</RatingGroupLabel>
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
  </RatingGroupRootProvider>
  <div data-preview-meta>
    <output class={styles.hint}>Current value: {ratingGroup().value}</output>
    <Button type="button" size="sm" onclick={() => ratingGroup().setValue(5)}>Set to 5</Button>
  </div>
</Stack>