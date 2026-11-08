<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';
</script>

<Switch defaultChecked>
  <SwitchControl />
  <SwitchLabel>Enable notifications</SwitchLabel>
  <SwitchHiddenInput />
</Switch>