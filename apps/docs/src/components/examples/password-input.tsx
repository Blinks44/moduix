import type { ComponentProps } from 'react';
import { Field, PasswordInput, usePasswordInput } from 'moduix';
import { useMemo, useState } from 'react';
import { CSSPropertiesReferenceTable, type CssProperty } from '../preview';

export const passwordInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--password-input-width',
    defaultValue: '100%',
    description: 'Width of the root password input stack.',
  },
  {
    name: '--password-input-max-width',
    defaultValue: '20rem',
    description: 'Maximum width of the root password input stack.',
  },
  {
    name: '--password-input-gap',
    defaultValue: 'var(--field-gap, var(--spacing-1))',
    description: 'Gap between password input parts; falls back to the shared Field spacing.',
  },
  {
    name: '--password-input-height',
    defaultValue: 'var(--input-height-md)',
    description: 'Height of the password input field.',
  },
  {
    name: '--password-input-padding-x',
    defaultValue: 'var(--input-padding-x-md)',
    description: 'Horizontal padding used by the text input inside the shared control shell.',
  },
  {
    name: '--password-input-label-gap',
    defaultValue: 'var(--field-label-gap, var(--spacing-1))',
    description: 'Gap between label content and any composed label adornments.',
  },
  {
    name: '--password-input-border-color',
    defaultValue: 'var(--input-border-color)',
    description: 'Password-specific border override layered on top of the shared Input contract.',
  },
  {
    name: '--password-input-focus-ring-color',
    defaultValue: 'var(--input-focus-ring-color)',
    description:
      'Password-specific focus ring override layered on top of the shared Input contract.',
  },
  {
    name: '--password-input-trigger-size',
    defaultValue: 'var(--button-size-sm)',
    description: 'Square size of the visibility trigger button.',
  },
  {
    name: '--password-input-trigger-inset',
    defaultValue: 'var(--spacing-2)',
    description:
      'Inline-end padding on the control shell so the trigger stays inset from the border.',
  },
  {
    name: '--password-input-trigger-visual-padding',
    defaultValue: 'var(--spacing-1)',
    description: 'Inner visual padding around the eye icon hover/focus background.',
  },
  {
    name: '--password-input-icon-size',
    defaultValue: 'var(--button-icon-size)',
    description: 'Icon size inside the visibility indicator.',
  },
  {
    name: '--password-input-readonly-color',
    defaultValue: 'var(--input-readonly-color)',
    description: 'Text color for the readonly control shell and nested input.',
  },
];

export function PasswordInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={passwordInputOverrideCssProperties} />;
}

export function PasswordInputExample(props: ComponentProps<typeof PasswordInput>) {
  return (
    <PasswordInput autoComplete="current-password" {...props}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Enter your password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

export function PasswordInputAutocompleteExample() {
  return (
    <PasswordInput autoComplete="new-password" name="new-password">
      <PasswordInput.Label>New password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Create a password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

export function ControlledPasswordInputVisibilityExample() {
  const [visible, setVisible] = useState(false);

  return (
    <PasswordInput visible={visible} onVisibilityChange={(details) => setVisible(details.visible)}>
      <PasswordInput.Label>Password is {visible ? 'visible' : 'hidden'}</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Toggle visibility" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

export function PasswordInputIgnorePasswordManagerExample() {
  return (
    <PasswordInput ignorePasswordManagers>
      <PasswordInput.Label>API key</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="spd_1234567890" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

export function PasswordInputRootProviderExample() {
  const passwordInput = usePasswordInput();

  return (
    <div className="password-input-demo-stack">
      <output className="password-input-demo-output">
        password input is {passwordInput.visible ? 'visible' : 'hidden'}
      </output>
      <PasswordInput.RootProvider value={passwordInput}>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Managed outside the tree" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
    </div>
  );
}

export function PasswordInputStrengthMeterExample() {
  const [password, setPassword] = useState('asdfasdf');
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <PasswordInput>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {strength ? (
        <div className="password-input-demo-strength-meter">
          <div className="password-input-demo-strength-bar">
            <div className="password-input-demo-strength-fill" data-strength={strength} />
          </div>
          <div className="password-input-demo-strength-label">{strength} password</div>
        </div>
      ) : null}
    </PasswordInput>
  );
}

export function PasswordInputWithFieldExample() {
  return (
    <Field className="password-input-demo-field">
      <PasswordInput required>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Enter your password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <Field.HelperText>Enter your password.</Field.HelperText>
      <Field.ErrorText>Password is required.</Field.ErrorText>
    </Field>
  );
}

export function PasswordInputValidationExample() {
  const [password, setPassword] = useState('');
  const isValid = useMemo(() => password.length >= 8, [password]);
  const invalid = !isValid && password.length > 0;

  return (
    <PasswordInput invalid={invalid}>
      <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {password.length > 0 ? (
        <p className="password-input-demo-validation-message" data-valid={isValid}>
          {isValid ? 'Password is valid.' : 'Password must be at least 8 characters.'}
        </p>
      ) : null}
    </PasswordInput>
  );
}

export function PasswordInputCustomStylingExample() {
  return (
    <PasswordInput className="password-input-demo-custom">
      <PasswordInput.Label>Workspace secret</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="readonly-secret" readOnly />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

function getPasswordStrength(password: string) {
  if (!password) return null;
  if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6) return 'medium';
  return 'weak';
}