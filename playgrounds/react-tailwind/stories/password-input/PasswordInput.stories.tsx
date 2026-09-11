import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Field } from '@/components/field/Field';
import { PasswordInput, usePasswordInput } from '@/components/password-input/PasswordInput';

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

const stackClassName = 'grid w-80 gap-2';
const strengthMeterClassName = 'mt-2 grid gap-1';
const strengthBarClassName = 'h-2 overflow-hidden rounded-full bg-muted';
const strengthFillClassName =
  'h-full transition-[width] duration-200 ease-in-out data-[strength=weak]:w-[30%] data-[strength=weak]:bg-destructive data-[strength=medium]:w-[60%] data-[strength=medium]:bg-warning data-[strength=strong]:w-full data-[strength=strong]:bg-success';
const strengthLabelClassName = 'text-xs leading-4 text-muted-foreground capitalize';

export const Basic: Story = {
  render: () => (
    <PasswordInput>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
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

export const Disabled: Story = {
  render: () => (
    <PasswordInput disabled>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <PasswordInput readOnly>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  ),
};

export const RootProvider: Story = {
  render: function RootProviderStory() {
    const passwordInput = usePasswordInput();

    return (
      <div className={stackClassName}>
        <output className="text-sm leading-5 text-muted-foreground">
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
          <div className={strengthMeterClassName}>
            <div className={strengthBarClassName}>
              <div className={strengthFillClassName} data-strength={strength} />
            </div>
            <div className={strengthLabelClassName}>{strength} password</div>
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