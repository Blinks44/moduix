<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let { changes }: { changes: string[][] } = $props();
  let value = $state<string[]>(['left']);

  export const getValue = () => value;
</script>

<ToggleGroup
  bind:value
  aria-label="Alignment"
  onValueChange={(details) => changes.push(details.value)}
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroup>
<output>Selected: {value.join(', ') || 'empty'}</output>