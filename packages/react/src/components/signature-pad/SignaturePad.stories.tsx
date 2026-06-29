import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { RotateCcwIcon } from '@/lib/moduix/icons/ui';
import { Field } from '../field';
import { SignaturePad, useSignaturePad } from './SignaturePad';
import styles from './SignaturePad.stories.module.css';

const meta = {
  title: 'Components/SignaturePad',
  component: SignaturePad,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SignaturePad>;

export default meta;

type Story = StoryObj<typeof meta>;

function SignaturePadParts(props: ComponentProps<typeof SignaturePad.Root>) {
  return (
    <SignaturePad {...props}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Control>
        <SignaturePad.Segment />
        <SignaturePad.ClearTrigger>
          <RotateCcwIcon aria-hidden="true" />
        </SignaturePad.ClearTrigger>
        <SignaturePad.Guide />
      </SignaturePad.Control>
    </SignaturePad>
  );
}

export const Basic: Story = {
  render: () => <SignaturePadParts />,
};

export const ImagePreview: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = useState('');

    return (
      <div className={styles.preview}>
        <SignaturePadParts
          onDrawEnd={(details) => {
            void details.getDataUrl('image/png').then(setImageUrl);
          }}
        />
        {imageUrl ? <img src={imageUrl} alt="Signature preview" /> : null}
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field className={styles.field} invalid required>
      <SignaturePad name="signature">
        <SignaturePad.Label>Sign below</SignaturePad.Label>
        <SignaturePad.Control>
          <SignaturePad.Segment />
          <SignaturePad.ClearTrigger>
            <RotateCcwIcon aria-hidden="true" />
          </SignaturePad.ClearTrigger>
          <SignaturePad.Guide />
        </SignaturePad.Control>
        <SignaturePad.Context>
          {(api) => <SignaturePad.HiddenInput value={api.paths.join(' ')} />}
        </SignaturePad.Context>
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
      <div className={styles.preview}>
        <SignaturePad.RootProvider value={signaturePad} className={styles.custom}>
          <SignaturePad.Label>Sign below</SignaturePad.Label>
          <SignaturePad.Control>
            <SignaturePad.Segment />
            <SignaturePad.ClearTrigger>
              <RotateCcwIcon aria-hidden="true" />
            </SignaturePad.ClearTrigger>
            <SignaturePad.Guide />
          </SignaturePad.Control>
        </SignaturePad.RootProvider>
        <output className={styles.status}>Paths: {signaturePad.paths.length}</output>
      </div>
    );
  },
};