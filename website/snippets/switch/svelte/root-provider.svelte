<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Stack } from '@moduix/svelte/stack';
  import {
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchRootProvider,
    useSwitch,
  } from '@moduix/svelte/switch';

  const id = $props.id();
  const switchApi = useSwitch({ id, defaultChecked: true });
</script>

<Stack align="center" gap="3">
  <SwitchRootProvider value={switchApi}>
    <SwitchControl />
    <SwitchLabel>External state owner</SwitchLabel>
    <SwitchHiddenInput />
  </SwitchRootProvider>
  <div>
    <output>Current value: {String(switchApi().checked)}</output>
    <Button variant="outline" onclick={() => switchApi().toggleChecked()}>Toggle externally</Button>
  </div>
</Stack>