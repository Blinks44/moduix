<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadContext,
    SignaturePadHiddenInput,
    SignaturePadLabel,
  } from '@moduix/svelte/signature-pad';
  import styles from '@/components/examples/signature-pad/signature-pad-form-serialization.module.css';

  let submitted = $state('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = String(new FormData(form).get('signature') ?? '');
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <SignaturePad name="signature">
    <SignaturePadLabel>Sign below</SignaturePadLabel>
    <SignaturePadCanvas />
    <SignaturePadContext>
      {#snippet render(context)}
        <SignaturePadHiddenInput value={JSON.stringify(context().paths)} />
      {/snippet}
    </SignaturePadContext>
  </SignaturePad>
  <div data-preview-meta>
    <output>Submitted: {submitted}</output>
    <Button type="submit" size="sm">Submit</Button>
  </div>
</form>