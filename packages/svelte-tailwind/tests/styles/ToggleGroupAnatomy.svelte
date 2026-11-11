<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let { changes }: { changes: string[][] } = $props();
  let rootRef: Element | null = $state(null);
  let itemRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, itemRef });
</script>

<ToggleGroup
  bind:ref={rootRef}
  defaultValue={['left']}
  aria-label="Alignment"
  data-probe="root"
  onValueChange={(details) => changes.push(details.value)}
>
  <ToggleGroupItem bind:ref={itemRef} value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>