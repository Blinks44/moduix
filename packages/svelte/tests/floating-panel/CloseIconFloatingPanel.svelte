<script lang="ts">
  import {
    FloatingPanel,
    FloatingPanelCloseIcon,
    FloatingPanelContent,
    FloatingPanelPositioner,
    FloatingPanelTitle,
  } from '@/components/floating-panel';

  let {
    label,
    labelledby,
    custom = false,
  }: { label?: string; labelledby?: string; custom?: boolean } = $props();
</script>

{#snippet customClose()}<span>Custom close</span>{/snippet}

<FloatingPanel defaultOpen portalled={false}>
  <FloatingPanelPositioner>
    <FloatingPanelContent>
      <FloatingPanelTitle>Preview</FloatingPanelTitle>
      <FloatingPanelCloseIcon
        aria-label={label}
        aria-labelledby={labelledby}
        class="consumer-close"
        style="color: red"
        title="Dismiss preview"
        data-testid="close"
        children={custom ? customClose : undefined}
      />
    </FloatingPanelContent>
  </FloatingPanelPositioner>
</FloatingPanel>