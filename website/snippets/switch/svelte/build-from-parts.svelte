<script lang="ts">
  import {
    Switch,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchThumb,
  } from '@moduix/svelte/switch';
</script>

<Switch defaultChecked>
  <SwitchControl>
    <SwitchThumb />
  </SwitchControl>
  <SwitchLabel>Enable notifications</SwitchLabel>
  <SwitchHiddenInput />
</Switch>