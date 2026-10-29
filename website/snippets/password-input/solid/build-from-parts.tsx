import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import { Eye as EyeIcon, EyeClosed as EyeClosedIcon } from 'lucide-solid';
import styles from '@/components/examples/password-input/password-input-basic.module.css';

export default function BuildFromPartsPasswordInputDemo() {
  return (
    <PasswordInput class={styles.root} autoComplete="current-password">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator fallback={<EyeClosedIcon />}>
            <EyeIcon />
          </PasswordInputIndicator>
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  );
}