import {
  PasswordInput,
  PasswordInputField,
  PasswordInputLabel,
} from '@moduix/react/password-input';
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
    <div className={styles.root}>
      {sizes.map(([size, label]) => (
        <PasswordInput key={size} size={size}>
          <PasswordInputLabel>{label}</PasswordInputLabel>
          <PasswordInputField />
        </PasswordInput>
      ))}
    </div>
  );
}