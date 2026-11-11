<script lang="ts">
  import {
    Switch,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchRootProvider,
    useSwitch,
  } from '@/components/switch';

  const providerSwitch = useSwitch({ defaultChecked: true, name: 'provider-notifications' });
</script>

<form>
  <Switch defaultChecked name="notifications" value="email">
    <SwitchControl />
    <SwitchHiddenInput />
    <SwitchLabel>Email notifications</SwitchLabel>
  </Switch>
  <SwitchRootProvider value={providerSwitch}>
    <SwitchControl />
    <SwitchHiddenInput />
    <SwitchLabel>Provider notifications</SwitchLabel>
  </SwitchRootProvider>
</form>