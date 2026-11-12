<script lang="ts">
  import { Separator } from '@moduix/svelte/separator';
  import { Stack } from '@moduix/svelte/stack';
  import { Text } from '@moduix/svelte/text';
</script>

<Stack direction="row" align="center" justify="center" gap="2.5" style="inline-size: 100%">
  <Text weight="semibold">Design</Text>
  <Separator orientation="vertical" aria-hidden="true" />
  <Text tone="muted">Engineering</Text>
  <Separator orientation="vertical" aria-hidden="true" />
  <Text tone="muted">Docs</Text>
</Stack>