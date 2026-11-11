<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Alignment">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroup>