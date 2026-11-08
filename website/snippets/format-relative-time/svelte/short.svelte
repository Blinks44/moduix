<script lang="ts">
  import { Format } from '@ark-ui/svelte/format';

  const lastSavedAt = new Date(Date.now() - 43 * 60 * 1000);
</script>

<p>
  Last saved:
  <time datetime={lastSavedAt.toISOString()}>
    <Format.RelativeTime style="short" value={lastSavedAt} />
  </time>
</p>