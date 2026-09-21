import { createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  useSignaturePad,
  useSignaturePadContext,
} from '@/components/signature-pad/SignaturePad';
import styles from './SignaturePad.stories.module.css';

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
  ),
};

export const ImagePreview: Story = {
  render: () => {
    const [imageUrl, setImageUrl] = createSignal('');

    return (
      <div class={styles.preview}>
        <SignaturePad
          onDrawEnd={(details) => {
            void details.getDataUrl('image/png').then(setImageUrl);
          }}
        >
          <SignaturePad.Label>Sign below</SignaturePad.Label>
          <SignaturePad.Canvas />
        </SignaturePad>
        {imageUrl() ? <img src={imageUrl()} alt="Signature preview" /> : null}
      </div>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field class={styles.field} invalid required>
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
      <div class={styles.preview}>
        <SignaturePad.RootProvider value={signaturePad} class={styles.custom}>
          <SignaturePad.Label>Sign below</SignaturePad.Label>
          <SignaturePad.Canvas />
          <SignaturePadFormInput />
        </SignaturePad.RootProvider>
        <output class={styles.status}>Paths: {signaturePad().paths.length}</output>
      </div>
    );
  },
};
