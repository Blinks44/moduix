<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupHiddenInput,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';
</script>

<form data-testid="form">
  <RatingGroup defaultValue={3} name="rating">
    <RatingGroupLabel>Rating</RatingGroupLabel>
    <RatingGroupControl><RatingGroupItems /></RatingGroupControl>
    <RatingGroupHiddenInput />
  </RatingGroup>
</form>