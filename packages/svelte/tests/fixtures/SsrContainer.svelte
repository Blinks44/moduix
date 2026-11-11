<script lang="ts">
  import { Container } from '@/components/container';
</script>

<Container size="md" gutter="lg">
  {#snippet asChild(props)}
    <main {...props()} aria-label="Page content"></main>
  {/snippet}
</Container>