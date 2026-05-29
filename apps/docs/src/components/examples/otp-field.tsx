import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
  SeparatorMarkIcon,
} from 'moduix';
import { useId, useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './otp-field.module.css';

const OTP_LENGTH = 6;

export const otpFieldOverrideCssProperties: CssPropertyInput[] = [
  ['--otp-field-bg', 'var(--color-background)', 'Controls input background.'],
  ['--otp-field-bg-filled', 'var(--otp-field-bg)', 'Controls filled input background.'],
  ['--otp-field-border-color', 'var(--color-border)', 'Controls default input border color.'],
  [
    '--otp-field-border-color-complete',
    'var(--otp-field-border-color)',
    'Controls border color when the field is complete.',
  ],
  [
    '--otp-field-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--otp-field-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--otp-field-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--otp-field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--otp-field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--otp-field-focus-ring-offset', '-1px', 'Controls focus ring offset.'],
  ['--otp-field-focus-ring-width', 'var(--otp-field-border-width)', 'Controls focus ring width.'],
  ['--otp-field-input-height', 'var(--otp-field-input-size)', 'Controls input slot height.'],
  ['--otp-field-input-padding-x', '0', 'Controls horizontal input padding.'],
  ['--otp-field-input-padding-y', '0', 'Controls vertical input padding.'],
  ['--otp-field-input-size', '2.5rem', 'Controls square input slot size.'],
  ['--otp-field-input-width', 'var(--otp-field-input-size)', 'Controls input slot width.'],
  ['--otp-field-font-size', 'var(--text-lg)', 'Controls input font size.'],
  ['--otp-field-font-weight', 'var(--weight-medium)', 'Controls input font weight.'],
  ['--otp-field-gap', 'var(--spacing-2)', 'Controls spacing between slots and separators.'],
  ['--otp-field-line-height', 'var(--line-height-text-lg)', 'Controls input text line height.'],
  ['--otp-field-max-width', 'none', 'Controls the root OTP field max width.'],
  ['--otp-field-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--otp-field-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  ['--otp-field-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--otp-field-separator-height', 'var(--otp-field-separator-size)', 'Controls separator height.'],
  ['--otp-field-separator-size', '1rem', 'Controls separator wrapper width and height.'],
  ['--otp-field-separator-width', 'var(--otp-field-separator-size)', 'Controls separator width.'],
  ['--otp-field-transition', 'var(--transition-default)', 'Controls input state transitions.'],
  ['--otp-field-width', 'auto', 'Controls the root OTP field width.'],
];
export const otpFieldPlaygroundCssProperties: CssPropertyInput[] = [
  ['--otp-field-bg', 'var(--color-background)', 'Controls input background.'],
  ['--otp-field-bg-filled', 'var(--otp-field-bg)', 'Controls filled input background.'],
  ['--otp-field-border-color', 'var(--color-border)', 'Controls default border color.'],
  ['--otp-field-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--otp-field-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--otp-field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--otp-field-gap', 'var(--spacing-2)', 'Controls spacing between slots and separators.'],
  ['--otp-field-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  ['--otp-field-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
];

export function OTPFieldCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={otpFieldOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function OTPFieldCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={otpFieldPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

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

export function OTPFieldExample({
  length = OTP_LENGTH,
  ...props
}: Partial<ComponentProps<typeof OTPField>> & { length?: number } = {}) {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Verification code</FieldLabel>
      <OTPField id={id} length={length} {...props} />
    </Field>
  );
}

export function OTPFieldAlphanumericExample() {
  const id = useId();
  const [value, setValue] = useState('');

  return (
    <div className={styles.stack}>
      <Field className={styles.field}>
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
      <span className={styles.hint}>Current value: {value || 'empty'}</span>
    </div>
  );
}

export function OTPFieldGroupedLayoutExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Auth code</FieldLabel>
      <OTPField id={id} length={OTP_LENGTH} className={styles.groupedRoot}>
        <div className={styles.group}>{renderOTPInputs({ count: 3, total: OTP_LENGTH })}</div>
        <OTPFieldSeparator>
          <SeparatorMarkIcon />
        </OTPFieldSeparator>
        <div className={styles.group}>
          {renderOTPInputs({ count: 3, start: 3, total: OTP_LENGTH })}
        </div>
      </OTPField>
    </Field>
  );
}

export function OTPFieldPlaceholderHintsExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Verification code</FieldLabel>
      <FieldDescription>
        Placeholder hints stay visible until the active slot is focused.
      </FieldDescription>
      <OTPField id={id} length={OTP_LENGTH}>
        {renderOTPInputs({
          count: OTP_LENGTH,
          className: styles.placeholderInput,
          placeholder: '•',
        })}
      </OTPField>
    </Field>
  );
}

export function OTPFieldMaskedExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>PIN</FieldLabel>
      <OTPField id={id} length={4} mask />
    </Field>
  );
}

export function OTPFieldValidationExample() {
  const id = useId();

  return (
    <Field name="verificationCode" validationMode="onBlur" className={styles.field}>
      <FieldLabel htmlFor={id}>Verification code</FieldLabel>
      <OTPField id={id} length={OTP_LENGTH} required />
      <FieldError match="valueMissing">Please enter the verification code.</FieldError>
    </Field>
  );
}

export function OTPFieldAutoSubmitExample() {
  const id = useId();
  const [completedValue, setCompletedValue] = useState('');
  const [submittedValue, setSubmittedValue] = useState('');

  return (
    <form
      className={styles.form}
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
      <span className={styles.hint}>Last completed value: {completedValue || 'empty'}</span>
      <span className={styles.hint}>Last submitted value: {submittedValue || 'empty'}</span>
    </form>
  );
}

export function OTPFieldCustomSanitizationExample() {
  const id = useId();
  const [value, setValue] = useState('');
  const [invalidValue, setInvalidValue] = useState('');

  return (
    <div className={styles.stack}>
      <Field className={styles.field}>
        <FieldLabel htmlFor={id}>Invite code</FieldLabel>
        <FieldDescription>
          <code>validationType=&quot;none&quot;</code> with custom sanitization.
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
      <span className={styles.hint}>Current value: {value || 'empty'}</span>
      <span className={styles.hint}>Last invalid attempt: {invalidValue || 'none'}</span>
    </div>
  );
}

export function OTPFieldCustomSeparatorExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Styled code</FieldLabel>
      <OTPField id={id} length={OTP_LENGTH} className={styles.customRoot}>
        <div className={styles.group}>
          {renderOTPInputs({
            count: 3,
            total: OTP_LENGTH,
            className: styles.customInput,
          })}
        </div>
        <OTPFieldSeparator>
          <SeparatorMarkIcon />
        </OTPFieldSeparator>
        <div className={styles.group}>
          {renderOTPInputs({
            count: 3,
            start: 3,
            total: OTP_LENGTH,
            className: styles.customInput,
          })}
        </div>
      </OTPField>
    </Field>
  );
}