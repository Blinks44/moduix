<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';
</script>

<Stack align="center" gap="3">
  <Switch disabled>
    <SwitchControl />
    <SwitchLabel>Enable dark mode</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
  <Switch disabled defaultChecked>
    <SwitchControl />
    <SwitchLabel>Keep me signed in</SwitchLabel>
    <SwitchHiddenInput />
  </Switch>
</Stack>