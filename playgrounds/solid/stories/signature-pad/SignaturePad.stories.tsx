import { createSignal } from 'solid-js';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
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

  return <SignaturePadHiddenInput value={signaturePad().paths.join(' ')} />;
}

type SignaturePadPartsProps = ComponentProps<typeof SignaturePad> & { label?: string };

function SignaturePadParts(props: SignaturePadPartsProps) {
  const [local, others] = splitProps(props, ['label']);

  return (
    <SignaturePad {...others}>
      <SignaturePadLabel>{local.label ?? 'Sign below'}</SignaturePadLabel>
      <SignaturePadCanvas />
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
          <SignaturePadLabel>Sign below</SignaturePadLabel>
          <SignaturePadCanvas />
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
      <div class={styles.preview}>
        <SignaturePadRootProvider value={signaturePad} class={styles.custom}>
          <SignaturePadLabel>Sign below</SignaturePadLabel>
          <SignaturePadCanvas />
          <SignaturePadFormInput />
        </SignaturePadRootProvider>
        <output class={styles.status}>Paths: {signaturePad().paths.length}</output>
      </div>
    );
  },
};