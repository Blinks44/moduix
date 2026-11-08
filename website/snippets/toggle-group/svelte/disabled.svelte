<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';
</script>

<Stack direction="row" align="center" justify="center" wrap="wrap" gap="3">
  <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
    <ToggleGroupItem value="one">One</ToggleGroupItem>
    <ToggleGroupItem value="two">Two</ToggleGroupItem>
  </ToggleGroup>
  <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
    <ToggleGroupItem value="one">One</ToggleGroupItem>
    <ToggleGroupItem value="two" disabled>Two</ToggleGroupItem>
  </ToggleGroup>
</Stack>