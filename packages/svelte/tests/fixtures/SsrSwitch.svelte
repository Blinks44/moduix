<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@/components/switch';
</script>

<Switch defaultChecked>
  <SwitchControl />
  <SwitchHiddenInput />
  <SwitchLabel>Server rendered switch</SwitchLabel>
</Switch>