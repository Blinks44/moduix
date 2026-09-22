import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  SignaturePadSegment,
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

  return <SignaturePadHiddenInput value={signaturePad.paths.join(' ')} />;
}

function SignaturePadParts({
  label = 'Sign below',
  ...props
}: ComponentProps<typeof SignaturePad> & { label?: string }) {
  return (
    <SignaturePad {...props}>
      <SignaturePadLabel>{label}</SignaturePadLabel>
      <SignaturePadCanvas />
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
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
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
        <SignaturePadRootProvider value={signaturePad}>
          <SignaturePadLabel>Sign below</SignaturePadLabel>
          <SignaturePadControl>
            <SignaturePadSegment className="text-primary" />
            <SignaturePadClearTrigger>
              <RotateCcwIcon className="size-4" aria-hidden="true" />
            </SignaturePadClearTrigger>
            <SignaturePadGuide className="border-primary/45" />
          </SignaturePadControl>
          <SignaturePadFormInput />
        </SignaturePadRootProvider>
        <output className="text-sm leading-5 text-muted-foreground">
          Paths: {signaturePad.paths.length}
        </output>
      </div>
    );
  },
};
