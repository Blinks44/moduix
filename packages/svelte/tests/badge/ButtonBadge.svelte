<script lang="ts">
  import { Badge } from '@/components/badge';
</script>

<Badge variant="secondary">
  {#snippet asChild(props)}
    <button {...props()} disabled>Archived</button>
  {/snippet}
</Badge>