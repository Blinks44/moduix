import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  useSignaturePad,
  useSignaturePadContext,
} from '@/components/signature-pad/SignaturePad';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';

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

  return <SignaturePad.HiddenInput value={signaturePad.paths.join(' ')} />;
}

function SignaturePadParts({
  label = 'Sign below',
  ...props
}: ComponentProps<typeof SignaturePad.Root> & { label?: string }) {
  return (
    <SignaturePad {...props}>
      <SignaturePad.Label>{label}</SignaturePad.Label>
      <SignaturePad.Canvas />
    </SignaturePad>
  );
}

export const Basic: Story = {
  render: () => <SignaturePadParts />,
};

export const States: Story = {
  render: () => (
    <div className="grid gap-6">
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
    const [imageUrl, setImageUrl] = useState('');

    return (
      <div className="grid justify-items-center gap-4">
        <SignaturePadParts
          onDrawEnd={(details) => {
            void details.getDataUrl('image/png').then(setImageUrl);
          }}
        />
        {imageUrl ? (
          <img className="block h-auto w-70 max-w-full" src={imageUrl} alt="Signature preview" />
        ) : null}
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field className="w-auto items-center" invalid required>
      <SignaturePad name="signature">
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Canvas />
        <SignaturePadFormInput />
      </SignaturePad>
      <FieldHelperText>Use a pointer or touch input to sign.</FieldHelperText>
      <FieldErrorText>Signature is required.</FieldErrorText>
    </Field>
  ),
};

export const RootProvider: Story = {
  render: () => {
    const signaturePad = useSignaturePad();

    return (
      <div className="grid justify-items-center gap-4">
        <SignaturePad.RootProvider value={signaturePad}>
          <SignaturePad.Label>Sign below</SignaturePad.Label>
          <SignaturePad.Control>
            <SignaturePad.Segment className="text-primary" />
            <SignaturePad.ClearTrigger>
              <RotateCcwIcon className="size-4" aria-hidden="true" />
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide className="border-primary/45" />
          </SignaturePad.Control>
          <SignaturePadFormInput />
        </SignaturePad.RootProvider>
        <output className="text-sm leading-5 text-muted-foreground">
          Paths: {signaturePad.paths.length}
        </output>
      </div>
    );
  },
};
