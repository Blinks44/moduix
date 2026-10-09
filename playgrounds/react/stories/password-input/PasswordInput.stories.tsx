import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '@/components/password-input/PasswordInput';
import styles from './PasswordInput.stories.module.css';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <PasswordInput>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ),
};

export const Autocomplete: Story = {
  render: () => (
    <PasswordInput autoComplete="new-password" name="new-password">
      <PasswordInputLabel>New password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Create a password" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  ),
};

export const ControlledVisibility: Story = {
  render: function ControlledVisibilityStory() {
    const [visible, setVisible] = useState(false);

    return (
      <PasswordInput
        visible={visible}
        onVisibilityChange={(details) => setVisible(details.visible)}
      >
        <PasswordInputLabel>Password is {visible ? 'visible' : 'hidden'}</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Toggle visibility" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <PasswordInput required>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Enter your password" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
      <FieldHelperText>Use at least 8 characters.</FieldHelperText>
      <FieldErrorText>Password is required.</FieldErrorText>
    </Field>
  ),
};

export const IgnorePasswordManager: Story = {
  render: () => (
    <PasswordInput ignorePasswordManagers>
      <PasswordInputLabel>API key</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput defaultValue="spd_1234567890" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  ),
};

export const Disabled: Story = {
  render: () => (
    <PasswordInput disabled>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <PasswordInput readOnly>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  ),
};

export const RootProvider: Story = {
  render: function RootProviderStory() {
    const passwordInput = usePasswordInput();

    return (
      <div className={styles.stack}>
        <output className={styles.output}>
          password input is {passwordInput.visible ? 'visible' : 'hidden'}
        </output>
        <PasswordInputRootProvider value={passwordInput}>
          <PasswordInputLabel>Password</PasswordInputLabel>
          <PasswordInputControl>
            <PasswordInputInput placeholder="Managed outside the tree" />
            <PasswordInputVisibilityTrigger>
              <PasswordInputIndicator />
            </PasswordInputVisibilityTrigger>
          </PasswordInputControl>
        </PasswordInputRootProvider>
      </div>
    );
  },
};

export const StrengthMeter: Story = {
  render: function StrengthMeterStory() {
    const [password, setPassword] = useState('asdfasdf');
    const strength = getPasswordStrength(password);

    return (
      <PasswordInput>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
        {strength ? (
          <div className={styles.strengthMeter}>
            <div className={styles.strengthBar}>
              <div className={styles.strengthFill} data-strength={strength} />
            </div>
            <div className={styles.strengthLabel}>{strength} password</div>
          </div>
        ) : null}
      </PasswordInput>
    );
  },
};

function getPasswordStrength(password: string) {
  if (!password) return null;
  if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6) return 'medium';
  return 'weak';
}