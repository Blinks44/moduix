<script lang="ts">
  import { SignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';
</script>

<form>
  <SignaturePad defaultPaths={['M1,1 L2,2']} name="signature">
    <Parts />
  </SignaturePad>
</form>