import { Field, FieldErrorText, FieldLabel } from '@moduix/react/field';
import { NativeSelect } from '@moduix/react/native-select';
import styles from '@/components/examples/native-select/native-select-field-integration.module.css';

const frameworkOptions = [
  {
    value: '',
    label: 'Choose framework',
    disabled: true,
  },
  {
    value: 'react',
    label: 'React',
  },
  {
    value: 'vue',
    label: 'Vue',
  },
  {
    value: 'svelte',
    label: 'Svelte',
  },
];

export default function NativeSelectFieldDemo() {
  return (
    <Field className={styles.root} invalid required>
      <FieldLabel>Framework</FieldLabel>
      <NativeSelect defaultValue="" name="framework">
        {frameworkOptions.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
      <FieldErrorText>Select a framework.</FieldErrorText>
    </Field>
  );
}
