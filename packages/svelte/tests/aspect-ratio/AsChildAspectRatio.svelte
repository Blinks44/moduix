<script lang="ts">
  import { AspectRatio } from '@/components/aspect-ratio';

  let ref: Element | null = $state(null);

  export const getRef = () => ref;
</script>

<AspectRatio bind:ref ratio={16 / 9} class="frame">
  {#snippet asChild(props)}
    <figure {...props({ class: 'figure' })} aria-label="Mountain landscape"></figure>
  {/snippet}
</AspectRatio>