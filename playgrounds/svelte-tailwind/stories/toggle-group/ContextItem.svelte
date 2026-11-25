<script lang="ts">
  import { ToggleGroupItem, useToggleGroupContext } from '@/components/toggle-group';
  import { UiIcon } from '@/lib/moduix/icons/ui';

  let { value }: { value: string } = $props();

  const toggleGroup = useToggleGroupContext();
</script>

<ToggleGroupItem {value}>
  {#if toggleGroup().value.includes(value)}<UiIcon icon="check" />{/if}
  {value}
</ToggleGroupItem>