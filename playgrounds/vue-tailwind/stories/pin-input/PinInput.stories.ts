import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, ref } from 'vue';
import type { Component } from 'vue';
import { Field, FieldErrorText } from '@/components/field';
import {
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
  usePinInput,
} from '@/components/pin-input';

const PIN_COUNT = 6;
const firstIndexes = [0, 1, 2];
const lastIndexes = [3, 4, 5];

const meta = {
  title: 'Components/PinInput',
  component: PinInput,
  args: {
    count: PIN_COUNT,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = {
  Field,
  FieldErrorText,
  PinInput,
  PinInputControl,
  PinInputHiddenInput,
  PinInputInput,
  PinInputInputs,
  PinInputLabel,
  PinInputRootProvider,
  PinInputSeparator,
} as unknown as Record<string, Component>;

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return {
          firstIndexes,
          lastIndexes,
          PIN_COUNT,
          ...setup?.(),
        };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  `),
};

export const Alphanumeric: Story = {
  render: renderStory(
    `
      <div class="grid items-start gap-3">
        <PinInput v-model="value" :count="PIN_COUNT" type="alphanumeric">
          <PinInputLabel>Recovery code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
        <p class="m-0 text-xs leading-4 text-muted-foreground">Current value: {{ value.join('') || 'empty' }}</p>
      </div>
    `,
    () => ({ value: ref<string[]>([]) }),
  ),
};

export const GroupedLayout: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT">
      <PinInputLabel>Auth code</PinInputLabel>
      <PinInputControl>
        <PinInputInput v-for="index in firstIndexes" :key="index" :index="index" />
        <PinInputSeparator />
        <PinInputInput v-for="index in lastIndexes" :key="index" :index="index" />
      </PinInputControl>
    </PinInput>
  `),
};

export const Placeholder: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT" placeholder="*">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  `),
};

export const Masked: Story = {
  render: renderStory(`
    <PinInput :count="4" mask>
      <PinInputLabel>PIN</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  `),
};

export const OtpMode: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT" otp name="verificationCode">
      <PinInputLabel>One-time code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  `),
};

export const BlurOnComplete: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT" blur-on-complete>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  `),
};

export const WithFieldValidation: Story = {
  render: renderStory(`
    <Field invalid required>
      <PinInput :count="PIN_COUNT">
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <FieldErrorText>Please enter the verification code.</FieldErrorText>
    </Field>
  `),
};

export const InvalidValue: Story = {
  render: renderStory(
    `
      <div class="grid items-start gap-3">
        <PinInput
          :count="PIN_COUNT"
          type="alphabetic"
          @value-invalid="invalidValue = $event.value"
        >
          <PinInputLabel>Invite code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
        <p class="m-0 text-xs leading-4 text-muted-foreground">Last rejected character: {{ invalidValue || 'none' }}</p>
      </div>
    `,
    () => ({ invalidValue: ref('') }),
  ),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div class="grid items-start gap-3">
        <PinInputRootProvider :value="pinInput">
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInputRootProvider>
        <button type="button" @click="pinInput.clearValue">Clear value</button>
      </div>
    `,
    () => ({ pinInput: usePinInput({ count: PIN_COUNT }) }),
  ),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <PinInput :count="PIN_COUNT">
      <PinInputLabel>Styled code</PinInputLabel>
      <PinInputControl>
        <PinInputInput
          v-for="index in firstIndexes"
          :key="index"
          :index="index"
          class="size-12 bg-muted text-xl"
        />
        <PinInputSeparator class="size-6 text-primary" />
        <PinInputInput
          v-for="index in lastIndexes"
          :key="index"
          :index="index"
          class="size-12 bg-muted text-xl"
        />
      </PinInputControl>
    </PinInput>
  `),
};