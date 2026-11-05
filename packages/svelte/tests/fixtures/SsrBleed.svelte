<script lang="ts">
  import { Bleed } from '@/components/bleed';
</script>

<Bleed inline="md" block="sm">
  {#snippet asChild(props)}
    <figure {...props()} aria-label="Full-width map"></figure>
  {/snippet}
</Bleed>