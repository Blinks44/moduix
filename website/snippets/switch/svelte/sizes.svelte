<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';

  const switchSizeOptions = [
    { label: 'Extra-small', value: 'xs' },
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
    { label: 'Extra-large', value: 'xl' },
  ] as const;
</script>

<Stack align="flex-start" gap="3">
  {#each switchSizeOptions as item (item.value)}
    <Switch size={item.value} defaultChecked>
      <SwitchControl />
      <SwitchLabel>{item.label}</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
  {/each}
</Stack>