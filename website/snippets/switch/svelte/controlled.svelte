<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';

  let checked = $state(true);
</script>

<Stack align="center" gap="3">
  <Switch bind:checked>
    <SwitchControl />
    <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
  <output>Current value: {String(checked)}</output>
</Stack>