<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
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
  import styles from './PasswordInput.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/PasswordInput',
    component: PasswordInput,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const getPasswordStrength = (password: string) => {
    if (!password) return null;
    if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
      return 'strong';
    }
    if (password.length >= 6) return 'medium';
    return 'weak';
  };
</script>

<script lang="ts">
  let visible = $state(false);
  let password = $state('asdfasdf');
  const strength = $derived(getPasswordStrength(password));
  const passwordInput = usePasswordInput();
</script>

<Story name="Basic" asChild>
  <PasswordInput>
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputField />
  </PasswordInput>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.stack}>
    <PasswordInput size="xs">
      <PasswordInputLabel>Extra small</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
    <PasswordInput size="sm">
      <PasswordInputLabel>Small</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
    <PasswordInput size="md">
      <PasswordInputLabel>Medium</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
    <PasswordInput size="lg">
      <PasswordInputLabel>Large</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
    <PasswordInput size="xl">
      <PasswordInputLabel>Extra large</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  </div>
</Story>

<Story name="Autocomplete" asChild>
  <PasswordInput autoComplete="new-password" name="new-password">
    <PasswordInputLabel>New password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Create a password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</Story>

<Story name="Controlled Visibility" asChild>
  <PasswordInput bind:visible>
    <PasswordInputLabel>Password is {visible ? 'visible' : 'hidden'}</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput placeholder="Toggle visibility" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</Story>

<Story name="With Field" asChild>
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
</Story>

<Story name="Ignore Password Manager" asChild>
  <PasswordInput ignorePasswordManagers>
    <PasswordInputLabel>API key</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput defaultValue="spd_1234567890" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
  </PasswordInput>
</Story>

<Story name="Disabled" asChild>
  <PasswordInput disabled>
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputField />
  </PasswordInput>
</Story>

<Story name="Read Only" asChild>
  <PasswordInput readOnly>
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputField />
  </PasswordInput>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <output class={styles.output}>
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
</Story>

<Story name="Strength Meter" asChild>
  <PasswordInput>
    <PasswordInputLabel>Password</PasswordInputLabel>
    <PasswordInputControl>
      <PasswordInputInput bind:value={password} placeholder="Enter your password" />
      <PasswordInputVisibilityTrigger>
        <PasswordInputIndicator />
      </PasswordInputVisibilityTrigger>
    </PasswordInputControl>
    {#if strength}
      <div class={styles.strengthMeter}>
        <div class={styles.strengthBar}>
          <div class={styles.strengthFill} data-strength={strength}></div>
        </div>
        <div class={styles.strengthLabel}>{strength} password</div>
      </div>
    {/if}
  </PasswordInput>
</Story>