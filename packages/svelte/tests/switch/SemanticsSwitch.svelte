<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@/components/switch';
</script>

<Switch disabled>
  <SwitchControl />
  <SwitchHiddenInput />
  <SwitchLabel>Disabled option</SwitchLabel>
</Switch>
<Switch readOnly>
  <SwitchControl />
  <SwitchHiddenInput />
  <SwitchLabel>Read-only option</SwitchLabel>
</Switch>
<Switch invalid required>
  <SwitchControl />
  <SwitchHiddenInput />
  <SwitchLabel>Required option</SwitchLabel>
</Switch>