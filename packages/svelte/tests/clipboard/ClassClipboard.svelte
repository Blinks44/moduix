<script lang="ts">
  import {
    Clipboard,
    ClipboardControl,
    ClipboardIndicator,
    ClipboardTrigger,
    ClipboardValueText,
  } from '@/components/clipboard';
</script>

<Clipboard class="consumer-root" defaultValue="moduix/clipboard">
  <ClipboardControl class="consumer-control">
    <ClipboardValueText class="consumer-value" />
    <ClipboardTrigger class="consumer-trigger"><ClipboardIndicator /></ClipboardTrigger>
  </ClipboardControl>
</Clipboard>