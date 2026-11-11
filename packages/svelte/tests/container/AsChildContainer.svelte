<script lang="ts">
  import { Container } from '@/components/container';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<Container bind:ref size="md" gutter="lg" class="semantic-root">
  {#snippet asChild(props)}
    <main {...props()} aria-label="Page content"></main>
  {/snippet}
</Container>