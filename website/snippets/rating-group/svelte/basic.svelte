<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';
</script>

<RatingGroup defaultValue={4}>
  <RatingGroupLabel>Overall satisfaction</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupItems />
  </RatingGroupControl>
  <RatingGroupHiddenInput />
</RatingGroup>