<script lang="ts">
  import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@/components/signature-pad';

  let canvasRef = $state<HTMLElement | null>(null);

  export const getRefs = () => ({ canvasRef });

  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
</script>

<SignaturePad {translations}>
  <SignaturePadLabel>Signature</SignaturePadLabel>
  <SignaturePadCanvas
    bind:ref={canvasRef}
    aria-label="Contract signature area"
    data-testid="canvas"
  />
</SignaturePad>