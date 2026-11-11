<script lang="ts">
  import { Badge, BadgeDot, BadgeLabel } from '@/components/badge';
</script>

<Badge variant="link">
  {#snippet asChild(props)}
    <a {...props()} href="#styling" aria-label="Badge styling guidance">
      <BadgeDot />
      <BadgeLabel>Open guide</BadgeLabel>
    </a>
  {/snippet}
</Badge>