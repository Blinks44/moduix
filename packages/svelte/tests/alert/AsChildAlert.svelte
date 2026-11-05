<script lang="ts">
  import { Alert, AlertContent, AlertTitle } from '@/components/alert';

  let rootRef: Element | null = $state(null);
  let titleRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, titleRef });
</script>

<Alert bind:ref={rootRef} role="status">
  {#snippet asChild(props)}
    <section {...props()} aria-label="Release notes">
      <AlertContent>
        <AlertTitle bind:ref={titleRef}>
          {#snippet asChild(titleProps)}
            <h2 {...titleProps()}>Update available</h2>
          {/snippet}
        </AlertTitle>
      </AlertContent>
    </section>
  {/snippet}
</Alert>