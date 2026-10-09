import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref } from 'vue';
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
} from '@/components/password-input';

const meta = {
  title: 'Components/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PasswordInput>;

export default meta;

type Story = StoryObj<typeof meta>;

const storyComponents = {
  Field,
  FieldErrorText,
  FieldHelperText,
  PasswordInput,
  PasswordInputControl,
  PasswordInputField,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
};

const renderStory = (template: string, setup?: () => Record<string, unknown>) => () =>
  defineComponent({
    components: storyComponents,
    setup() {
      return setup?.() ?? {};
    },
    template,
  });

export const Basic: Story = {
  render: renderStory(`
    <PasswordInput>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  `),
};

export const Autocomplete: Story = {
  render: renderStory(`
    <PasswordInput auto-complete="new-password" name="new-password">
      <PasswordInputLabel>New password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Create a password" />
        <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  `),
};

export const ControlledVisibility: Story = {
  render: renderStory(
    `
      <PasswordInput v-model:visible="visible">
        <PasswordInputLabel>Password is {{ visible ? 'visible' : 'hidden' }}</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Toggle visibility" />
          <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
    `,
    () => ({ visible: ref(false) }),
  ),
};

export const WithField: Story = {
  render: renderStory(`
    <Field invalid>
      <PasswordInput required>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Enter your password" />
          <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
      <FieldHelperText>Use at least 8 characters.</FieldHelperText>
      <FieldErrorText>Password is required.</FieldErrorText>
    </Field>
  `),
};

export const IgnorePasswordManager: Story = {
  render: renderStory(`
    <PasswordInput ignore-password-managers>
      <PasswordInputLabel>API key</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput :defaultValue="'spd_1234567890'" />
        <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  `),
};

export const Disabled: Story = {
  render: renderStory(`
    <PasswordInput disabled>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  `),
};

export const ReadOnly: Story = {
  render: renderStory(`
    <PasswordInput read-only>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  `),
};

export const RootProvider: Story = {
  render: renderStory(
    `
      <div class="grid w-80 gap-2">
        <output class="text-sm leading-5 text-muted-foreground">password input is {{ passwordInput.visible ? 'visible' : 'hidden' }}</output>
        <PasswordInputRootProvider :value="passwordInput">
          <PasswordInputLabel>Password</PasswordInputLabel>
          <PasswordInputControl>
            <PasswordInputInput placeholder="Managed outside the tree" />
            <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
          </PasswordInputControl>
        </PasswordInputRootProvider>
      </div>
    `,
    () => ({ passwordInput: usePasswordInput() }),
  ),
};

export const StrengthMeter: Story = {
  render: renderStory(
    `
      <PasswordInput>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput :value="password" @input="handlePasswordInput" placeholder="Enter your password" />
          <PasswordInputVisibilityTrigger><PasswordInputIndicator /></PasswordInputVisibilityTrigger>
        </PasswordInputControl>
        <div v-if="strength" class="mt-2 grid gap-1">
          <div class="h-2 overflow-hidden rounded-full bg-muted">
            <div class="h-full transition-[width] duration-200 ease-in-out data-[strength=weak]:w-[30%] data-[strength=weak]:bg-destructive data-[strength=medium]:w-[60%] data-[strength=medium]:bg-warning data-[strength=strong]:w-full data-[strength=strong]:bg-success" :data-strength="strength" />
          </div>
          <div class="text-xs leading-4 text-muted-foreground capitalize">{{ strength }} password</div>
        </div>
      </PasswordInput>
    `,
    () => {
      const password = ref('asdfasdf');
      const strength = computed(() => getPasswordStrength(password.value));
      const handlePasswordInput = (event: Event) => {
        if (event.target instanceof HTMLInputElement) password.value = event.target.value;
      };
      return { handlePasswordInput, password, strength };
    },
  ),
};

function getPasswordStrength(password: string) {
  if (!password) return null;
  if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6) return 'medium';
  return 'weak';
}