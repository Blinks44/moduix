<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
</script>

<RatingGroup allowHalf defaultValue={3.5}>
  <RatingGroupLabel>Average delivery score</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupItems />
  </RatingGroupControl>
</RatingGroup>