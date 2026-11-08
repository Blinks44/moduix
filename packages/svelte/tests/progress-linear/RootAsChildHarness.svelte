<script lang="ts">
  import {
    ProgressLinear,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';

  let rootRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef });
</script>

<ProgressLinear bind:ref={rootRef} defaultValue={70}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Export status">
      <ProgressLinearTrack aria-label="Export status">
        <ProgressLinearRange />
      </ProgressLinearTrack>
    </section>
  {/snippet}
</ProgressLinear>