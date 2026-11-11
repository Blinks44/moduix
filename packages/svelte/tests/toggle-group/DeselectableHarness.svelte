<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';
</script>

<ToggleGroup deselectable={false} defaultValue={['left']} aria-label="Required selection">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
</ToggleGroup>