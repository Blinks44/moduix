import { createSignal, createUniqueId } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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
} from '@/components/pin-input/PinInput';

const PIN_COUNT = 6;

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

export const Basic: Story = {
  render: () => (
    <PinInput count={PIN_COUNT}>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  ),
};

export const Alphanumeric: Story = {
  render: () => {
    const [value, setValue] = createSignal<string[]>([]);

    return (
      <div class="grid items-start gap-3">
        <PinInput
          count={PIN_COUNT}
          type="alphanumeric"
          value={value()}
          onValueChange={(details) => {
            setValue(details.value);
          }}
        >
          <PinInputLabel>Recovery code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
        <p class="m-0 text-xs leading-4 text-muted-foreground">
          Current value: {value().join('') || 'empty'}
        </p>
      </div>
    );
  },
};

export const GroupedLayout: Story = {
  render: () => (
    <PinInput count={PIN_COUNT}>
      <PinInputLabel>Auth code</PinInputLabel>
      <PinInputControl>
        {[0, 1, 2].map((index) => (
          <PinInputInput index={index} />
        ))}
        <PinInputSeparator />
        {[3, 4, 5].map((index) => (
          <PinInputInput index={index} />
        ))}
      </PinInputControl>
    </PinInput>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} placeholder="*">
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  ),
};

export const Masked: Story = {
  render: () => (
    <PinInput count={4} mask>
      <PinInputLabel>PIN</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  ),
};

export const OtpMode: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} otp name="verificationCode">
      <PinInputLabel>One-time code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
      <PinInputHiddenInput />
    </PinInput>
  ),
};

export const BlurOnComplete: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} blurOnComplete>
      <PinInputLabel>Verification code</PinInputLabel>
      <PinInputControl>
        <PinInputInputs />
      </PinInputControl>
    </PinInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required>
      <PinInput count={PIN_COUNT}>
        <PinInputLabel>Verification code</PinInputLabel>
        <PinInputControl>
          <PinInputInputs />
        </PinInputControl>
      </PinInput>
      <FieldErrorText>Please enter the verification code.</FieldErrorText>
    </Field>
  ),
};

export const InvalidValue: Story = {
  render: () => {
    const [invalidValue, setInvalidValue] = createSignal('');

    return (
      <div class="grid items-start gap-3">
        <PinInput
          count={PIN_COUNT}
          type="alphabetic"
          onValueInvalid={(details) => {
            setInvalidValue(details.value);
          }}
        >
          <PinInputLabel>Invite code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
        <p class="m-0 text-xs leading-4 text-muted-foreground">
          Last rejected character: {invalidValue() || 'none'}
        </p>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const pinInput = usePinInput({ id: createUniqueId(), count: PIN_COUNT });

    return (
      <div class="grid items-start gap-3">
        <PinInputRootProvider value={pinInput}>
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInputRootProvider>
        <button type="button" onClick={() => pinInput().clearValue()}>
          Clear value
        </button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <PinInput count={PIN_COUNT}>
      <PinInputLabel>Styled code</PinInputLabel>
      <PinInputControl>
        {[0, 1, 2].map((index) => (
          <PinInputInput index={index} class="size-12 bg-muted text-xl" />
        ))}
        <PinInputSeparator class="size-6 text-primary" />
        {[3, 4, 5].map((index) => (
          <PinInputInput index={index} class="size-12 bg-muted text-xl" />
        ))}
      </PinInputControl>
    </PinInput>
  ),
};