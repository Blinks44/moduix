<script lang="ts">
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadContext,
    SignaturePadHiddenInput,
    SignaturePadLabel,
  } from '@moduix/svelte/signature-pad';
  import styles from '@/components/examples/signature-pad/signature-pad-field.module.css';

  const signatureName = 'signature';
</script>

<Field class={styles.root} invalid required>
  <SignaturePad name={signatureName}>
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
    <SignaturePadContext>
      {#snippet render(context)}
        <SignaturePadHiddenInput value={JSON.stringify(context().paths)} />
      {/snippet}
    </SignaturePadContext>
  </SignaturePad>
  <FieldHelperText>Use pointer or touch input to add a signature.</FieldHelperText>
  <FieldErrorText>Signature is required.</FieldErrorText>
</Field>