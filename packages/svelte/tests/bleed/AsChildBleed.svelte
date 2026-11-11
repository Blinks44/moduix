<script lang="ts">
  import { Bleed } from '@/components/bleed';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<Bleed bind:ref inline="md" block="sm" class="figure">
  {#snippet asChild(props)}
    <figure {...props()} aria-label="Full-width map"></figure>
  {/snippet}
</Bleed>