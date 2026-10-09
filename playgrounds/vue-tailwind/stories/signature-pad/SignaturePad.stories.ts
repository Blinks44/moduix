import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref, useAttrs } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  SignaturePad,
  SignaturePadCanvas,
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadContext,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRootProvider,
  SignaturePadSegment,
  useSignaturePad,
} from '@/components/signature-pad';
import type { SignaturePadDrawEndDetails } from '@/components/signature-pad';
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
  SignaturePadClearTrigger,
  SignaturePadControl,
  SignaturePadContext,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadParts,
  SignaturePadRootProvider,
  SignaturePadSegment,
  RotateCcwIcon,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return setup?.() ?? {};
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory('<SignaturePadParts />'),
};

export const States: Story = {
  render: renderStory(`
    <div class="grid gap-6">
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
      <div class="grid justify-items-center gap-4">
        <SignaturePadParts @draw-end="handleDrawEnd" />
        <img v-if="imageUrl" class="block h-auto w-70 max-w-full" :src="imageUrl" alt="Signature preview" />
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
    <Field class="w-auto items-center" invalid required>
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
      <div class="grid justify-items-center gap-4">
        <SignaturePadRootProvider :value="signaturePad">
          <SignaturePadLabel>Sign below</SignaturePadLabel>
          <SignaturePadControl>
            <SignaturePadSegment class="text-primary" />
            <SignaturePadClearTrigger>
              <RotateCcwIcon class="size-4" aria-hidden="true" />
            </SignaturePadClearTrigger>
            <SignaturePadGuide class="border-primary/45" />
          </SignaturePadControl>
          <SignaturePadContext v-slot="context">
            <SignaturePadHiddenInput :value="context.paths.join(' ')" />
          </SignaturePadContext>
        </SignaturePadRootProvider>
        <output class="text-sm leading-5 text-muted-foreground">
          Paths: {{ signaturePad.paths.length }}
        </output>
      </div>
    `,
    () => ({ signaturePad: useSignaturePad() }),
  ),
};