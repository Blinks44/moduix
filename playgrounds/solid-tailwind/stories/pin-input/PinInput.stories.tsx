import { createSignal, createUniqueId } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field } from '@/components/field';
import { PinInput, usePinInput } from '@/components/pin-input/PinInput';

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
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
      <PinInput.HiddenInput />
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
          <PinInput.Label>Recovery code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
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
      <PinInput.Label>Auth code</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((index) => (
          <PinInput.Input index={index} />
        ))}
        <PinInput.Separator />
        {[3, 4, 5].map((index) => (
          <PinInput.Input index={index} />
        ))}
      </PinInput.Control>
    </PinInput>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} placeholder="*">
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const Masked: Story = {
  render: () => (
    <PinInput count={4} mask>
      <PinInput.Label>PIN</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  ),
};

export const OtpMode: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} otp name="verificationCode">
      <PinInput.Label>One-time code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const BlurOnComplete: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} blurOnComplete>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInput.Inputs />
      </PinInput.Control>
    </PinInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required>
      <PinInput count={PIN_COUNT}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInput.Inputs />
        </PinInput.Control>
      </PinInput>
      <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
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
          <PinInput.Label>Invite code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
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
        <PinInput.RootProvider value={pinInput}>
          <PinInput.Label>Verification code</PinInput.Label>
          <PinInput.Control>
            <PinInput.Inputs />
          </PinInput.Control>
        </PinInput.RootProvider>
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
      <PinInput.Label>Styled code</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((index) => (
          <PinInput.Input index={index} class="size-12 bg-muted text-xl" />
        ))}
        <PinInput.Separator class="size-6 text-primary" />
        {[3, 4, 5].map((index) => (
          <PinInput.Input index={index} class="size-12 bg-muted text-xl" />
        ))}
      </PinInput.Control>
    </PinInput>
  ),
};