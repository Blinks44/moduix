<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';
</script>

<Switch defaultChecked>
  <SwitchControl />
  <SwitchLabel>Start enabled</SwitchLabel>
  <SwitchHiddenInput />
</Switch>