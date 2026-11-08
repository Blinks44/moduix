<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let { changes }: { changes: string[][] } = $props();
</script>

<ToggleGroup
  multiple
  defaultValue={['bold']}
  aria-label="Formatting"
  onValueChange={(details) => changes.push(details.value)}
>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
</ToggleGroup>