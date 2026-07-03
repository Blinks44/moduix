import { Field, PinInput, usePinInput } from '@moduix/react';
import { useId, useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './pin-input.module.css';

export const pinInputCount = 6;
export const pinInputIndexes = Array.from({ length: pinInputCount }, (_, index) => index);
export const shortPinInputIndexes = [0, 1, 2, 3];

export const pinInputOverrideCssProperties: CssPropertyInput[] = [
  ['--pin-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--pin-input-border-color', 'var(--color-border)', 'Controls default input border color.'],
  [
    '--pin-input-border-color-complete',
    'var(--pin-input-border-color)',
    'Controls complete input border color.',
  ],
  [
    '--pin-input-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--pin-input-border-width', 'var(--border-width-sm)', 'Controls input border width.'],
  ['--pin-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--pin-input-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--pin-input-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--pin-input-focus-ring-offset', '-1px', 'Controls focus ring offset.'],
  ['--pin-input-focus-ring-width', 'var(--pin-input-border-width)', 'Controls focus ring width.'],
  ['--pin-input-font-size', 'var(--text-lg)', 'Controls input font size.'],
  ['--pin-input-font-weight', 'var(--weight-medium)', 'Controls input font weight.'],
  ['--pin-input-gap', 'var(--spacing-2)', 'Controls spacing between inputs.'],
  ['--pin-input-input-height', 'var(--pin-input-input-size)', 'Controls input slot height.'],
  ['--pin-input-input-padding-x', '0', 'Controls horizontal input padding.'],
  ['--pin-input-input-padding-y', '0', 'Controls vertical input padding.'],
  ['--pin-input-input-size', '2.5rem', 'Controls square input slot size.'],
  ['--pin-input-input-width', 'var(--pin-input-input-size)', 'Controls input slot width.'],
  ['--pin-input-label-color', 'var(--color-foreground)', 'Controls label color.'],
  ['--pin-input-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--pin-input-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--pin-input-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--pin-input-line-height', 'var(--line-height-text-lg)', 'Controls input line height.'],
  ['--pin-input-max-width', 'none', 'Controls root max width.'],
  ['--pin-input-placeholder-color', 'var(--color-muted-foreground)', 'Controls placeholder color.'],
  ['--pin-input-radius', 'var(--radius-md)', 'Controls input corner radius.'],
  ['--pin-input-root-gap', 'var(--spacing-2)', 'Controls root spacing between label and control.'],
  ['--pin-input-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--pin-input-separator-height', 'var(--pin-input-separator-size)', 'Controls separator height.'],
  ['--pin-input-separator-size', '1rem', 'Controls separator width and height.'],
  ['--pin-input-separator-width', 'var(--pin-input-separator-size)', 'Controls separator width.'],
  ['--pin-input-transition', 'var(--transition-default)', 'Controls input state transitions.'],
  ['--pin-input-width', 'auto', 'Controls root width.'],
];

export function PinInputCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={pinInputOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function PinInputSlots({ indexes = pinInputIndexes }: { indexes?: number[] }) {
  return indexes.map((index) => <PinInput.Input key={index} index={index} />);
}

export function PinInputExample() {
  return (
    <PinInput count={pinInputCount}>
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

export function PinInputPlaceholderExample() {
  return (
    <PinInput count={pinInputCount} placeholder="*">
      <PinInput.Label>Verification code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

export function PinInputBlurOnCompleteExample() {
  const [completedValue, setCompletedValue] = useState('');

  return (
    <div className={styles.stack}>
      <PinInput
        count={pinInputCount}
        blurOnComplete
        onValueComplete={(details) => {
          setCompletedValue(details.valueAsString);
        }}
      >
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInputSlots />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
      <span className={styles.hint}>Completed value: {completedValue || 'empty'}</span>
    </div>
  );
}

export function PinInputOtpModeExample() {
  return (
    <PinInput count={pinInputCount} otp name="verificationCode">
      <PinInput.Label>One-time code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

export function PinInputMaskedExample() {
  return (
    <PinInput count={4} mask>
      <PinInput.Label>PIN</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots indexes={shortPinInputIndexes} />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

export function PinInputChangeEventsExample() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className={styles.stack}>
      <PinInput
        count={pinInputCount}
        type="alphanumeric"
        value={value}
        onValueChange={(details) => {
          setValue(details.value);
        }}
      >
        <PinInput.Label>Invite code</PinInput.Label>
        <PinInput.Control>
          <PinInputSlots />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
      <span className={styles.hint}>Current value: {value.join('') || 'empty'}</span>
    </div>
  );
}

export function PinInputGroupedLayoutExample() {
  return (
    <PinInput count={pinInputCount} className={styles.customRoot}>
      <PinInput.Label>Auth code</PinInput.Label>
      <PinInput.Control>
        <PinInputSlots indexes={[0, 1, 2]} />
        <PinInput.Separator />
        <PinInputSlots indexes={[3, 4, 5]} />
      </PinInput.Control>
      <PinInput.HiddenInput />
    </PinInput>
  );
}

export function PinInputFieldExample() {
  return (
    <Field invalid required className={styles.field}>
      <PinInput count={pinInputCount}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInputSlots />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput>
      <Field.HelperText>Additional info</Field.HelperText>
      <Field.ErrorText>Please enter the verification code.</Field.ErrorText>
    </Field>
  );
}

export function PinInputRootProviderExample() {
  const id = useId();
  const pinInput = usePinInput({ id, count: pinInputCount });

  return (
    <div className={styles.stack}>
      <div className={styles.actions}>
        <button type="button" onClick={pinInput.focus}>
          Focus
        </button>
        <button type="button" onClick={pinInput.clearValue}>
          Clear
        </button>
      </div>
      <PinInput.RootProvider value={pinInput}>
        <PinInput.Label>Verification code</PinInput.Label>
        <PinInput.Control>
          <PinInputSlots />
        </PinInput.Control>
        <PinInput.HiddenInput />
      </PinInput.RootProvider>
    </div>
  );
}