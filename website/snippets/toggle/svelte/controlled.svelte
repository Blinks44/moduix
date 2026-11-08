<script lang="ts">
  import { Bell as BellIcon } from '@lucide/svelte';
  import { Stack } from '@moduix/svelte/stack';
  import { Toggle } from '@moduix/svelte/toggle';

  let pressed = $state(false);
</script>

<Stack align="center" gap="3">
  <Toggle bind:pressed>
    <BellIcon aria-hidden="true" focusable="false" />
    {pressed ? 'Notifications on' : 'Notifications off'}
  </Toggle>
  <div data-preview-meta>
    <output>Notifications: {pressed ? 'on' : 'off'}</output>
  </div>
</Stack>