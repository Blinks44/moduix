<script lang="ts">
  import {
    Switch,
    SwitchControl,
    SwitchHiddenInput,
    SwitchLabel,
    SwitchThumb,
  } from '@/components/switch';
</script>

<Switch class="gap-4" data-testid="root">
  <SwitchControl class="w-10 rounded-md bg-background">
    <SwitchThumb class="size-4 bg-muted-foreground" />
  </SwitchControl>
  <SwitchLabel class="text-lg">Notifications</SwitchLabel>
  <SwitchHiddenInput />
</Switch>