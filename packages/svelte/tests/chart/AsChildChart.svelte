<script lang="ts">
  import { Chart } from '@/components/chart';

  let rootRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ rootRef });
</script>

<Chart bind:ref={rootRef}>
  {#snippet asChild(props)}
    <article {...props()} aria-label="Revenue report">Revenue report</article>
  {/snippet}
</Chart>