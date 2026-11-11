<script lang="ts">
  import {
    ToggleGroupItem,
    ToggleGroupRootProvider,
    useToggleGroup,
  } from '@/components/toggle-group';
  import ContextAwareItem from './ContextAwareItem.svelte';

  const toggleGroup = useToggleGroup({ id: 'provider-toggle-group', defaultValue: ['left'] });
</script>

<ToggleGroupRootProvider value={toggleGroup} aria-label="Alignment">
  <ContextAwareItem value="left" />
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
</ToggleGroupRootProvider>