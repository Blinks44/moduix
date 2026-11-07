<script lang="ts">
  import { SignaturePad, SignaturePadCanvas, SignaturePadLabel } from '@/components/signature-pad';
</script>

<SignaturePad
  defaultPaths={['M1,1 L2,2']}
  translations={{ clearTrigger: 'Clear signature', control: 'Signature drawing area' }}
>
  <SignaturePadLabel>Signature</SignaturePadLabel>
  <SignaturePadCanvas />
</SignaturePad>