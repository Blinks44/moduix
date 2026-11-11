<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@moduix/svelte/rating-group';

  let value = $state(3);
</script>

<RatingGroup bind:value>
  <RatingGroupLabel>Support quality</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupItems />
  </RatingGroupControl>
</RatingGroup>
<output>Current value: {value}</output>