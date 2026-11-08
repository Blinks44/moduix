<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  <Toggle>Default</Toggle>
  <Toggle variant="outline">Outline</Toggle>
  <Toggle variant="ghost">Ghost</Toggle>
  <Toggle defaultPressed>Pressed</Toggle>
</Stack>