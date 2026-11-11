<script lang="ts">
  import { Field } from '@/components/field';
  import { SignaturePad } from '@/components/signature-pad';
  import Parts from './Parts.svelte';
</script>

<Field readOnly>
  <SignaturePad defaultPaths={['M1,1 L2,2']}>
    <Parts label="Read-only signature" />
  </SignaturePad>
</Field>