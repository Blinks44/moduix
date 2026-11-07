<script lang="ts">
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadLabel,
    type SignaturePadDrawDetails,
    type SignaturePadDrawEndDetails,
  } from '@/components/signature-pad';

  let {
    onDraw,
    onDrawEnd,
  }: {
    onDraw?: (details: SignaturePadDrawDetails) => void;
    onDrawEnd?: (details: SignaturePadDrawEndDetails) => void;
  } = $props();

  let paths = $state<string[]>([]);

  export const getPaths = () => paths;

  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
</script>

<SignaturePad
  {translations}
  onDraw={(details) => {
    paths = details.paths;
    onDraw?.(details);
  }}
  {onDrawEnd}
>
  <SignaturePadLabel>Signature</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>