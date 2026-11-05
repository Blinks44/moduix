<script lang="ts">
  import {
    RatingGroup,
    RatingGroupControl,
    RatingGroupItemIndicator,
    RatingGroupItems,
    RatingGroupLabel,
  } from '@/components/rating-group';
</script>

<RatingGroup class="gap-3 text-primary" data-testid="root">
  <RatingGroupLabel>Notifications</RatingGroupLabel>
  <RatingGroupControl class="gap-3">
    <RatingGroupItems>
      <RatingGroupItemIndicator class="size-7 text-secondary" />
    </RatingGroupItems>
  </RatingGroupControl>
</RatingGroup>