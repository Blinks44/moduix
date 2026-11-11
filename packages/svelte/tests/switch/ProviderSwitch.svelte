<script lang="ts">
  import {
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchRootProvider,
    useSwitch,
  } from '@/components/switch';
  import ContextState from './ContextState.svelte';

  const switchApi = useSwitch({ defaultChecked: true });
</script>

<SwitchRootProvider value={switchApi}>
  <ContextState />
  <SwitchControl />
  <SwitchLabel>Provider switch</SwitchLabel>
  <SwitchHiddenInput />
</SwitchRootProvider>