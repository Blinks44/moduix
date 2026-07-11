import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { Field } from '../field';
import { SignaturePad, useSignaturePad, useSignaturePadContext } from './SignaturePad';
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

function SignaturePadHiddenValue() {
  const signaturePad = useSignaturePadContext();

  return <SignaturePad.HiddenInput value={signaturePad.paths.join(' ')} />;
}

function SignaturePadParts(props: ComponentProps<typeof SignaturePad.Root>) {
  return (
    <SignaturePad {...props}>
      <SignaturePad.Label>Sign below</SignaturePad.Label>
      <SignaturePad.Canvas />
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
        <SignaturePad.Canvas />
        <SignaturePadHiddenValue />
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
          <SignaturePad.Canvas />
        </SignaturePad.RootProvider>
        <output className={styles.status}>Paths: {signaturePad.paths.length}</output>
      </div>
    );
  },
};