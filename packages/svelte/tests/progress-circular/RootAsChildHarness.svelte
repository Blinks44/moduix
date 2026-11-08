<script lang="ts">
  import { ProgressCircular, ProgressCircularRing } from '@/components/progress-circular';

  let rootRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef });
</script>

<ProgressCircular bind:ref={rootRef} defaultValue={70}>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Export status">
      <ProgressCircularRing aria-label="Export status" />
    </section>
  {/snippet}
</ProgressCircular>