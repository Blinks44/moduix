<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelContext,
    FloatingPanelPositioner,
  } from '@/components/floating-panel';
</script>

<FloatingPanel defaultOpen portalled={false}>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelContext>
        {#snippet render(panel)}<output>Open: {String(panel().open)}</output>{/snippet}
      </FloatingPanelContext>
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>