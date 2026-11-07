<script lang="ts">
  import { Marquee } from '@/components/marquee';
</script>

<Marquee>
  {#snippet asChild(props)}
    <a {...props()} href="/partners" aria-label="Partner logos">Partners</a>
  {/snippet}
</Marquee>