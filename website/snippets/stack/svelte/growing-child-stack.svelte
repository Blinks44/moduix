<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack direction="row" align="center" gap="3" style="inline-size: 100%">
  <Skeleton boxSize={40} borderRadius="var(--moduix-radius-full)" />
  <Stack direction="column" gap="2" fill>
    <Skeleton width="48%" height={16} />
    <Skeleton height={14} />
  </Stack>
</Stack>