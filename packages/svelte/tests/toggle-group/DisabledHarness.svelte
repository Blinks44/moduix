<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Disabled alignment" disabled>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
</ToggleGroup>