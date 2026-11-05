<script lang="ts">
  import { Button } from '@/components/button';
</script>

<Button variant="outline">
  {#snippet asChild(props)}<a {...props()} href="#docs">Read the docs</a>{/snippet}
</Button>