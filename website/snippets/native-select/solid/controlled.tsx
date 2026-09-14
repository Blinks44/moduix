import { NativeSelect } from '@moduix/solid/native-select';
import { createSignal } from 'solid-js';

const frameworkOptions = [
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

export default function NativeSelectControlledDemo() {
  const [value, setValue] = createSignal('react');

  return (
    <NativeSelect
      value={value()}
      aria-label="Framework"
      onChange={(event) => setValue(event.currentTarget.value)}
    >
      {frameworkOptions.map((option) => (
        <option value={option.value}>{option.label}</option>
      ))}
    </NativeSelect>
  );
}