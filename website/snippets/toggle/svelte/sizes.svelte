<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  <Toggle size="xs">Extra-small</Toggle>
  <Toggle size="sm">Small</Toggle>
  <Toggle size="md">Medium</Toggle>
  <Toggle size="lg">Large</Toggle>
</Stack>