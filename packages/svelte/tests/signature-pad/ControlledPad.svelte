<script lang="ts">
  import { SignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';

  let { changes }: { changes?: string[][] } = $props();

  let rootRef = $state<HTMLElement | null>(null);
  let paths = $state(['M1,1 L2,2']);

  export const getState = () => ({ paths, rootRef });
  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
</script>

<SignaturePad
  bind:ref={rootRef}
  bind:paths
  data-probe="root"
  {translations}
  onDraw={(details) => changes?.push(details.paths)}
>
  {#snippet asChild(props)}
    <section {...props()} aria-label="Custom signature">
      <Parts label="Custom signature" />
    </section>
  {/snippet}
</SignaturePad>
<output>Paths: {paths.length}</output>