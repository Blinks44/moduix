<script lang="ts">
  import {
    Switch,
    SwitchContext,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
  } from '@moduix/svelte/switch';
</script>

<Switch defaultChecked>
  <SwitchControl />
  <SwitchContext>
    {#snippet render(context)}
      <SwitchLabel>Feature is {context().checked ? 'enabled' : 'disabled'}</SwitchLabel>
    {/snippet}
  </SwitchContext>
  <SwitchHiddenInput />
</Switch>