<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@/components/clipboard';
</script>

<Clipboard defaultValue="disabled-value">
  <ClipboardLabel>Disabled value</ClipboardLabel>
  <ClipboardControl>
    <ClipboardInput disabled />
    <ClipboardTrigger disabled>Copy</ClipboardTrigger>
  </ClipboardControl>
</Clipboard>