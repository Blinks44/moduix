<script lang="ts">
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@/components/switch';

  let rootRef: Element | null = $state(null);

  export const getRootRef = () => rootRef;
</script>

<Switch bind:ref={rootRef}>
  {#snippet asChild(props)}
    <label {...props()} aria-label="Enable reminders">
      <SwitchControl />
      <SwitchHiddenInput />
      <SwitchLabel>Enable reminders</SwitchLabel>
    </label>
  {/snippet}
</Switch>