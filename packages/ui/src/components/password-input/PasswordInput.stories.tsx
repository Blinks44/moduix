import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { Field } from '../field';
import { PasswordInput, usePasswordInput } from './PasswordInput';
import styles from './PasswordInput.stories.module.css';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <PasswordInput>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Enter your password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  ),
};

export const Autocomplete: Story = {
  render: () => (
    <PasswordInput autoComplete="new-password" name="new-password">
      <PasswordInput.Label>New password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Create a password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
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
        <PasswordInput.Label>Password is {visible ? 'visible' : 'hidden'}</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Toggle visibility" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
    );
  },
};

export const WithField: Story = {
  render: () => (
    <Field invalid>
      <PasswordInput required>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Enter your password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <Field.HelperText>Use at least 8 characters.</Field.HelperText>
      <Field.ErrorText>Password is required.</Field.ErrorText>
    </Field>
  ),
};

export const IgnorePasswordManager: Story = {
  render: () => (
    <PasswordInput ignorePasswordManagers>
      <PasswordInput.Label>API key</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="spd_1234567890" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
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
  },
};

export const StrengthMeter: Story = {
  render: function StrengthMeterStory() {
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