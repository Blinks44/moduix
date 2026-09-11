import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
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

const stackClass = 'grid w-80 gap-2';
const strengthMeterClass = 'mt-2 grid gap-1';
const strengthBarClass = 'h-2 overflow-hidden rounded-full bg-muted';
const strengthFillClass =
  'h-full transition-[width] duration-200 ease-in-out data-[strength=weak]:w-[30%] data-[strength=weak]:bg-destructive data-[strength=medium]:w-[60%] data-[strength=medium]:bg-warning data-[strength=strong]:w-full data-[strength=strong]:bg-success';
const strengthLabelClass = 'text-xs leading-4 text-muted-foreground capitalize';

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
  render: () => {
    const [visible, setVisible] = createSignal(false);

    return (
      <PasswordInput
        visible={visible()}
        onVisibilityChange={(details) => setVisible(details.visible)}
      >
        <PasswordInput.Label>Password is {visible() ? 'visible' : 'hidden'}</PasswordInput.Label>
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
  render: () => {
    const passwordInput = usePasswordInput();

    return (
      <div class={stackClass}>
        <output class="text-sm leading-5 text-muted-foreground">
          password input is {passwordInput().visible ? 'visible' : 'hidden'}
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
  render: () => {
    const [password, setPassword] = createSignal('asdfasdf');
    const strength = () => getPasswordStrength(password());

    return (
      <PasswordInput>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
        {strength() ? (
          <div class={strengthMeterClass}>
            <div class={strengthBarClass}>
              <div class={strengthFillClass} data-strength={strength()!} />
            </div>
            <div class={strengthLabelClass}>{strength()} password</div>
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