import { Field } from '@moduix/react/field';
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
    <Field.Root className={styles.root} invalid required>
      <Field.Label>Framework</Field.Label>
      <NativeSelect defaultValue="" name="framework">
        {frameworkOptions.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
      <Field.ErrorText>Select a framework.</Field.ErrorText>
    </Field.Root>
  );
}