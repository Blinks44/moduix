<script lang="ts">
  import { ToggleGroup, ToggleGroupContext, ToggleGroupItem } from '@/components/toggle-group';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Alignment">
  <ToggleGroupContext>
    {#snippet render(context)}
      <output data-testid="context-value">{context().value.join(', ') || 'empty'}</output>
    {/snippet}
  </ToggleGroupContext>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroup>