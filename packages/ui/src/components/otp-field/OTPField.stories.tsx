import type { Meta, StoryObj } from '@storybook/react-vite';
import { useId, useState } from 'react';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';
import { Field } from '../field';
import { OTPField, OTPFieldInput, OTPFieldSeparator } from './OTPField';
import storyStyles from './OTPField.stories.module.css';

const OTP_LENGTH = 6;

const meta = {
  title: 'Components/OTPField',
  component: OTPField,
  args: {
    length: OTP_LENGTH,
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OTPField>;

export default meta;

type Story = StoryObj<typeof meta>;

function renderOTPInputs({
  count,
  total = count,
  start = 0,
  className,
  placeholder,
}: {
  count: number;
  total?: number;
  start?: number;
  className?: string;
  placeholder?: string;
}) {
  return Array.from({ length: count }, (_, index) => {
    const position = start + index;

    return (
      <OTPFieldInput
        key={position}
        className={className}
        placeholder={placeholder}
        aria-label={position === 0 ? undefined : `Character ${position + 1} of ${total}`}
      />
    );
  });
}

export const Basic: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Verification code</Field.Label>
        <OTPField id={id} length={OTP_LENGTH} />
      </Field>
    );
  },
};

export const Alphanumeric: Story = {
  render: () => {
    const id = useId();
    const [value, setValue] = useState('');

    return (
      <div className={storyStyles.stack}>
        <Field>
          <Field.Label htmlFor={id}>Recovery code</Field.Label>
          <Field.HelperText>
            Letters and numbers are allowed, for example <code>A7C9XZ</code>.
          </Field.HelperText>
          <OTPField
            id={id}
            length={OTP_LENGTH}
            value={value}
            validationType="alphanumeric"
            onValueChange={setValue}
          />
        </Field>
        <p className={storyStyles.hint}>Current value: {value || 'empty'}</p>
      </div>
    );
  },
};

export const GroupedLayout: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Auth code</Field.Label>
        <OTPField id={id} length={OTP_LENGTH}>
          <div className={storyStyles.group}>
            {renderOTPInputs({ count: 3, total: OTP_LENGTH })}
          </div>
          <OTPFieldSeparator>
            <SeparatorMarkIcon />
          </OTPFieldSeparator>
          <div className={storyStyles.group}>
            {renderOTPInputs({ count: 3, start: 3, total: OTP_LENGTH })}
          </div>
        </OTPField>
      </Field>
    );
  },
};

export const CustomSeparator: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Styled code</Field.Label>
        <OTPField id={id} length={OTP_LENGTH} className={storyStyles.customRoot}>
          <div className={storyStyles.group}>
            {renderOTPInputs({
              count: 3,
              total: OTP_LENGTH,
              className: storyStyles.customInput,
            })}
          </div>
          <OTPFieldSeparator>
            <SeparatorMarkIcon />
          </OTPFieldSeparator>
          <div className={storyStyles.group}>
            {renderOTPInputs({
              count: 3,
              start: 3,
              total: OTP_LENGTH,
              className: storyStyles.customInput,
            })}
          </div>
        </OTPField>
      </Field>
    );
  },
};

export const PlaceholderHints: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Verification code</Field.Label>
        <Field.HelperText>
          Placeholder hints stay visible until the active slot is focused.
        </Field.HelperText>
        <OTPField id={id} length={OTP_LENGTH}>
          {renderOTPInputs({
            count: OTP_LENGTH,
            className: storyStyles.placeholderInput,
            placeholder: '•',
          })}
        </OTPField>
      </Field>
    );
  },
};

export const Masked: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>PIN</Field.Label>
        <OTPField id={id} length={4} mask />
      </Field>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    const id = useId();

    return (
      <Field>
        <Field.Label htmlFor={id}>Verification code</Field.Label>
        <OTPField id={id} length={OTP_LENGTH} required />
        <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
      </Field>
    );
  },
};

export const AutoSubmit: Story = {
  render: () => {
    const id = useId();
    const [completedValue, setCompletedValue] = useState('');
    const [submittedValue, setSubmittedValue] = useState('');

    return (
      <form
        className={storyStyles.form}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          setSubmittedValue(String(formData.get('verificationCode') ?? ''));
        }}
      >
        <Field>
          <Field.Label htmlFor={id}>Verification code</Field.Label>
          <Field.HelperText>Form submits automatically when all slots are filled.</Field.HelperText>
          <OTPField
            id={id}
            name="verificationCode"
            length={OTP_LENGTH}
            autoSubmit
            onValueComplete={(value) => {
              setCompletedValue(value);
            }}
          />
        </Field>
        <p className={storyStyles.hint}>Last completed value: {completedValue || 'empty'}</p>
        <p className={storyStyles.hint}>Last submitted value: {submittedValue || 'empty'}</p>
      </form>
    );
  },
};

export const CustomSanitization: Story = {
  render: () => {
    const id = useId();
    const [value, setValue] = useState('');
    const [invalidValue, setInvalidValue] = useState('');

    return (
      <div className={storyStyles.stack}>
        <Field>
          <Field.Label htmlFor={id}>Invite code</Field.Label>
          <Field.HelperText>
            <code>validationType=&quot;none&quot;</code> with custom sanitization (uppercase letters
            and digits only).
          </Field.HelperText>
          <OTPField
            id={id}
            length={OTP_LENGTH}
            value={value}
            validationType="none"
            normalizeValue={(nextValue) => nextValue.toUpperCase().replace(/[^A-Z0-9]/g, '')}
            onValueChange={setValue}
            onValueInvalid={(nextValue) => {
              setInvalidValue(nextValue);
            }}
          />
        </Field>
        <p className={storyStyles.hint}>Current value: {value || 'empty'}</p>
        <p className={storyStyles.hint}>Last invalid attempt: {invalidValue || 'none'}</p>
      </div>
    );
  },
};