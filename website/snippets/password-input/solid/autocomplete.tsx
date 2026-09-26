import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-autocomplete.module.css';

export default function PasswordInputAutocompleteDemo() {
  return (
    <PasswordInput class={styles.root} autoComplete="new-password" name="new-password">
      <PasswordInputLabel>New password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Create a password" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  );
}