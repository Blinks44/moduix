<script lang="ts">
  import { FloatingPanel, FloatingPanelFooter } from '@/components/floating-panel';
  import PanelContent from './PanelContent.svelte';
</script>

<FloatingPanel defaultOpen portalled={false} defaultSize={{ width: 360, height: 260 }}>
  <PanelContent><FloatingPanelFooter data-testid="footer">Status</FloatingPanelFooter></PanelContent
  >
</FloatingPanel>