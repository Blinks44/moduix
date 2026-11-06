<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelContent,
    FloatingPanelPositioner,
    FloatingPanelTitle,
  } from '@/components/floating-panel';

  let portalTarget: HTMLElement | undefined = $state();
</script>

<div>
  <div data-testid="inline-host">
    <FloatingPanel defaultOpen portalled={false}>
      <FloatingPanelPositioner>
        <FloatingPanelContent><FloatingPanelTitle>Inline</FloatingPanelTitle></FloatingPanelContent>
      </FloatingPanelPositioner>
    </FloatingPanel>
  </div>
  <div bind:this={portalTarget} data-testid="portal-host"></div>
  <FloatingPanel defaultOpen portalRef={() => portalTarget}>
    <FloatingPanelPositioner>
      <FloatingPanelContent>
        <FloatingPanelTitle>Portalled</FloatingPanelTitle>
      </FloatingPanelContent>
    </FloatingPanelPositioner>
  </FloatingPanel>
</div>