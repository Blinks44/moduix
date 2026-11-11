<script lang="ts">
  import { SignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';

  let {
    disabled,
    drawEnds,
    label,
    readOnly,
  }: {
    disabled?: boolean;
    drawEnds?: string[][];
    label?: string;
    readOnly?: boolean;
  } = $props();

  const translations = { clearTrigger: 'Clear signature', control: 'Signature drawing area' };
</script>

<SignaturePad
  defaultPaths={['M1,1 L2,2']}
  {disabled}
  {readOnly}
  {translations}
  onDrawEnd={(details) => drawEnds?.push(details.paths)}
>
  <Parts {label} />
</SignaturePad>