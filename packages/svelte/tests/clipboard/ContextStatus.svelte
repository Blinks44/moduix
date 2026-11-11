<script lang="ts">
  import { useClipboardContext } from '@/components/clipboard';

  const clipboard = useClipboardContext();
</script>

<output>{clipboard().value}:{String(clipboard().copied)}</output>