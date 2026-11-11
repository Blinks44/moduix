<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadContext,
    SignaturePadHiddenInput,
    SignaturePadLabel,
    SignaturePadRootProvider,
    useSignaturePad,
    type SignaturePadDrawEndDetails,
  } from '@/components/signature-pad';
  import styles from './SignaturePad.stories.module.css';
  import SignaturePadParts from './SignaturePadParts.svelte';

  const { Story } = defineMeta({
    title: 'Components/SignaturePad',
    component: SignaturePad,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let imageUrl = $state('');
  const signaturePad = useSignaturePad({ id: 'signature-pad-root-provider' });

  const handleDrawEnd = (details: SignaturePadDrawEndDetails) => {
    void details.getDataUrl('image/png').then((url) => {
      imageUrl = url;
    });
  };
</script>

<Story name="Basic" asChild>
  <SignaturePadParts />
</Story>

<Story name="States" asChild>
  <div class={styles.states}>
    <SignaturePadParts
      disabled
      defaultPaths={['M45,85 C85,25 145,135 235,65']}
      label="Disabled signature"
    />
    <SignaturePadParts
      readOnly
      defaultPaths={['M45,85 C85,25 145,135 235,65']}
      label="Read-only signature"
    />
  </div>
</Story>

<Story name="Image Preview" exportName="ImagePreview" asChild>
  <div class={styles.preview}>
    <SignaturePadParts onDrawEnd={handleDrawEnd} />
    {#if imageUrl}<img src={imageUrl} alt="Signature preview" />{/if}
  </div>
</Story>

<Story name="With Field" exportName="WithField" asChild>
  <Field class={styles.field} invalid required>
    <SignaturePad name="signature">
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadContext>
        {#snippet render(context)}
          <SignaturePadHiddenInput value={context().paths.join(' ')} />
        {/snippet}
      </SignaturePadContext>
    </SignaturePad>
    <FieldHelperText>Use a pointer or touch input to sign.</FieldHelperText>
    <FieldErrorText>Signature is required.</FieldErrorText>
  </Field>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.preview}>
    <SignaturePadRootProvider value={signaturePad} class={styles.custom}>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadCanvas />
      <SignaturePadContext>
        {#snippet render(context)}
          <SignaturePadHiddenInput value={context().paths.join(' ')} />
        {/snippet}
      </SignaturePadContext>
    </SignaturePadRootProvider>
    <output class={styles.status}>Paths: {signaturePad().paths.length}</output>
  </div>
</Story>