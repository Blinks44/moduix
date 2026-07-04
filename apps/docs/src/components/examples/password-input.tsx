import type { ComponentProps } from 'react';
import { Field, PasswordInput, usePasswordInput } from '@moduix/react';
import { useState } from 'react';
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
    name: '--password-input-bg',
    defaultValue: 'var(--input-bg, var(--color-background))',
    description: 'Background color of the control shell.',
  },
  {
    name: '--password-input-border-color',
    defaultValue: 'var(--input-border-color, var(--color-border))',
    description: 'Border color of the control shell.',
  },
  {
    name: '--password-input-color',
    defaultValue: 'var(--input-color, var(--color-foreground))',
    description: 'Text color for the root, control, and input.',
  },
  {
    name: '--password-input-disabled-opacity',
    defaultValue:
      'var(--field-disabled-opacity, var(--input-disabled-opacity, var(--opacity-disabled)))',
    description: 'Opacity applied to disabled root, label, and control states.',
  },
  {
    name: '--password-input-focus-ring-color',
    defaultValue: 'var(--input-focus-ring-color, var(--color-ring))',
    description: 'Focus ring color for the control shell and visibility trigger.',
  },
  {
    name: '--password-input-font-size',
    defaultValue: 'var(--input-font-size, var(--input-font-size-md, var(--text-md)))',
    description: 'Font size of the input text.',
  },
  {
    name: '--password-input-height',
    defaultValue: 'var(--input-height, var(--input-height-md, var(--size-lg)))',
    description: 'Minimum height of the control shell.',
  },
  {
    name: '--password-input-icon-size',
    defaultValue: 'var(--button-icon-size, 1rem)',
    description: 'Icon size inside the visibility indicator.',
  },
  {
    name: '--password-input-invalid-border-color',
    defaultValue: 'var(--input-border-color-invalid, var(--color-destructive))',
    description: 'Border color of the invalid control shell.',
  },
  {
    name: '--password-input-invalid-focus-ring-color',
    defaultValue: 'var(--input-border-color-invalid, var(--color-destructive))',
    description: 'Focus ring color of the invalid control shell.',
  },
  {
    name: '--password-input-label-color',
    defaultValue: 'var(--field-label-color, var(--color-foreground))',
    description: 'Label text color.',
  },
  {
    name: '--password-input-label-font-size',
    defaultValue: 'var(--field-label-font-size, var(--text-sm))',
    description: 'Label font size.',
  },
  {
    name: '--password-input-label-font-weight',
    defaultValue: 'var(--field-label-font-weight, var(--weight-medium))',
    description: 'Label font weight.',
  },
  {
    name: '--password-input-label-line-height',
    defaultValue: 'var(--field-label-line-height, var(--line-height-text-sm))',
    description: 'Label line height.',
  },
  {
    name: '--password-input-label-gap',
    defaultValue: 'var(--field-label-gap, var(--spacing-1))',
    description: 'Gap between label content and any composed label adornments.',
  },
  {
    name: '--password-input-line-height',
    defaultValue:
      'var(--input-line-height, var(--input-line-height-md, var(--line-height-text-md)))',
    description: 'Line height of the input text.',
  },
  {
    name: '--password-input-padding-x',
    defaultValue: 'var(--input-padding-x, var(--input-padding-x-md, var(--spacing-3)))',
    description: 'Horizontal padding used by the text input inside the control shell.',
  },
  {
    name: '--password-input-padding-y',
    defaultValue: 'var(--input-padding-y, var(--input-padding-y-md, var(--spacing-2)))',
    description: 'Vertical padding used by the text input inside the control shell.',
  },
  {
    name: '--password-input-placeholder-color',
    defaultValue: 'var(--input-placeholder-color, var(--color-muted-foreground))',
    description: 'Placeholder text color.',
  },
  {
    name: '--password-input-radius',
    defaultValue: 'var(--input-radius, var(--radius-md))',
    description: 'Border radius of the control shell.',
  },
  {
    name: '--password-input-readonly-bg',
    defaultValue: 'var(--input-readonly-bg, var(--color-background))',
    description: 'Background color of the readonly control shell.',
  },
  {
    name: '--password-input-readonly-color',
    defaultValue: 'var(--input-readonly-color, var(--color-foreground))',
    description: 'Text color for readonly control and input states.',
  },
  {
    name: '--password-input-trigger-bg',
    defaultValue: 'transparent',
    description: 'Background color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Icon color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-hover-bg',
    defaultValue: 'var(--color-muted)',
    description: 'Hover and focus background behind the visibility icon.',
  },
  {
    name: '--password-input-trigger-hover-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Hover color of the visibility trigger.',
  },
  {
    name: '--password-input-trigger-size',
    defaultValue: 'var(--button-size-sm, var(--size-sm))',
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
    name: '--password-input-trigger-radius',
    defaultValue: 'var(--radius-sm)',
    description: 'Border radius of the visibility trigger and indicator hover surface.',
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
      <output>password input is {passwordInput.visible ? 'visible' : 'hidden'}</output>
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
  const strength = getPasswordStrength(password);

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
    <Field className="password-input-demo-field" invalid>
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
  const isValid = password.length >= 8;
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

function getPasswordStrength(password: string) {
  if (!password) return null;
  if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6) return 'medium';
  return 'weak';
}