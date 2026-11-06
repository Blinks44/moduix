<script lang="ts">
  import { Lightbox, LightboxTrigger } from '@/components/lightbox';

  let composed: Element | null = $state(null);

  export const getComposed = () => composed;
</script>

<Lightbox>
  <LightboxTrigger bind:ref={composed}>
    {#snippet asChild(props)}<a {...props()} href="/preview">Composed trigger</a>{/snippet}
  </LightboxTrigger>
</Lightbox>