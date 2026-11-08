<script lang="ts">
  import { ToggleGroupItem, useToggleGroupContext } from '@/components/toggle-group';

  let { value }: { value: string } = $props();

  const toggleGroup = useToggleGroupContext();
  const selected = $derived(toggleGroup().value.includes(value));
</script>

<ToggleGroupItem {value} data-selected={selected || undefined}>
  {selected ? `Selected ${value}` : value}
</ToggleGroupItem>