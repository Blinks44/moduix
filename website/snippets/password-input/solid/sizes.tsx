import {
  PasswordInput,
  PasswordInputField,
  PasswordInputLabel,
} from '@moduix/solid/password-input';
import { For } from 'solid-js';
import styles from '@/components/examples/password-input/password-input-sizes.module.css';

const sizes = [
  ['xs', 'Extra small'],
  ['sm', 'Small'],
  ['md', 'Medium'],
  ['lg', 'Large'],
  ['xl', 'Extra large'],
] as const;

export default function PasswordInputSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {([size, label]) => (
          <PasswordInput size={size}>
            <PasswordInputLabel>{label}</PasswordInputLabel>
            <PasswordInputField />
          </PasswordInput>
        )}
      </For>
    </div>
  );
}