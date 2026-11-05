<script lang="ts">
  import { Empty, EmptyTitle } from '@/components/empty';
</script>

<Empty class="consumer-empty">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Projects"><EmptyTitle>No projects</EmptyTitle></section>
  {/snippet}
</Empty>