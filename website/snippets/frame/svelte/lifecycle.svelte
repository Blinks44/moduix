<script lang="ts">
  import { Frame } from '@ark-ui/svelte/frame';

  let frame = $state<HTMLIFrameElement | null>(null);

  const handleMount = () => {
    const frameDocument = frame?.contentDocument;
    if (!frameDocument) return;
    const script = frameDocument.createElement('script');
    script.textContent = 'document.body.dataset.ready = "true";';
    frameDocument.body.append(script);
  };

  const handleUnmount = () => {
    // Release application-owned listeners and other resources here.
  };
</script>

<Frame bind:ref={frame} title="Interactive preview" onMount={handleMount} onUnmount={handleUnmount}>
  <main>Interactive preview</main>
</Frame>