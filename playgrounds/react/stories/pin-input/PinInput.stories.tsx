import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
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
          <PinInputLabel>Recovery code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInput>
        <p className={storyStyles.hint}>Current value: {value.join('') || 'empty'}</p>
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
          <PinInputInput key={index} index={index} />
        ))}
        <PinInputSeparator />
        {[3, 4, 5].map((index) => (
          <PinInputInput key={index} index={index} />
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
          <PinInputLabel>Invite code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
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
        <PinInputRootProvider value={pinInput}>
          <PinInputLabel>Verification code</PinInputLabel>
          <PinInputControl>
            <PinInputInputs />
          </PinInputControl>
        </PinInputRootProvider>
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
      <PinInputLabel>Styled code</PinInputLabel>
      <PinInputControl>
        {[0, 1, 2].map((index) => (
          <PinInputInput key={index} index={index} className={storyStyles.customInput} />
        ))}
        <PinInputSeparator />
        {[3, 4, 5].map((index) => (
          <PinInputInput key={index} index={index} className={storyStyles.customInput} />
        ))}
      </PinInputControl>
    </PinInput>
  ),
};