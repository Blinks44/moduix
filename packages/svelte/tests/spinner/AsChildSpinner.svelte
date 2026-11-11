<script lang="ts">
  import { Spinner } from '@/components/spinner';

  let { decorative = false }: { decorative?: boolean } = $props();

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

{#if decorative}
  <Spinner bind:ref decorative>
    {#snippet asChild(props)}
      <span {...props()} data-testid="spinner-host"></span>
    {/snippet}
  </Spinner>
{:else}
  <Spinner bind:ref size="lg" aria-label="Loading report">
    {#snippet asChild(props)}
      <span {...props()}>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring"></span>
        </span>
      </span>
    {/snippet}
  </Spinner>
{/if}