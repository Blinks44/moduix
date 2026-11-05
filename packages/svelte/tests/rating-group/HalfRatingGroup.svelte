<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';
</script>

<button type="button">Before rating</button>
<RatingGroup allowHalf defaultValue={3.5}>
  <RatingGroupLabel>Rating</RatingGroupLabel>
  <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
</RatingGroup>