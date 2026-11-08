<script lang="ts">
  import { ToggleGroupItem, useToggleGroupContext } from '@/components/toggle-group';
  import { CheckIcon } from '@/lib/moduix/icons/ui';

  let { value }: { value: string } = $props();

  const toggleGroup = useToggleGroupContext();
</script>

<ToggleGroupItem {value}>
  {#if toggleGroup().value.includes(value)}<CheckIcon />{/if}
  {value}
</ToggleGroupItem>