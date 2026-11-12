<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/rating-group/component-controlled.module.css';

  let value = $state(3);
</script>

<Stack align="center" gap="3">
  <RatingGroup bind:value>
    <RatingGroupLabel>Support quality</RatingGroupLabel>
    <RatingGroupControl>
      <RatingGroupItems />
    </RatingGroupControl>
  </RatingGroup>
  <div data-preview-meta>
    <output class={styles.hint}>Current value: {value}</output>
  </div>
</Stack>