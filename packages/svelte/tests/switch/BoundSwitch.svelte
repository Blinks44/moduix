<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@/components/switch';

  let { details }: { details: boolean[] } = $props();
  let checked = $state(false);
</script>

<Switch bind:checked invalid onCheckedChange={(event) => details.push(event.checked)}>
  <SwitchControl />
  <SwitchHiddenInput />
  <SwitchLabel>Enable alerts</SwitchLabel>
</Switch>