<script lang="ts">
  import { SimpleGrid } from '@/components/simple-grid';
</script>

<SimpleGrid minChildWidth="10rem" gap={12} class="hydrated-grid">
  {#snippet asChild(props)}
    <ul {...props()} aria-label="Projects">
      <li>Analytics</li>
    </ul>
  {/snippet}
</SimpleGrid>