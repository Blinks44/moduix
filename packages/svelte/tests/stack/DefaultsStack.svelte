<script lang="ts">
  import { Stack } from '@/components/stack';
</script>

<Stack data-testid="defaults" />
<Stack
  direction="row"
  fill
  gap={12}
  wrap="wrap"
  style="gap: 2rem; flex-wrap: nowrap"
  data-testid="overridden"
/>