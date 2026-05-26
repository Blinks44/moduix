import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { SeparatorMarkIcon } from '@/icons/ui';
import { Field, FieldDescription, FieldError, FieldLabel } from '../Field';
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

function renderOTPInputs(length: number, className?: string, placeholder?: string) {
  return Array.from({ length }, (_, index) => (
    <OTPFieldInput
      key={index}
      className={className}
      placeholder={placeholder}
      aria-label={index === 0 ? undefined : `Character ${index + 1} of ${length}`}
    />
  ));
}

export const Basic: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Verification code</FieldLabel>
        <OTPField id={id} length={OTP_LENGTH} />
      </Field>
    );
  },
};

export const Alphanumeric: Story = {
  render: () => {
    const id = React.useId();
    const [value, setValue] = React.useState('');

    return (
      <div className={storyStyles.stack}>
        <Field>
          <FieldLabel htmlFor={id}>Recovery code</FieldLabel>
          <FieldDescription>
            Letters and numbers are allowed, for example <code>A7C9XZ</code>.
          </FieldDescription>
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
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Auth code</FieldLabel>
        <OTPField id={id} length={OTP_LENGTH}>
          <div className={storyStyles.group}>{renderOTPInputs(3)}</div>
          <OTPFieldSeparator>
            <SeparatorMarkIcon />
          </OTPFieldSeparator>
          <div className={storyStyles.group}>{renderOTPInputs(3)}</div>
        </OTPField>
      </Field>
    );
  },
};

export const CustomSeparator: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Styled code</FieldLabel>
        <OTPField id={id} length={OTP_LENGTH} className={storyStyles.customRoot}>
          <div className={storyStyles.group}>{renderOTPInputs(3, storyStyles.customInput)}</div>
          <OTPFieldSeparator>
            <SeparatorMarkIcon />
          </OTPFieldSeparator>
          <div className={storyStyles.group}>{renderOTPInputs(3, storyStyles.customInput)}</div>
        </OTPField>
      </Field>
    );
  },
};

export const PlaceholderHints: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>Verification code</FieldLabel>
        <FieldDescription>
          Placeholder hints stay visible until the active slot is focused.
        </FieldDescription>
        <OTPField id={id} length={OTP_LENGTH}>
          {renderOTPInputs(OTP_LENGTH, storyStyles.placeholderInput, '•')}
        </OTPField>
      </Field>
    );
  },
};

export const Masked: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field>
        <FieldLabel htmlFor={id}>PIN</FieldLabel>
        <OTPField id={id} length={4} mask />
      </Field>
    );
  },
};

export const WithFieldValidation: Story = {
  render: () => {
    const id = React.useId();

    return (
      <Field name="verificationCode" validationMode="onBlur">
        <FieldLabel htmlFor={id}>Verification code</FieldLabel>
        <OTPField id={id} length={OTP_LENGTH} required />
        <FieldError match="valueMissing">Please enter the verification code.</FieldError>
      </Field>
    );
  },
};

export const AutoSubmit: Story = {
  render: () => {
    const id = React.useId();
    const [completedValue, setCompletedValue] = React.useState('');
    const [submittedValue, setSubmittedValue] = React.useState('');

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
          <FieldLabel htmlFor={id}>Verification code</FieldLabel>
          <FieldDescription>Form submits automatically when all slots are filled.</FieldDescription>
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
    const id = React.useId();
    const [value, setValue] = React.useState('');
    const [invalidValue, setInvalidValue] = React.useState('');

    return (
      <div className={storyStyles.stack}>
        <Field>
          <FieldLabel htmlFor={id}>Invite code</FieldLabel>
          <FieldDescription>
            <code>validationType=&quot;none&quot;</code> with custom sanitization (uppercase letters
            and digits only).
          </FieldDescription>
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