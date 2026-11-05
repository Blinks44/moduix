<script lang="ts">
  import {
    Dialog,
    DialogCloseIcon,
    DialogContent,
    DialogPositioner,
    DialogTitle,
  } from '@/components/dialog';

  let {
    custom = false,
    label,
    labelledby,
  }: { custom?: boolean; label?: string; labelledby?: string } = $props();
</script>

{#snippet customContent()}<span>Custom close</span>{/snippet}

<Dialog defaultOpen portalled={false}>
  <DialogPositioner>
    <DialogContent>
      <DialogTitle>Preview</DialogTitle>
      <DialogCloseIcon
        aria-label={label}
        aria-labelledby={labelledby}
        class="consumer-close"
        style="color: red"
        title="Dismiss preview"
        data-testid="close"
        children={custom ? customContent : undefined}
      />
    </DialogContent>
  </DialogPositioner>
</Dialog>