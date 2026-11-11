<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';
</script>

<Stack align="flex-start" gap="3">
  <Switch readOnly>
    <SwitchControl />
    <SwitchLabel>Managed by policy</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
  <Switch readOnly defaultChecked>
    <SwitchControl />
    <SwitchLabel>Always on</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</Stack>