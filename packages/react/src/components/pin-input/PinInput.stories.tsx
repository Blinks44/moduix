import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { Field } from '../field';
import { PinInput, usePinInput } from './PinInput';
import storyStyles from './PinInput.stories.module.css';

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

function PinInputSlots({ count = PIN_COUNT }: { count?: number }) {
  return Array.from({ length: count }, (_, index) => <PinInput.Input key={index} index={index} />);
}

export const Basic: Story = {
  render: () => (
    <PinInput count={PIN_COUNT}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const DefaultComposition: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} aria-label="Verification code" name="verificationCode" />
  ),
};

export const Alphanumeric: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div className={storyStyles.stack}>
        <PinInput
          count={PIN_COUNT}
          type="alphanumeric"
          value={value}
          onValueChange={(details) => {
            setValue(details.value);
          }}
        >
          <PinInput.Label>Recovery code</PinInput.Label>
          <PinInput.Control>
            <PinInputSlots />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput>
        <p className={storyStyles.hint}>Current value: {value.join('') || 'empty'}</p>
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
          <PinInput.Input key={index} index={index} />
        ))}
        <PinInput.Separator />
        {[3, 4, 5].map((index) => (
          <PinInput.Input key={index} index={index} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const Placeholder: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} placeholder="*">
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
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
        <PinInputSlots count={4} />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const OtpMode: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} otp name="verificationCode">
      <PinInput.Label>One-time code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
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
        <PinInputSlots />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};

export const WithFieldValidation: Story = {
  render: () => (
    <Field invalid required>
      <PinInput count={PIN_COUNT}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInputSlots />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
      <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
    </Field>
  ),
};

export const InvalidValue: Story = {
  render: () => {
    const [invalidValue, setInvalidValue] = useState('');

    return (
      <div className={storyStyles.stack}>
        <PinInput
          count={PIN_COUNT}
          type="alphabetic"
          onValueInvalid={(details) => {
            setInvalidValue(details.value);
          }}
        >
          <PinInput.Label>Invite code</PinInput.Label>
          <PinInput.Control>
            <PinInputSlots />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput>
        <p className={storyStyles.hint}>Last rejected character: {invalidValue || 'none'}</p>
      </div>
    );
  },
};

export const RootProvider: Story = {
  render: () => {
    const id = useId();
    const pinInput = usePinInput({ id, count: PIN_COUNT });

    return (
      <div className={storyStyles.stack}>
        <PinInput.RootProvider value={pinInput}>
          <PinInput.Label>Verification code</PinInput.Label>
          <PinInput.Control>
            <PinInputSlots />
          </PinInput.Control>
          <PinInput.HiddenInput />
        </PinInput.RootProvider>
        <button type="button" onClick={pinInput.clearValue}>
          Clear value
        </button>
      </div>
    );
  },
};

export const CustomStyling: Story = {
  render: () => (
    <PinInput count={PIN_COUNT} className={storyStyles.customRoot}>
      <PinInput.Label>Styled code</PinInput.Label>
      <PinInput.Control>
        {[0, 1, 2].map((index) => (
          <PinInput.Input key={index} index={index} className={storyStyles.customInput} />
        ))}
        <PinInput.Separator />
        {[3, 4, 5].map((index) => (
          <PinInput.Input key={index} index={index} className={storyStyles.customInput} />
        ))}
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  ),
};