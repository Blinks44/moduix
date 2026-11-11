<script lang="ts">
  import { useRatingGroupContext } from '@/components/rating-group';

  const ratingGroup = useRatingGroupContext();
</script>

<button type="button" onclick={() => ratingGroup().setValue(5)}>Set five</button>