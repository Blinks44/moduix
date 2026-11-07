<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardTrigger,
    type ClipboardCopyStatusDetails,
  } from '@/components/clipboard';

  let { statusChange }: { statusChange?: (details: ClipboardCopyStatusDetails) => void } = $props();
</script>

<Clipboard defaultValue="workspace-secret" timeout={250} onStatusChange={statusChange}>
  <ClipboardControl><ClipboardTrigger>Copy secret</ClipboardTrigger></ClipboardControl>
</Clipboard>