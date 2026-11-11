<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardInput,
    ClipboardLabel,
    ClipboardTrigger,
  } from '@/components/clipboard';
</script>

<Clipboard class="gap-4 text-primary" defaultValue="moduix/clipboard">
  <ClipboardLabel>Copy link</ClipboardLabel>
  <ClipboardControl class="gap-5">
    <ClipboardInput class="bg-muted px-0" />
    <ClipboardTrigger class="rounded-lg bg-muted px-2"><ClipboardIndicator /></ClipboardTrigger>
  </ClipboardControl>
</Clipboard>