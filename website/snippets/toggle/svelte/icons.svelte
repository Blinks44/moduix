<script lang="ts">
  import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from '@lucide/svelte';
  import { Stack } from '@moduix/svelte/stack';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  <Toggle variant="outline">
    <BellIcon aria-hidden="true" focusable="false" />
    Alerts
  </Toggle>
  <Toggle size="icon-md" variant="outline" aria-label="Favorites">
    <StarIcon aria-hidden="true" focusable="false" />
  </Toggle>
  <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
    <CheckIcon aria-hidden="true" focusable="false" />
  </Toggle>
</Stack>