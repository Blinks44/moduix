<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelPositioner,
  } from '@/components/floating-panel';
</script>

<FloatingPanel defaultOpen defaultSize={{ width: 160, height: 96 }} portalled={false}>
  <FloatingPanelPositioner><FloatingPanelContent /></FloatingPanelPositioner>
</FloatingPanel>