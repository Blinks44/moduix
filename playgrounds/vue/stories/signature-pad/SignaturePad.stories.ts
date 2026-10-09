import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, useAttrs } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadContext,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  useSignaturePad,
} from '@/components/signature-pad';
import type { SignaturePadDrawEndDetails } from '@/components/signature-pad';
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

const SignaturePadParts = defineComponent({
  components: { SignaturePad, SignaturePadCanvas, SignaturePadLabel },
  inheritAttrs: false,
  props: {
    label: { type: String, default: 'Sign below' },
  },
  setup(props) {
    return { attrs: useAttrs(), label: props.label };
  },
  template: `
    <SignaturePad v-bind="attrs">
      <SignaturePadLabel>{{ label }}</SignaturePadLabel>
      <SignaturePadCanvas />
    </SignaturePad>
  `,
});

const storyComponents = {
  Field,
  FieldErrorText,
  FieldHelperText,
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadContext,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadParts,
  SignaturePadRootProvider,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { styles, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<SignaturePadParts />'),
};

export const States: Story = {
  render: renderStory(`
    <div :class="styles.states">
      <SignaturePadParts
        disabled
        :default-paths="['M45,85 C85,25 145,135 235,65']"
        label="Disabled signature"
      />
      <SignaturePadParts
        read-only
        :default-paths="['M45,85 C85,25 145,135 235,65']"
        label="Read-only signature"
      />
    </div>
  `),
};

export const ImagePreview: Story = {
  render: renderStory(
    `
      <div :class="styles.preview">
        <SignaturePadParts @draw-end="handleDrawEnd" />
        <img v-if="imageUrl" :src="imageUrl" alt="Signature preview" />
      </div>
    `,
    () => {
      const imageUrl = ref('');
      const handleDrawEnd = (details: SignaturePadDrawEndDetails) => {
        void details.getDataUrl('image/png').then((url) => {
          imageUrl.value = url;
        });
      };

      return { handleDrawEnd, imageUrl };
    },
  ),
};

export const WithField: Story = {
  render: renderStory(`
    <Field :class="styles.field" invalid required>
      <SignaturePad name="signature">
        <SignaturePadLabel>Sign below</SignaturePadLabel>
        <SignaturePadCanvas />
        <SignaturePadContext v-slot="context">
          <SignaturePadHiddenInput :value="context.paths.join(' ')" />
        </SignaturePadContext>
      </SignaturePad>
      <FieldHelperText>Use a pointer or touch input to sign.</FieldHelperText>
      <FieldErrorText>Signature is required.</FieldErrorText>
    </Field>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div :class="styles.preview">
        <SignaturePadRootProvider :value="signaturePad" :class="styles.custom">
          <SignaturePadLabel>Sign below</SignaturePadLabel>
          <SignaturePadCanvas />
          <SignaturePadContext v-slot="context">
            <SignaturePadHiddenInput :value="context.paths.join(' ')" />
          </SignaturePadContext>
        </SignaturePadRootProvider>
        <output :class="styles.status">Paths: {{ signaturePad.paths.length }}</output>
      </div>
    `,
    () => ({ signaturePad: useSignaturePad() }),
  ),
};