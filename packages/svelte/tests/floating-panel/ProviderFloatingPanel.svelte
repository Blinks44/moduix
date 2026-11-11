<script lang="ts">
  import { FloatingPanelRootProvider, useFloatingPanel } from '@/components/floating-panel';
  import PanelContent from './PanelContent.svelte';

  const panel = useFloatingPanel({
    id: 'provider-panel',
    defaultSize: { width: 360, height: 260 },
  });
</script>

<div>
  <button type="button" onclick={() => panel().setOpen(true)}>Open via API</button>
  <FloatingPanelRootProvider value={panel} portalled={false}>
    <PanelContent />
  </FloatingPanelRootProvider>
</div>