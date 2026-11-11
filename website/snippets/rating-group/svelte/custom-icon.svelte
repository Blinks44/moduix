<script lang="ts">
  import { Heart as HeartIcon } from '@lucide/svelte';
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItemIndicator,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
  import styles from '@/components/examples/rating-group/component-custom-icon.module.css';
</script>

<RatingGroup defaultValue={3}>
  <RatingGroupLabel>Checklist score</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupItems>
      <RatingGroupItemIndicator class={styles.customIcon}><HeartIcon /></RatingGroupItemIndicator>
    </RatingGroupItems>
  </RatingGroupControl>
</RatingGroup>