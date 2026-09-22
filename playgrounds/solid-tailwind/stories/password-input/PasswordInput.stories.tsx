import { createSignal } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Field, FieldErrorText, FieldHelperText } from '@/components/field/Field';
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
  render: () => {
    const [visible, setVisible] = createSignal(false);

    return (
      <PasswordInput
        visible={visible()}
        onVisibilityChange={(details) => setVisible(details.visible)}
      >
        <PasswordInputLabel>Password is {visible() ? 'visible' : 'hidden'}</PasswordInputLabel>
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
  render: () => {
    const passwordInput = usePasswordInput();

    return (
      <div class={stackClass}>
        <output class="text-sm leading-5 text-muted-foreground">
          password input is {passwordInput().visible ? 'visible' : 'hidden'}
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
  render: () => {
    const [password, setPassword] = createSignal('asdfasdf');
    const strength = () => getPasswordStrength(password());

    return (
      <PasswordInput>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
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
