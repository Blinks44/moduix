import { PasswordInput } from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-autocomplete.module.css';

export default function PasswordInputAutocompleteDemo() {
  return (
    <PasswordInput class={styles.root} autoComplete="new-password" name="new-password">
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