<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItemIndicator,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';
</script>

<RatingGroup allowHalf defaultValue={3.5}>
  <RatingGroupLabel>Rating</RatingGroupLabel>
  <RatingGroupControl>
    <RatingGroupItems>
      <RatingGroupItemIndicator data-testid="custom-indicator"
        ><span>Star</span></RatingGroupItemIndicator
      >
    </RatingGroupItems>
  </RatingGroupControl>
</RatingGroup>