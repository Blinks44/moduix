<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';

  const reviewStartsAt = new Date(Date.now() + 12 * 60 * 1000);
</script>

<p>
  Next review:
  <time datetime={reviewStartsAt.toISOString()}>
    <Format.RelativeTime numeric="auto" value={reviewStartsAt} />
  </time>
</p>