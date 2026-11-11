<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
  import {
    SignaturePad,
    SignaturePadCanvas,
    SignaturePadClearTrigger,
    SignaturePadContext,
    SignaturePadControl,
    SignaturePadGuide,
    SignaturePadHiddenInput,
    SignaturePadLabel,
    SignaturePadRootProvider,
    SignaturePadSegment,
    useSignaturePad,
    type SignaturePadDrawEndDetails,
  } from '@/components/signature-pad';
  import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
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
  <div class="grid gap-6">
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
  <div class="grid justify-items-center gap-4">
    <SignaturePadParts onDrawEnd={handleDrawEnd} />
    {#if imageUrl}<img
        class="block h-auto w-70 max-w-full"
        src={imageUrl}
        alt="Signature preview"
      />{/if}
  </div>
</Story>

<Story name="With Field" exportName="WithField" asChild>
  <Field class="w-auto items-center" invalid required>
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
  <div class="grid justify-items-center gap-4">
    <SignaturePadRootProvider value={signaturePad}>
      <SignaturePadLabel>Sign below</SignaturePadLabel>
      <SignaturePadControl>
        <SignaturePadSegment class="text-primary" />
        <SignaturePadClearTrigger>
          <RotateCcwIcon class="size-4" aria-hidden="true" />
        </SignaturePadClearTrigger>
        <SignaturePadGuide class="border-primary/45" />
      </SignaturePadControl>
      <SignaturePadContext>
        {#snippet render(context)}
          <SignaturePadHiddenInput value={context().paths.join(' ')} />
        {/snippet}
      </SignaturePadContext>
    </SignaturePadRootProvider>
    <output class="text-sm leading-5 text-muted-foreground"
      >Paths: {signaturePad().paths.length}</output
    >
  </div>
</Story>