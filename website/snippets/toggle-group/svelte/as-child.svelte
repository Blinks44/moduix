<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Text alignment">
  <ToggleGroupItem value="left">
    {#snippet asChild(props)}<button {...props()} type="button">Left</button>{/snippet}
  </ToggleGroupItem>
  <ToggleGroupItem value="center">
    {#snippet asChild(props)}<button {...props()} type="button">Center</button>{/snippet}
  </ToggleGroupItem>
  <ToggleGroupItem value="right">
    {#snippet asChild(props)}<button {...props()} type="button">Right</button>{/snippet}
  </ToggleGroupItem>
</ToggleGroup>