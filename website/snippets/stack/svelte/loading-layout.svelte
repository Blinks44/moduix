<script lang="ts">
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
</script>

<Stack gap="4" style="inline-size: 100%">
  <Skeleton height={144} borderRadius="var(--moduix-radius-lg)" />
  <Stack gap="3">
    <Skeleton width="62%" height={18} />
    <Skeleton height={14} />
    <Skeleton width="78%" height={14} />
  </Stack>
</Stack>