<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Text } from '@moduix/svelte/text';
</script>

<Stack
  direction={{ mobile: 'column', desktop: 'row' }}
  gap="3"
  justify="center"
  style="inline-size: 100%"
>
  <Text weight="semibold">Adaptive layout</Text>
  <Text tone="muted">Column on mobile, row from desktop width.</Text>
</Stack>