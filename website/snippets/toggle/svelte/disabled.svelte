<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  <Toggle disabled>Disabled</Toggle>
  <Toggle defaultPressed disabled>Pressed</Toggle>
</Stack>