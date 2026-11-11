<script lang="ts">
  import { Heading } from '@moduix/svelte/heading';

  const headingText = 'Factory-composed heading';
</script>

<Heading size="xl">
  {#snippet asChild(props)}
    <h2 {...props()}>{headingText}</h2>
  {/snippet}
</Heading>