<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';

  let { details }: { details: number[] } = $props();
  let value = $state(2);
</script>

<RatingGroup bind:value onValueChange={(event) => details.push(event.value)}>
  <RatingGroupLabel>Rating</RatingGroupLabel>
  <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
</RatingGroup>
<output>Current value: {value}</output>