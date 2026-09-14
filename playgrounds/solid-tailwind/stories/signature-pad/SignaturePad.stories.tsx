import { createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field';
import {
  SignaturePad,
  useSignaturePad,
  useSignaturePadContext,
} from '@/components/signature-pad/SignaturePad';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui/Icons';

const meta = {
  title: 'Components/SignaturePad',
  component: SignaturePad,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SignaturePad>;

export default meta;

type Story = StoryObj<typeof meta>;

function SignaturePadFormInput() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePad.HiddenInput value={signaturePad().paths.join(' ')} />;
}

type SignaturePadPartsProps = ComponentProps<typeof SignaturePad.Root> & { label?: string };

function SignaturePadParts(props: SignaturePadPartsProps) {
  const [local, others] = splitProps(props, ['label']);

  return (
    <SignaturePad {...others}>
      <SignaturePad.Label>{local.label ?? 'Sign below'}</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}

export const Basic: Story = {
  render: () => <SignaturePadParts />,
};

export const States: Story = {
  render: () => (
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
  ),
};

export const ImagePreview: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = createSignal('');

    return (
      <div class="grid justify-items-center gap-4">
        <SignaturePadParts
          onDrawEnd={(details) => {
            void details.getDataUrl('image/png').then(setImageUrl);
          }}
        />
        {imageUrl() ? (
          <img class="block h-auto w-70 max-w-full" src={imageUrl()} alt="Signature preview" />
        ) : null}
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field class="w-auto items-center" invalid required>
      <SignaturePad name="signature">
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <Field.HelperText>Use a pointer or touch input to sign.</Field.HelperText>
      <Field.ErrorText>Signature is required.</Field.ErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const signaturePad = useSignaturePad();

    return (
      <div class="grid justify-items-center gap-4">
        <SignaturePad.RootProvider value={signaturePad}>
          <SignaturePad.Label>Sign below</SignaturePad.Label>
          <SignaturePad.Control>
            <SignaturePad.Segment class="text-primary" />
            <SignaturePad.ClearTrigger>
              <RotateCcwIcon class="size-4" aria-hidden="true" />
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide class="border-primary/45" />
          </SignaturePad.Control>
          <SignaturePadFormInput />
        </SignaturePad.RootProvider>
        <output class="text-sm leading-5 text-muted-foreground">
          Paths: {signaturePad().paths.length}
        </output>
      </div>
    );
  },
};