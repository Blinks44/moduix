<script lang="ts">
  import { Highlight } from '@/components/highlight';

  let { text }: { text: string } = $props();
</script>

<Highlight ignoreCase exactMatch matchAll query="box" {text} />