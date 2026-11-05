<script lang="ts">
  import { useRatingGroupItemContext } from '@/components/rating-group';

  const item = useRatingGroupItemContext();
</script>

<span>Item {item().highlighted ? 'highlighted' : 'idle'}</span>